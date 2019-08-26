import React from 'react'

const Recommendations = ({ show, user, books }) => {
  if (!show || !user) {
    return null
  }

  return (
  <div>
    <h2>Recommendations</h2>
    <div>
      books in your favorite genre <b>{user.favoriteGenre}</b>
    </div>
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>author</th>
          <th>published</th>
        </tr>
        {books.filter(({genres}) => genres.indexOf(user.favoriteGenre) !== -1).map(
          ({title, author, published}) => {
            return ( 
              <tr key={title}>
                <td>{title}</td>
                <td>{author.name}</td>
                <td>{published}</td>
              </tr>
            )
          }
        )}
      </tbody>
    </table>
  </div>)}

  export default Recommendations