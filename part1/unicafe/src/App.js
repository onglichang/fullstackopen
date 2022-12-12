import { useState } from 'react'

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>
  
const StatisticLine = (props) => {
  if (props.text === "positive") {
    return (
      <p>{props.text} {props.value} %</p>
    )
  }
  return (
    <p>{props.text} {props.value}</p>
  )
}

const Statistics = ({good, neutral, bad}) => {

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <>
      <h1>statistics</h1>
      <StatisticLine text="good" value = {good} />
      <StatisticLine text="neutral" value = {neutral} />
      <StatisticLine text="bad" value = {bad} />
      <StatisticLine text="all" value = {good+neutral+bad} />
      <StatisticLine text="average" value = {(good-bad)/(good+neutral+bad)} />
      <StatisticLine text="positive" value = {good/(good+neutral+bad)*100} />
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good"></Button>
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"></Button>
      <Button handleClick={() => setBad(bad + 1)} text="bad"></Button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
