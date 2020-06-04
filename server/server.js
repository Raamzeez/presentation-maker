const getBullets = require('./Presentation_Maker.js')
const express = require('express')
const PORT = 5000
const app = express()

app.get('/', (req, res) => {
    console.log(req.query)
    res.header('Access-Control-Allow-Origin', '*');
    res.send(getBullets(req.query.link))
})

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))