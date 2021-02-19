// const socket = require("../socket");

const socket = io()

let click = false
let moving_mouse = false
let x_position = 0
let y_position = 0
let previous_position = null
let color = 'black'

const canvas = document.querySelector('#canvas')
const context = canvas.getContext('2d')
const users = document.querySelector('#users')

const width = window.innerWidth
const height = window.innerHeight

canvas.width = width
canvas.height = height

canvas.addEventListener('mousedown', () => {
    click = true
})
canvas.addEventListener('mouseup', () => {
    click = false
})

canvas.addEventListener('mousemove', (e) => {
    moving_mouse = true
    x_position = e.clientX
    y_position = e.clientY
})

function change_color(c) {
    color = c
    context.strokeStyle = color
    context.stroke()
}
function delete_all() {
    console.log('delete');
    socket.emit('delete')
}
function create_drawing() {
    console.log(moving_mouse);
    if (click && moving_mouse && previous_position != null) {
        let drawing = {
            x_position,
            y_position,
            color,
            previous_position
        }
        // show_drawing(drawing)
        socket.emit('drawing', drawing)
    }
    previous_position = {
        x_position,
        y_position
    }
    setTimeout(create_drawing, 25);
}

socket.on('show_drawing', (drawing) => {
    if (drawing != null) {
        context.beginPath()
        context.linewidth = 5
        context.strokeStyle = drawing.color
        context.moveTo(drawing.x_position, drawing.y_position)
        context.lineTo(drawing.previous_position.x_position, drawing.previous_position.y_position)
        context.stroke()
    } else {
        context.clearRect(0, 0, canvas.width, canvas.height)
    }
})
socket.on('users', number => {
    console.log(number);
    users.innerHTML = `Numero de usuarios conectados: ${number}`
})
create_drawing()