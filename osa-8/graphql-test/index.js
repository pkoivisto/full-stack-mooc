const { ApolloServer, gql } = require('apollo-server')
const uuid = require('uuid/v1')
const Author = require('./models/Author')
const Book = require('./models/Book')

const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

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

  type Query {
    hello: String!,
    bookCount: Int!,
    authorCount: Int!,
    allBooks(author: String, genre: String): [Book!]!,
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String
      published: Int!
      genres: [String!]!
    ): Book!,
    editAuthor(name: String!, setBornTo: Int!): Author
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
  },
  Author: {
    bookCount: (props) => {
      return Book.count({ author : props._id })
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      const book = new Book({ ...args })
      let author = await Author.findOne({ name : args.author })
      if (!author) {
        author = await new Author({ name : args.author }).save()
      }
      book.author = author._id
      return book.save()
    },
    editAuthor: async (root, { name, setBornTo }) => {
      const author = await Author.findOne({ name })
      author.born = setBornTo
      return author.save()
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})