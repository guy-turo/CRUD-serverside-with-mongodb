const Task = require('../models/task')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../error/custom_error')


const getAllTasks = asyncWrapper(async(req, res, next) => {
    const tasks = await Task.find({})
    res.status(200).json({ AllTasks: tasks })
})
const createTask = asyncWrapper(async(req, res, next) => {

    const task = await Task.create(req.body)

    res.status(201).json({ task })
})

const getTask = asyncWrapper(async(req, res, next) => {

    const { id: idTask } = req.params
    const task = await Task.findOne({ _id: idTask })
    if (!task) {
        return next(createCustomError('this id doesnt exist' + idTask, 404))

    }
    res.status(200).json({ task })
})
const updateTask = asyncWrapper(async(req, res, next) => {
    const { id: idTask } = req.params
    const task = await Task.findOneAndUpdate({ _id: idTask }.req.body, {
        new: true,
        runValidators: true
    })
    if (!task) {
        return next(createCustomError('this id doesnt exist' + idTask, 404))
    }
    res.status(200).json({ updatedTask: task })
})

const deleteTask = asyncWrapper(async(req, res, next) => {
    const { id: idTask } = req.params
    const task = await Task.findOneAndDelete({ _id: idTask })
    if (!task) {
        return next(createCustomError('this id doesnt exist' + idTask, 404))
    }
    res.status(200).json({ task })
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}