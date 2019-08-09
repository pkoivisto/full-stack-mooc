import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  let component
  const expectedTitle = 'This is a simple blog for simple people!'
  const expectedAuthor = 'No Body'
  const expectedLikes = 1337

  let onClickMock

  beforeEach(() => {
    onClickMock = jest.fn()
    component = render(<SimpleBlog blog={{ title : expectedTitle, author : expectedAuthor, likes : expectedLikes }} onClick={ onClickMock }/>)
  })

  test('renders title, author and likes for given blog', () => {
    const titleAndAuthorDiv = component.container.querySelector('.titleAndAuthor')
    expect(titleAndAuthorDiv).toHaveTextContent(expectedTitle)
    expect(titleAndAuthorDiv).toHaveTextContent(expectedAuthor)

    const likesDiv = component.container.querySelector('.likes')
    expect(likesDiv).toHaveTextContent(expectedLikes)
  })

  test('triggers the onClick handler twice when the corresponding button is clicked twice', () => {
    const btn = component.container.querySelector('.btn')
    fireEvent.click(btn)
    fireEvent.click(btn)

    expect(onClickMock.mock.calls.length).toBe(2)
  })
})