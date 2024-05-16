import { Request, Response } from 'express'
import knex from '../database/connection'

class StudentController{
    async findAll (req: Request, res: Response){
        const student = await knex('student').select('student.*')
        return res.json(student)
    }

    async findById(req: Request, res: Response){
        const { id } = req.params
        const student = await knex('student_course')
            .join('course', 'course.id', '=', 'student_course.course_id')
            .join('student', 'student.id', '=', 'student_course.student_id')
            .where('student.id', id)
            .select(
                'student.id AS student_id',
                'student.name AS student_name',
                'student.registration',
                'course.*'
            )
        
        if(student[0] == undefined){
            const studentWithoutStudent = await knex('student').where('id', id)
            return res.json({ studentWithoutStudent })
        }

        const serializedItens = student.map(event =>{
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
        const { name, registration, courses } = req.body
        const trx = await knex.transaction()

        if(!courses){
            let student = { name, registration }
            await trx('student').insert(student)
            await trx.commit()

            return res.json({message: 'Student inserted with sucess'})
        }

        let student = {
            name,
            registration
        }

        const studentCreated = await trx('student').insert(student)
        const student_id = studentCreated[0]

        const student_course = courses.map((course_id: Number) =>{
            return {
                student_id,
                course_id
            }
        })

        await trx('student_course').insert(student_course)
        await trx.commit()

        return res.json({message: 'Student inserted with sucess!'})
    }

    async delete(req: Request, res: Response){
        const { id } = req.params

        await knex('student').where('id', id).del()
        await knex('student_course').where('student_id', id).del()
        return res.status(200).json('Student deleted with sucess!')
    }

    async updateByPut(req: Request, res: Response){
        const { id } = req.params
        const { name, registration, courses } = req.body
        
        const trx = await knex.transaction()
        const idExists = await trx('student').where('id', id).first()

        if(!idExists){
            await trx.rollback()
            return res.status(400).json({ error: 'Student not exists!' })
        }

        const studentExists = await trx('student').where('name', name).whereNot('id', id).first().select('*')
        if(studentExists){
            await trx.rollback()
            return res.status(400).json({ error: 'Student already exists' })
        }

        const student = await trx('student').where('id', id).update({
            name, registration
        })

        let student_id = id
        const student_course = courses.map((course_id: Number) =>{
            return {
                student_id,
                course_id
            }
        })
        await trx('student_course').insert(student_course)
        await trx.commit()

        return res.status(204).json(student)
    }

    async updateByPatch(req: Request, res: Response){
        const { id } = req.params
        const { name, registration, courses } = req.body
        
        const trx = await knex.transaction()
        const idExists = await trx('student').where('id', id).first()

        if(!idExists){
            await trx.rollback()
            return res.status(400).json({ error: 'Student not exists!' })
        }

        const studentExists = await trx('student').where('name', name).whereNot('id', id).first().select('*')
        if(studentExists){
            await trx.rollback()
            return res.status(400).json({ error: 'Student already exists' })
        }

        const student = await trx('student').where('id', id).update({
            name, registration
        })

        let student_id = id
        const student_course = courses.map((course_id: Number) =>{
            return {
                student_id,
                course_id
            }
        })
        await trx('student_course').insert(student_course)
        await trx.commit()

        return res.status(204).json(student)
    }
}

export default StudentController