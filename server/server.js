const getBullets = require('./Presentation_Maker.js')
const express = require('express')
const cors = require("cors")

const PORT = 5000
const app = express()

app.use(cors())

app.get('/', async (req, res) => {
    const bullets = await getBullets(req.query.link)
    res.send(bullets)
})

app.listen(PORT, () => console.log(`Server listening at localhost:${PORT}`))