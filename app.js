const express = require('express')
const tasks = require('./routes/tasks')
const { getTask, createTask, updateTask, deleteTask } = require('./controllers/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()


const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error_handler')

const app = express()
const v1 = '/api/v1/tasks'
    //middleware
app.use(express.json())
    
//routes
app.use(v1, tasks)
app.use(v1, getTask)
app.use(v1, createTask)
app.use(v1, updateTask)
app.use(v1, deleteTask)

//error handlers
app.use(notFound)
app.use(errorHandler)



const start = async() => {

    try {
        const port = process.env.PORT || 3000
        await connectDB(process.env.MONGO_URI)
        app.listen(port,
            console.log('Server is running at port :' + port)
        )
    } catch (error) {
        console.log('___________error_______' + error)
    }
}
start()