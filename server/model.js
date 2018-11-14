const mongoose = require('mongoose')
const Schema = mongoose.Schema

let UserSchema = new Schema({
  userId: { type: Number, required: true, unique: true},
  user: { type: String, required: true },
  nombre: { type: String, required: true},
  pass: { type: String, required: true},
  estado: { type: String, required: true, enum: ['Activo', 'Inactivo']}
})

let UserModel = mongoose.model('Usuario', UserSchema)

module.exports = UserModel
