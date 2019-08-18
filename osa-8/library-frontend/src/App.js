import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'


const ADD_BOOK = gql`
  mutation newBook($author: String, $title: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title, author, published, genres
    }
  }`

const EDIT_AUTHOR = gql`
  mutation updateAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) { name, born }
  }
`

const ALL_AUTHORS = gql`
{
  allAuthors { name, bookCount, born }
}
`

const ALL_BOOKS = gql`
 {
   allBooks { author, title, published }
 }
`

const App = () => {
  const [page, setPage] = useState('authors')
  const authorsQuery = useQuery(ALL_AUTHORS)
  const booksQuery = useQuery(ALL_BOOKS)
  const [addBook] = useMutation(ADD_BOOK, { refetchQueries : [{ query : ALL_AUTHORS }, { query : ALL_BOOKS }]})
  const [updateAuthor] = useMutation(EDIT_AUTHOR, { refetchQueries : [ { query : ALL_AUTHORS }]})

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
        authors={authorsQuery.data.allAuthors}
        updateAuthor={updateAuthor}
      />

      <Books
        show={page === 'books'}
        books={booksQuery.data.allBooks}
      />

      <NewBook
        show={page === 'add'}
        addBook={addBook}
      />

    </div>
  )
}

export default App