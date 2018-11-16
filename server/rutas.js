const Router = require('express').Router();
const Users = require('./model.js')
const Eventos = require('./modelEvento.js')



// Agregar un usuario
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

// Agregar un evento
Router.post('/newEvento', function(req, res) {
    let Evento = new Eventos({
        title: req.body.title,
        start: req.body.start,
        end: req.body.end,
        nombre: req.body.nombre,
        id: Math.floor(Math.random() * 50)
    })
    Evento.save(function(error) {
        if (error) {
            res.status(500)
            res.json(error)
        }
        res.send("Evento Guardado")
    })
})



// Eliminar un evento por su id
Router.post('/delete', function(req, res) {
    let eid = req.body.id
    Eventos.remove({id: eid}, function(error) {
        if(error) {
            res.status(500)
            res.json(error)
        }
        res.send("Evento eliminado")
    })
})


// actualizar un evento por su id
Router.post('/update', function(req, res) {
    let eid = req.body.id
    let eNewFecha = req.body.nuevaFecha
    Eventos.update({id : eid}, {$set: {start : "2018-11-28T07:10:00"}}, function(error) {
        if(error) {
            res.status(500)
            res.json(error)
        }
        res.send("Evento Actualizado")
    })
})


//db.eventos.update({id:"28"}, {$set:  {start: "2018-11-11T07:10:00"}})










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



// Inactivar un usuario por su id
Router.post('/inactive/:id', function(req, res) {

})

// Activar un usuario por su id
Router.post('/active/:id', function(req, res) {

})

module.exports = Router
