// console.log('hello world')

//importing express 
const express = require('express')
// using express function to create express app
const app = express()
//json parser
app.use(express.json())

//import node's built in web server module 
// same as import http from 'http'
const http = require('http')

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

// // createServer method used to create web server
// const app = http.createServer((request, response) => { //event handler
//     //request is reponded with 200 status, and header content type
//     response.writeHead(200, { 'Content-Type': 'text/plain' })
//     //content to be returned
//     response.end('Hello World')
// })

// const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'application/json' })
//     response.end(JSON.stringify(notes))
// })

//define route to app 
app.get('/', (request, response) => { // event handler 
    //request aprameter - contains all of the information of the HTTP request
    // response parameter - used to define how the request is responded to
    response.send('<h1>Hello Worldddd nodemon installed!</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes) // no need to use JSON.stringify(notes) because using express
})

//fetchig a single resource 
app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id) //request object
    const note = notes.find(note => note.id === id)

    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }

    //response.json(note)
})

//deleteing resources 
app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

// receiving data
//testing first 
// app.post('/api/notes', (request, response) => {
//     const note = request.body
//     console.log(note)
//     response.json(note)
// })
const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxId + 1
}

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        id: generateId(),
    }

    notes = notes.concat(note)

    response.json(note)
})


const PORT = 3001
app.listen(PORT) //binded app to the port 
console.log(`Server running on port ${PORT}`)