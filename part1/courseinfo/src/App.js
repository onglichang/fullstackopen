const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const arr = [[part1, exercises1], [part2, exercises2], [part3, exercises3]]

  return (
    <div>
      <Header course={course} />
      <Content arr={arr} />
      {/* <Content part={part1} exercise={exercises1} />
      <Content part={part2} exercise={exercises2} />
      <Content part={part3} exercise={exercises3} /> */}
      <Total total={exercises1+exercises2+exercises3} />
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.arr[0]}/>
      <Part part={props.arr[1]}/>
      <Part part={props.arr[2]}/>
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.part[0]} {props.part[1]}</p>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.total}</p>
  )
}



export default App;
