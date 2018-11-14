const Router = require('express').Router();
const Users = require('./model.js')
const Eventos = require('./modelEvento.js')



// Agregar a un usuario
Router.post('/new', function(req, res) {
    let user = new Users({
        userId: Math.floor(Math.random() * 50),
        user: req.body.user,
        nombre: req.body.nombre,
        pass: req.body.pass,
        estado: "Activo"
    })
    user.save(function(error) {
        if (error) {
            res.status(500)
            res.json(error)
        }
        res.send("Registro guardado")
    })
})


// validad el usuario y password
Router.post('/login', function(req, res) {
    let user = req.body.user
    let pass = req.body.pass
    Users.findOne({user: user,pass : pass}).exec(function(err, doc){
        if (err) {
            res.status(500)
            res.json(err)
        }


        if (doc) {
            response ='Validado';
        } else {
            response = 'fail';
        }
        res.send(response);


       //res.json(doc) 
       //res.send("Validado")
        
        
    })
})




























//Obtener todos los eventos
Router.get('/all', function(req, res) {
    Eventos.find({}).exec(function(err, docs) {
        if (err) {
            res.status(500)
            res.json(err)
        }
        res.json(docs)
    })
})

// Obtener un usuario por su id
Router.get('/', function(req, res) {
    let nombre = req.query.nombre
    Users.findOne({nombres: nombre}).exec(function(err, doc){
        if (err) {
            res.status(500)
            res.json(err)
        }
        res.json(doc)
    })
})

// Agregar un evento
Router.post('/newEvento', function(req, res) {
    let Evento = new Eventos({
        title: req.body.title,
        start: req.body.start,
        end: req.body.end,
        nombre: req.body.nombre
    })
    Evento.save(function(error) {
        if (error) {
            res.status(500)
            res.json(error)
        }
        res.send("Evento Guardado")
    })
})

// Eliminar un usuario por su id
Router.get('/delete/:id', function(req, res) {
    let uid = req.params.id
    Users.remove({userId: uid}, function(error) {
        if(error) {
            res.status(500)
            res.json(error)
        }
        res.send("Registro eliminado")
    })
})

// Inactivar un usuario por su id
Router.post('/inactive/:id', function(req, res) {

})

// Activar un usuario por su id
Router.post('/active/:id', function(req, res) {

})

module.exports = Router
