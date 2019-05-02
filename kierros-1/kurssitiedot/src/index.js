import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (<h1>{props.course}</h1>)
const Part = (props) => (<p>{props.part} {props.exercises}</p>)
const Content = (props) => 
(
  <div>
    <Part part={props.part[0]} exercises={props.exercises[0]} />
    <Part part={props.part[1]} exercises={props.exercises[1]} />
    <Part part={props.part[2]} exercises={props.exercises[2]} />
  </div>
)
const Total = (props) => (<p>yhteensä {props.elems.reduce((acc,val)=>acc+val)} tehtävää</p>)

const App = () => {
  const course = 'Half Stack -sovelluskehitys'
  const part1 = 'Reactin perusteet'
  const exercises1 = 10
  const part2 = 'Tiedonvälitys propseilla'
  const exercises2 = 7
  const part3 = 'Komponenttien tila'
  const exercises3 = 14
  const exercises = [exercises1,exercises2,exercises3]

  return (
    <div>
      <Header course={course} />
      <Content part={[part1,part2,part3]} exercises={exercises} />
      <Total elems={exercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))