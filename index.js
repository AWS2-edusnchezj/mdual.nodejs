const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('<form><label for="username">Usuario: <input id="username" name="username" type="text" required/></label><br><br><label for="password">Contraseña: <input id="password" name="password" type="password" required/> <input type="submit"></form>')
})

app.listen(port, () => {
  console.log('Example app listening at http://localhost:${port}')
})