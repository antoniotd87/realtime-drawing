module.exports = (io) => {
    let data = []
    let users = 0
    io.on('connection', socket => {
        
        users += 1
        io.emit('users', users)
        
        data.forEach(drawing => {
            io.emit('show_drawing', drawing)
        });

        socket.on('drawing', drawing => {
            data.push(drawing)
            io.emit('show_drawing', drawing)
        })

        socket.on('delete', () => {
            data = []
            io.emit('show_drawing', null)
        })

        socket.on('disconnect', () => {
            users -= 1
            io.emit('users', users)
        })
    })
}