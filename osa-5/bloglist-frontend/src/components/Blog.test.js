import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const expectedTitle = 'Title for blog!'
  const expectedAuthor = 'Mr. Niceguy'
  const expectedLikes = 1337
  const expectedUrl = 'http://pakkoblogaut.us/just-testing-stuff'
  const expectedUserName = 'Teuvo Testaaja'

  beforeEach(() => {
    component = render(<Blog blog={{ title : expectedTitle, author : expectedAuthor, likes : expectedLikes, url : expectedUrl, user : { id : '', name : expectedUserName } }} style={{ display : 'block' }}/>)
  })

  test('displays only the title and author of given blog by default', () => {
    expect(component.container).toHaveTextContent(`${expectedTitle} ${expectedAuthor}`)
    const fullDetailsDiv = component.container.querySelector('.fullDetails')
    expect(fullDetailsDiv).toHaveStyle('display: none')
  })

  test('displays full details of blog entry after the header row is clicked', () => {
    const blogHeader = component.container.querySelector('.header')
    fireEvent.click(blogHeader)

    expect(blogHeader).toHaveTextContent(`${expectedTitle} ${expectedAuthor}`)
    const fullDetailsDiv = component.container.querySelector('.fullDetails')
    expect(fullDetailsDiv).not.toHaveStyle('display: none')
    expect(fullDetailsDiv).toHaveTextContent(expectedUrl)
    expect(fullDetailsDiv).toHaveTextContent(`${expectedLikes} likes`)
    expect(fullDetailsDiv).toHaveTextContent(`added by ${expectedUserName}`)
  })
})