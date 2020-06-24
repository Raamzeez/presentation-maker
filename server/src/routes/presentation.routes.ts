import express from 'express'
import Presentation from '../modules/presentation'

const router = express.Router()

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
    const [id, err] = await presentation.create()
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
    return res.status(200).send(presentation)
})

export default router
