const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('<form action="/benvingut" method="POST"><label for="username">Usuario: <input id="username" name="username" type="text" required/></label><br><br><label for="password">Contraseña: <input id="password" name="password" type="password" required/> <input type="submit"></form>')
})

app.get('/benvingut', (req, res) => {
	res.send('Benvingut, ' + req.body.username)
	res.end()
  })

app.listen(port, () => {
  console.log('Example app listening at http://localhost:${port}')
})