import express from 'express'
import CourseController from './controllers/course.controller'
import StudentController from './controllers/student.controller'

const routes = express.Router()

const courseController = new CourseController()
const studentController = new StudentController()

routes.get('/', (req, res)=>{
    return res.json('it works!')
})
routes.get('/student', studentController.findAll)
routes.post('/student', studentController.create)
routes.get('/student/:id', studentController.findById)
routes.delete('/student/:id', studentController.delete)
routes.put('/student/:id', studentController.updateByPut)
routes.patch('/student/:id', studentController.updateByPatch)

routes.get('/course', courseController.findAll)
routes.post('/course', courseController.create)
routes.get('/course/:id', courseController.findById)
routes.delete('/course/:id', courseController.delete)
routes.put('/course/:id', courseController.updateByPut)
routes.patch('/course/:id', courseController.updateByPatch)

export default routes