async function connect() {
    
    console.log('a',global.connection);
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const strConn = require("./strConn.js");
    const connection = await mysql.createConnection(strConn.strConn);
    console.log('Conectou no MySql');
    global.connection = connection;
    return connection;

}


async function getPacientes() {

    try{
        
        const [rows] = await global.connection.query('select * from paciente');
        return rows;

    }catch(err){

        return err;

    }

}

async function getPacientesID(id) {

    try{
        
        const [rows] = await global.connection.query('select * from paciente where id = ' + id);
        return rows;

    }catch(err){

        return err;

    }

}

async function delPacienteID(id) {

    try{
        
        await global.connection.query('delete from consulta where paciente = ' + id);
        await global.connection.query('delete from paciente where id = ' + id);
        return ['true'];

    }catch(err){

        return err;

    }

}

async function setPacientes(obj) {

    try{

        let query = 'aaa';

        if(obj.id > 0){

            query = 
            `UPDATE paciente
            SET
            nome = '${obj.nome}',
            email = '${obj.email}',
            cpf = '${obj.cpf}',
            rg = '${obj.rg}',
            nasc = '${obj.nasc}',
            senha = '${obj.senha}'
            WHERE id = ${obj.id};`;

        }else{
            query = 
            `INSERT INTO paciente(nome,email,cpf,rg,nasc,senha)
            VALUES('${obj.nome}','${obj.email}','${obj.cpf}','${obj.rg}','${obj.nasc}','${obj.senha}')`;
        }
        
        await global.connection.query(query);
        return ['true'];

    }catch(err){

        return err;

    }

}

async function getMedicos() {

    try{
        
        const [rows] = await global.connection.query('select * from medico');
        return rows;

    }catch(err){

        return err;

    }

}


async function getMedicosID(id) {

    try{
        
        const [rows] = await global.connection.query('select * from medico where id = ' + id);
        return rows;

    }catch(err){

        return err;

    }

}

async function delMedicosID(id) {

    try{
        
        await global.connection.query('delete from consulta where medico = ' + id);
        await global.connection.query('delete from medico where id = ' + id);
        return ['true'];

    }catch(err){

        return err;

    }

}

async function setMedicos(obj) {

    try{

        let query = 'aaa';

        if(obj.id > 0){

            query = 
            `UPDATE medico
            SET
            nome = '${obj.nome}',
            especialidade = '${obj.especialidade}',
            cpf = '${obj.cpf}',
            rg = '${obj.rg}',
            nasc = '${obj.nasc}',
            senha = '${obj.senha}'
            WHERE id = ${obj.id};`;

        }else{
            query = 
            `INSERT INTO medico(nome,especialidade,cpf,rg,nasc,senha)
            VALUES('${obj.nome}','${obj.especialidade}','${obj.cpf}','${obj.rg}','${obj.nasc}','${obj.senha}')`;
        }
        
        await global.connection.query(query);
        return ['true'];

    }catch(err){

        return err;

    }

}

async function getConsultas() {

    try{
        
        const qy = 
        `select c.id, c.dia, c.hora, p.nome as paciente, m.nome  as medico
           from consulta as c, paciente as p, medico as m
          where c.paciente = p.id
            and c.medico = m.id 
          order by STR_TO_DATE(c.dia,'%d/%m/%Y') desc;`
        ;
        const [rows] = await global.connection.query(qy);
        return rows;

    }catch(err){

        return err;

    }

}

async function getConsultaID(id) {

    try{

        const qy = 
        `select c.id, c.dia, c.hora, c.paciente as idpaciente, c.medico as idmedico,p.nome as paciente, m.nome  as medico
           from consulta as c, paciente as p, medico as m
          where c.paciente = p.id
            and c.medico = m.id 
            and c.id = ${id};`
        ;
        
        const [rows] = await global.connection.query(qy);
        return rows;

    }catch(err){

        return err;

    }

}

async function delConsultaID(id) {

    try{
        
        await global.connection.query('delete from consulta where id = ' + id);
        return ['true'];

    }catch(err){

        return err;

    }

}

async function setConsulta(obj) {

    try{

        let query = 'aaa';

        if(obj.id > 0){

            query = 
            `UPDATE consulta
            SET
            paciente = ${obj.paciente},
            medico = ${obj.medico},
            dia = '${obj.dia}',
            hora = '${obj.hora}'
            WHERE id = ${obj.id};`;

        }else{
            query = 
            `INSERT INTO consulta(paciente,medico,dia,hora)
            VALUES(${obj.paciente},${obj.medico},'${obj.dia}','${obj.hora}')`;
        }
  
        await global.connection.query(query);
        return ['true'];

    }catch(err){

        return err;

    }

}

module.exports =  {
    connect,
    
    getPacientes,
    getPacientesID,
    setPacientes,
    delPacienteID,
    
    getMedicos,
    getMedicosID,
    setMedicos,
    delMedicosID,

    getConsultas,
    getConsultaID,
    setConsulta,
    delConsultaID,
};

