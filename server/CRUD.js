var User = require('./model.js')

module.exports.insertarRegistro = function(callback) {
    let Mateo = new User({
    					 userId: Math.floor(Math.random() * 50),
    					 user: "stevedux",
    					 nombre: "Steve Semprun",
    					 pass: "123",
    					 estado: "Activo" })

    Mateo.save((error) => {
        if (error) callback(error)
        callback(null, "Registro guardado")
    })
}


