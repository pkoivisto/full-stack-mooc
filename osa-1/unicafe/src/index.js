import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({good, neutral, bad}) => {
    const sum =  [good,neutral,bad].reduce((a,b) => (a+b), 0)
    const avg = sum === 0 ? "-" : (good - bad) / sum
    const positivesPercentage = sum === 0 ? "-" : (100 * (good / sum)) + "%"

    const body = sum === 0 ?
      <p>Ei yhtään palautetta annettu</p> :
      <table>
          <tbody>
            <Statistic text="Hyvä" value={good} />
            <Statistic text="Neutraali" value={neutral} />
            <Statistic text="Huono" value={bad} />
            <Statistic text="Yhteensä" value={sum} />
            <Statistic text="Keskiarvo" value={avg} />
            <Statistic text="Positiivisia" value={positivesPercentage} />
          </tbody>
      </table>

    return(
    <div><h1>Statistiikka</h1>
      {body}
    </div>
    )
  }

const Button = ({label, onClick}) => <button onClick={onClick}>{label}</button>

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Anna palautetta</h1>
        <Button label="Hyvä" onClick={() => setGood(good + 1)} />
        <Button label="Neutraali" onClick={() => setNeutral(neutral + 1)} />
        <Button label="Huono" onClick={() => setBad(bad + 1)} />
        <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)