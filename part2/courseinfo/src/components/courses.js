const Header = ({ course }) => <h2>{course}</h2>

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

const Courses = ({ courses }) => 
  <>
    {courses.map(course =>
      <Course key={course.id} course={course}></Course>
    )}
  </>

export default Courses