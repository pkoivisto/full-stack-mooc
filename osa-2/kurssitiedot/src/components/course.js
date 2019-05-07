import React from 'react'

const Header = ({course}) => (<h1>{course.name}</h1>)
const Part = ({part}) => {
    return <p>{part.name} {part.exercises}</p>
}
const Content = ({course}) => 
{
  const parts = course.parts
  return <div>{parts.map(part => <Part key={part.name} part={part}/>)}</div>
}

const Total = ({course}) => (<p>yhteensä {course.parts.reduce((acc,val)=>acc+val.exercises,0)} tehtävää</p>)

const Course = ({course}) => 
  <div>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </div>

export default Course