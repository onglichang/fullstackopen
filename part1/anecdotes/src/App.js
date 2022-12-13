import { useState } from 'react'

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [voteArr, setVoteArr] = useState(new Uint8Array(anecdotes.length))
  const [mostVotes, setMostVotes] = useState(0)

  const generateAnecdote = () => {
    const num = Math.floor(Math.random() * anecdotes.length)
    setSelected(num)
  }

  const voteForQuote = () => {
    const tempArr = [...voteArr]
    tempArr[selected] += 1
    setVoteArr(tempArr)
    const maxIndex = tempArr.indexOf(Math.max(...tempArr))
    setMostVotes(maxIndex)
  }

  return (
    <>
      <div>
        <h1>quote of the day</h1>
        <p>{anecdotes[selected]}</p>
        <p>has {voteArr[selected]} votes</p>
        <Button handleClick={voteForQuote} text="vote" />
        <Button handleClick={generateAnecdote} text="next anecdote" />
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[mostVotes]}</p>
        <p>has {voteArr[mostVotes]} votes</p>
      </div>
    </>
  )
}

export default App
