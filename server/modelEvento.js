const mongoose = require('mongoose')
const Schema = mongoose.Schema

let EventoSchema = new Schema({
  nombre: { type: String, required: true, unique: true},
  start: { type: String, required: true },
  title: { type: String, required: true},
  end: { type: String, required: true}
})

let EventoModel = mongoose.model('Evento', EventoSchema)

module.exports = EventoModel
