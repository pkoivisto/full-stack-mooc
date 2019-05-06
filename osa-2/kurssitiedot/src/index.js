import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => (<h1>{course.name}</h1>)
const Part = ({part}) => {
    return <p>{part.name} {part.exercises}</p>
}
const Content = ({course}) => 
{
  const parts = course.parts
  return <div>{parts.map(part => <Part key={part.name} part={part}/>)}</div>
}

const Total = ({course}) => (<p>yhteensä {course.parts.reduce((acc,val,)=>acc+val.exercises,0)} tehtävää</p>)

const Course = ({course}) => 
  <div>
    <Header course={course} />
    <Content course={course} />
  </div>

const App = () => {
    const course = {
        name: 'Half Stack -sovelluskehitys',
        parts: [{
            name: 'Reactin perusteet',
            exercises: 10
          },
          {
            name: 'Tiedonvälitys propseilla',
            exercises: 7
          },
          {
            name: 'Komponenttien tila',
            exercises: 14
          }]
    }

    return (
      <div>
        <Course course={course} />
        <Total course={course} />
        </div>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'))