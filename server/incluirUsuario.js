var mongoose = require('mongoose')
var Operaciones = require('./CRUD.js')

var url = "mongodb://localhost/calendario"

mongoose.connect(url)
Operaciones.insertarRegistro((error, result) => {
    if (error) console.log(error)
    console.log(result)
})

