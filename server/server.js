const express = require('express');
const bodyParser = require('body-parser');
const db = require("./db.js");
const app = express();
const port = 5000;
const cors = require('cors')

db.connect();

app.use(cors());
app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

app.get('/pacientes', async (req, res) => {

    db.getPacientes()
        .then((rows) => res.send(rows))
        .catch((err) => res.send([err]));

});

app.get('/pacienteID/:id?', async (req, res) => {

    db.getPacientesID(req.params.id)
        .then((rows) => res.send(rows))
        .catch((err) => res.send([err]));

});

app.get('/delPacienteID/:id?', async (req, res) => {

    db.delPacienteID(req.params.id)
        .then((rows) => res.send(rows))
        .catch((err) => res.send([err]));

});

app.post('/paciente', async (req, res) => {

    const obj = {
        id: req.body.id,
        nome: req.body.nome,
        email: req.body.email,
        cpf: req.body.cpf,
        rg: req.body.rg,
        nasc: req.body.nasc,
        senha: req.body.senha
    }

    db.setPacientes(obj)
        .then((rows) => res.send(rows))
        .catch((err) => res.send([err]));

});

app.get('/medicos', async (req, res) => {

    db.getMedicos()
        .then((rows) => res.send(rows))
        .catch((err) => res.send([err]));

});

app.get('/medicoID/:id?', async (req, res) => {

    db.getMedicosID(req.params.id)
        .then((rows) => res.send(rows))
        .catch((err) => res.send([err]));

});

app.get('/delmedicoID/:id?', async (req, res) => {

    db.delMedicosID(req.params.id)
        .then((rows) => res.send(rows))
        .catch((err) => res.send([err]));

});

app.post('/medico', async (req, res) => {

    const obj = {
        id: req.body.id,
        nome: req.body.nome,
        especialidade: req.body.especialidade,
        cpf: req.body.cpf,
        rg: req.body.rg,
        nasc: req.body.nasc,
        senha: req.body.senha
    }

    db.setMedicos(obj)
        .then((rows) => res.send(rows))
        .catch((err) => res.send([err]));

});

app.get('/consultas', async (req, res) => {

    db.getConsultas()
        .then((rows) => res.send(rows))
        .catch((err) => res.send([err]));

});

app.get('/consultaID/:id?', async (req, res) => {

    db.getConsultaID(req.params.id)
        .then((rows) => res.send(rows))
        .catch((err) => res.send([err]));

});

app.get('/delconsultaID/:id?', async (req, res) => {

    db.delConsultaID(req.params.id)
        .then((rows) => res.send(rows))
        .catch((err) => res.send([err]));

});

app.post('/consulta', async (req, res) => {

    const obj = {
        id: req.body.id,
        paciente: req.body.paciente,
        medico: req.body.medico,
        dia: req.body.dia,
        hora: req.body.hora,
       
    }

    db.setConsulta(obj)
        .then((rows) => res.send(rows))
        .catch((err) => res.send([err]));

});

app.listen(port, () => console.log(`servidor no ar porta ${port}`))



