import express from 'express'
import Presentation from '../modules/presentation'

const router = express.Router()


router.get('/all', async (req, res) => {
    const [allPresentations, err] = await Presentation.readAll()
    if (err) {
        console.error(err)
        return res.status(400).send({
            error: {
                name: "Bad Request",
                message: "Unable to find all presentations",
                data: err
            }
        })
    }
    return res.status(200).send(allPresentations)
})

router.post('/', async (req, res) => {
    const presentation = new Presentation(req.body)
    const errs = presentation.isValid()
    if (errs) {
        return res.status(422).send({
            error: {
                name: 'Validation Error',
                message: 'Invalid presentation fields.',
                data: errs
            }
        })
    }
    const [,err] = await presentation.create()
    if (err){
        console.error(err)
        return res.status(400).send({
            error: {
                name: 'Unexpected Failure',
                message: 'Unable to create new presentation for unknown reason.',
                data: err
            }
        })
    }
    return res.status(201).send(presentation)
})

router.get('/:id', async (req, res) => {
    const p = new Presentation({})
    const err = await p.read(req.params.id)
    if (err) {
        return res.status(400).send({
            error: {
                name: 'Bad Request',
                message: 'Unable to get presentation',
                data: err
            }
        })
    }
    return res.status(200).send(p)
})

router.put('/:id', async (req, res) => {
    const p = new Presentation({_id: req.params.id})
    const err = await p.update(req.body)
    if (err) {
        return res.status(400).send({
            error: {
                name: "Bad Request",
                message: 'Unable to update presentation',
                data: err
            }
        })
    }
    return res.status(200).send(p)
})

router.delete('/:id', async (req, res) => {
    const p = new Presentation({_id: req.params.id})
    const err = await p.delete()
    if (err) {
        return res.status(400).send({
            error: {
                name: "Bad Request",
                message: "Unable to delete presentation",
                data: err
            }
        })
    }
    return res.status(200).send('OK')
})

export default router
