


const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const path = require('path')

const production = true
const app = express()
const indexPath = path.join(__dirname, 'index.html')
const publicPath = express.static(path.join(__dirname, '/'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(publicPath)

app.get('/*', function (req, res) {
    console.log(req.rawHeaders[9])
    res.sendFile(indexPath)
})
if (production) {
    app.listen(8080)
    console.log("listening at port 8080")
}
else {
    app.listen(4000)
    console.log("listening at port 4000")
}
