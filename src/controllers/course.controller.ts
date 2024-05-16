import { Request, Response } from 'express'
import knex from '../database/connection'

class CourseController{
    async findAll(req: Request, res: Response){
        const course = await knex('course').select('course.*')
        return res.json(course)
    }

    async findById(req: Request, res: Response){
        const { id } = req.params
        const course = await knex('student_course')
            .join('student', 'student.id', '=', 'student_course.student_id')
            .join('course', 'course.id', '=', 'student_course.course_id')
            .where('course.id', id)
            .select(
                'student.id AS student_id',
                'student.name AS student_name',
                'student.registration',
                'course.*',
            )

        if(course[0] == undefined){
            const courseWithoutStudents = await knex('course').where('id', id)
            return res.json({ courseWithoutStudents })
        }
        
        const serializedItens = course.map(event =>{
            return{
                student_id: event.student_id,
                student_name: event.student_name,
                registration: event.registration,
                course_id: event.id,
                course_name: event.name,
                description: event.description 
            }
        })
        res.json(serializedItens)
    }

    async create(req: Request, res: Response){
        const { name, description, students } = req.body
        const trx = await knex.transaction()

        if(!students){
            let course = { name, description }
            await trx('course').insert(course)
            await trx.commit()

            return res.json({message: 'Course inserted with sucess'})
        }

        let course = {
            name,
            description
        }

        const courseCreated = await trx('course').insert(course)
        const course_id = courseCreated[0]

        const student_course = students.map((student_id: Number) =>{
            return {
                student_id,
                course_id
            }
        })

        await trx('student_course').insert(student_course)
        await trx.commit()

        return res.json({message: 'Course inserted with sucess'})
    }

    async delete(req: Request, res: Response){
        const { id } = req.params
        
        await knex('course').where('id', id).del()
        await knex('student_course').where('course_id', id).del()
        return res.status(200).json('Course deleted with sucess!')
    }

    async updateByPut(req: Request, res: Response){
        const { id } = req.params
        const { name, description, students } = req.body

        const trx = await knex.transaction()
        const idExists = await trx('course').where('id', id).first()

        if(!idExists){
            await trx.rollback()
            return res.status(400).json({ error: 'Course not exists!' })
        }
        
        const courseExists = await trx('course').where('name', name).whereNot('id', id).first().select('*')
        if(courseExists){
            await trx.rollback()
            return res.status(400).json({ error: 'Course already exists' })
        }

        const course = await trx('course').where('id', id).update({
            name, description
        })
        
        let course_id = id
        const student_course = students.map((student_id: Number) =>{
            return {
                student_id,
                course_id
            }
        })
        await trx('student_course').insert(student_course)
        await trx.commit()

        return res.status(204).json(course)
    }

    async updateByPatch(req: Request, res: Response){
        const { id } = req.params
        const { name, description,students } = req.body

        const trx = await knex.transaction()
        const idExists = await trx('course').where('id', id).first()

        if(!idExists){
            await trx.rollback()
            return res.status(400).json({ error: 'Course not exists!' })
        }
        
        const courseExists = await trx('course').where('name', name).whereNot('id', id).first().select('*')
        if(courseExists){
            await trx.rollback()
            return res.status(400).json({ error: 'Course already exists' })
        }

        const course = await trx('course').where('id', id).update({
            name, description
        })
        
        let course_id = id
        const student_course = students.map((student_id: Number) =>{
            return {
                student_id,
                course_id
            }
        })
        await trx('student_course').insert(student_course)
        await trx.commit()

        return res.status(204).json(course)
    }
}

export default CourseController