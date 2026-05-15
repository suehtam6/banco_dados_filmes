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
                        '${nascionalidade.nascionalidade}'
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
    try {
        let sql = `update tbl_nascionalidade set
                        nascionalidade = '${nascionalidade.nascionalidade}'
                            where id = ${nascionalidade.id};`
        
        let result = await knexConection.raw(sql)

        if(result){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

const selectAllNascionalidade = async function() {
    try {
        let sql = `select * from tbl_nascionalidade order by id desc;`

        let result = await knexConection.raw(sql)

        if(result){
            return result[0]
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

const selectByIdNascionalidade = async function(id) {
    try {
        let sql = `select * from tbl_nascionalidade where id = ${id}`

        let result = await knexConection.raw(sql)

        if(result){
            return result[0]
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}

const deleteNascionalidade = async function(id){
    try {
        let sql = `delete from tbl_nascionalidade where id=${id};`

        let result = await knexConection.raw(sql)

        if(result){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

module.exports = {
    insertNascionalidade,
    updateNascionalidade,
    selectAllNascionalidade,
    selectByIdNascionalidade,
    deleteNascionalidade
}