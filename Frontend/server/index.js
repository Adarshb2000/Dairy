const express = require('express')
const path = require('path')

const app = express()
app.use(express.static(path.join(__dirname, '../dist')))
app.get('/*', function (_, res) {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'))
})
app.listen(1234, '192.168.29.235', () => {
  console.log('running on http://192.168.29.235:1234')
})
