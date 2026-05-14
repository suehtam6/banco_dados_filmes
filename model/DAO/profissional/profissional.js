/*************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados do profissional banco de dados mySQL
 * Data: 2026/05/13
 * Autor: Matheus Lucas
 * Versão: 1.0
 *************************************************************************************/

// Import da biblioteca Knex para manipular dados no Banco de dados MySQL.
const knex = require('knex')

// Import do arquivo para configuração para acesso ao banco de dados.
const knexDataBaseConfig = require('../../database_config/knexConfig.js')

// Criar a conexão com o banco de dados mySQL conforme o arquivo de configuração.
const knexConection = knex(knexDataBaseConfig.development)

const insertProfissional = async function(dados) {
    try {
        let sql = `insert into tbl_profissional(
                        nome,
                        data_nascimento,
                        foto,
                        biografia
                    )values(
                        replace("${dados.nome}", "'", ""),
                        '${dados.data_nascimento}',
                        '${dados.foto}',
                        '${dados.biografia}'
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

const updateProfissional = async function(dados) {
    try {
        
        let sql = `update tbl_profissional set
                        nome 			= replace("${dados.nome}", "'", ""),
                        data_nascimento = '${dados.data_nascimento}',
                        foto 			= '${dados.foto}',
                        biografia 		= '${dados.biografia}'
                            where id = ${dados.id};`

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

const selectAllProfissional = async function() {
    try {
        let sql = `select * from tbl_profissional order by id desc`

        let result = await knexConection.raw(sql)

        if(Array.isArray(result)){
            return result[0] // Retornando o índice da lista dos profissionais
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}

const selectByIdProfissional = async function(id) {
    try {
        let sql = `select * from tbl_profissional where id=${id};`

        let result = await knexConection.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}

const deleteProfissional = async function(id) {
    try {
        let sql = `delete from tbl_profissional where id = ${id}`
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
    insertProfissional,
    updateProfissional,
    selectAllProfissional,
    selectByIdProfissional,
    deleteProfissional
}