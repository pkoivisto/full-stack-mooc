import React, { useState } from 'react'

const Books = ({ show, books }) => {
  const [selectedGenre, setSelectedGenre] = useState(null)
  const allGenres = []
  if (books) {
    books.forEach(({ genres }) => {
      genres.forEach((genre) => {
        if (allGenres.indexOf(genre) === -1) {
          allGenres.push(genre)
        }
      })
    })
  }

  if (!show || !books) {
    return null
  }

  const filteredBooks = selectedGenre ? books.filter((book) => book.genres.indexOf(selectedGenre) !== -1) : books

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>)}
        </tbody>
      </table>
      <h3>Filter by genre</h3>
      {allGenres.map((genre) => <button key={genre} onClick={() => setSelectedGenre(genre)}>{genre}</button>)}
      <button onClick={() => setSelectedGenre(null)}>Reset filter</button>
    </div>
  )
}

export default Books