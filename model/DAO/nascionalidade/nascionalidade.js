/***************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados da nascionalidade dos profissionais banco de dados mySQL
 * Data: 2026/05/14
 * Autor: Matheus Lucas
 * Versão: 1.0
 ***************************************************************************************************************/

// Import da biblioteca Knex para manipular dados no Banco de dados MySQL.
const knex = require('knex')

// Import do arquivo para configuração para acesso ao banco de dados.
const knexDataBaseConfig = require('../../database_config/knexConfig.js')

// Criar a conexão com o banco de dados mySQL conforme o arquivo de configuração.
const knexConection = knex(knexDataBaseConfig.development)


const insertNascionalidade = async function(nascionalidade) {
    try {
        let sql = `insert into tbl_nascionalidade(
                        nascionalidade
                    )values(
                        'Americano'
                    );`
    let result = await knexConection.raw(sql)

    if(result){
        return result[0].insertId
    }else{
        return false
    }

    } catch (error) {
        return false
    }
}

const updateNascionalidade = async function(nascionalidade) {
    
}

const selectAllNascionalidade = async function() {
    
}

const selectByIdNascionalidade = async function(id) {
    
}

const deleteNascionalidade = async function(id){
    
}

module.exports = {
    insertNascionalidade,
    updateNascionalidade,
    selectAllNascionalidade,
    selectByIdNascionalidade,
    deleteNascionalidade
}