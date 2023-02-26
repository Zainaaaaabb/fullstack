import React from 'react'


const Course = ({ course }) => {
    console.log('name', course.name)
    console.log('parts', course.parts)
    console.log('course', course.course)

    return (
        <>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total course={course} />
        </>
    )
}

const Total = ({ course }) => {
    const total = course.parts.reduce(
        (total, part) => { return total + part.exercises }, 0);
    return (
        <p><b>Total of {total} exercises</b></p>
    )
}

const Header = ({ name }) => <h2>{name}</h2>
const Part = ({ part }) => <p> {part.name} {part.exercises} </p>
const Content = ({ parts }) => {
    return (
        <> {parts.map((part) => <Part key={part.id} part={part} />)} </>
    )
}

export default Course
