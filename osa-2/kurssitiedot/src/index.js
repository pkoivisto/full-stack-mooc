import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (<h1>{props.course.name}</h1>)
const Part = (props) => {
    console.log(props)
    return <p>{props.part.name} {props.part.exercises}</p>
}
const Content = (props) => 
{
  const parts = props.course.parts
  console.log(parts)
  return <div>
        <Part part={parts[0]} />
        <Part part={parts[1]} />
        <Part part={parts[2]} />
    </div>
}
const Total = (props) => (<p>yhteensä {props.course.parts.reduce((acc,val,)=>acc+val.exercises,0)} tehtävää</p>)

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
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'))