const App = () => {
  // const course = 'Half Stack application development'
  // const part = ['Fundamentals of React', 'Using props to pass data', 'State of a component']
  // const exercises = [10, 7, 14]

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      < Header course={course.name} />
      {/* < Content part={part} exercise={exercises} /> */}
      <Content parts={course.parts} />
      {/* < Total exercise={exercises} /> */}
      < Total parts={course.parts} />
    </div>
  )
}

const Header = (props) => {
  console.log('Header props: ' + props)
  return (
    <div>
      <h1>{props.course}</h1>
    </div>

  )
}

// const Content = (props) => {

//   return (
//     <div>
//       < p > {props.part[0]} {props.exercise[0]} <br />
//         {props.part[1]} {props.exercise[1]} <br />
//         {props.part[2]} {props.exercise[2]}
//       </p>
//     </div>
//   )
// }

const Content = (props) => {
  console.log('Content props: ' + props)
  return (
    <div>
      <Part partNumber={props.parts[0].name} exerciseNumber={props.parts[0].exercises} />
      <Part partNumber={props.parts[1].name} exerciseNumber={props.parts[1].exercises} />
      <Part partNumber={props.parts[2].name} exerciseNumber={props.parts[2].exercises} />
    </div>
  )
}

const Part = (props) => {
  console.log('Part props: ' + props)
  return (
    <div>
      <p> {props.partNumber} {props.exerciseNumber}</p>
    </div>
  )

}
const Total = (props) => {
  console.log('Total props: ' + props)
  const total = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises
  return (
    <div>
      <p>Number of exercises {total} </p>
    </div>
  )
}



export default App