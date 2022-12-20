const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
  const sumOfParts = parts.reduce((s, p) =>
    s + p.exercises, 0)
  return (
  <p><b>total of {sumOfParts} exercises</b></p>
  )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => 
      <Part key={part.id} part={part}></Part>
    )}
  </>

const Course = ({ course }) => {
  return (
    <div>
      <Header key={course.id} course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App
