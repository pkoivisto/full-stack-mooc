const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const pubsub = new PubSub()
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')

const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const jwt = require('jsonwebtoken')
const JWT_SECRET = 'This_HEr3_i$!A#$€cre7KEy'

require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!,
    published: Int!,
    author: Author!,
    id: ID!,
    genres: [String!]!
  }

  type Author {
    id: ID!,
    name: String!,
    born: Int,
    bookCount: Int
  }

  type User {
    username: String!,
    favoriteGenre: String!,
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    hello: String!,
    bookCount: Int!,
    authorCount: Int!,
    allBooks(author: String, genre: String): [Book!]!,
    allAuthors: [Author!]!,
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String
      published: Int!
      genres: [String!]!
    ): Book!,
    editAuthor(name: String!, setBornTo: Int!): Author,
    createUser(username: String!, favoriteGenre: String!): User,
    login(username: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, { author, genre }) => {
      if (!author && !genre) {
        return Book.find({}).populate('author')
      }
      
      let filterOptions = {}
      if (author) {
        const savedAuthor = await Author.findOne({ name : author })
        filterOptions = {...filterOptions, author : savedAuthor._id }
      }
      if (genre) {
        filterOptions = {...filterOptions, genres : { '$in' : [ genre ]}}
      }
      return Book.find(filterOptions).populate('author')
    },
    allAuthors: () => {
      return Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: (props) => {
      return Book.countDocuments({ author : props._id })
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      const book = new Book({ ...args })
      let author = await Author.findOne({ name : args.author })
      if (!author) {
        try {
          author = await new Author({ name : args.author }).save()
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs : args})
        }
      }
      book.author = author
      try {
        book.save()
        pubsub.publish('BOOK_ADDED', { bookAdded : book})
        return book
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs : args })
      }
    },
    editAuthor: async (root, { name, setBornTo }, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      const author = await Author.findOne({ name })
      author.born = setBornTo
      return author.save()
    },
    createUser: (root, args) => {
      const user = new User({ username : args.username, favoriteGenre : args.favoriteGenre })
      return user.save().catch(error => {
        throw new UserInputError(error.message, { invalidArgs : args })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username : args.username })
      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }
      const userForToken = { username : user.username, id : user._id }

      return { value : jwt.sign(userForToken, JWT_SECRET )}
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    const AUTH_PREFIX = 'bearer '
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(AUTH_PREFIX.length), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})