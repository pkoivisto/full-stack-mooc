import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (<h1>{props.course}</h1>)
const Part = (props) => {
    console.log(props)
    return <p>{props.part.name} {props.part.exercises}</p>
}
const Content = (props) => 
{
  const partProps = props.props
  console.log(partProps)
  return <div>
        <Part part={partProps[0]} />
        <Part part={partProps[1]} />
        <Part part={partProps[2]} />
    </div>
}
const Total = (parts) => (<p>yhteensä {parts.parts.reduce((acc,val,)=>acc+val.exercises,0)} tehtävää</p>)

const App = () => {
    const course = 'Half Stack -sovelluskehitys'

    const parts = [{
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
  
    return (
      <div>
        <Header course={course} />
        <Content props={parts} />
        <Total parts={parts} />
      </div>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'))