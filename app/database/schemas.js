var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ObjectId = Schema.ObjectId;

// Create a schema
var TarefasSchema = new mongoose.Schema({
  id: ObjectId,
  completed: Boolean,
  descricao: String,
  dataLimite: Date,
  prioridade: Number
});

// Create a schema
var ProjetoSchema = new mongoose.Schema({
  id: ObjectId,
  nome: String,
  descricao: String,
  dataCriacao: Date,
  email: String,
  tarefas: [TarefasSchema]
});

module.exports = {
    Projeto: ProjetoSchema
}