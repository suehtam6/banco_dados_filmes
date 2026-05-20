/**************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados da nascionalidade dos papeis dos profissionais no banco de dados mySQL
 * Data: 2026/05/15
 * Autor: Matheus Lucas
 * Versão: 1.0
 **************************************************************************************************************************/

// Import da biblioteca Knex para manipular dados no Banco de dados MySQL.
const knex = require('knex')

// Import do arquivo para configuração para acesso ao banco de dados.
const knexDataBaseConfig = require('../../database_config/knexConfig.js')

// Criar a conexão com o banco de dados mySQL conforme o arquivo de configuração.
const knexConection = knex(knexDataBaseConfig.development)


const insertPapel = async function(dados) {
    try {
        
        let sql = `insert into tbl_papel(
                            papel
                        )values(
                            '${dados.papel}'
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

const updatePapel = async function(dados) {
 
    try {
        let sql = `update tbl_papel set
                        papel = '${dados.papel}'
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

const selectAllPapel = async function() {
    try {
        let sql = `select * from tbl_papel order by id desc;`

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

const selectByIdPapel = async function(id) {
    try {
        
        try {
            
            let sql = `select * from tbl_papel where id = ${id};`

            let result = await knexConection.raw(sql)

            if(result){
                return result[0]
            }else{
                return false
            }

        } catch (error) {
            return false
        }

    } catch (error) {
        return false
    }
}

const deletePapel = async function(id) {
    try {
        
        let sql = `delete from tbl_papel where id = ${id};`

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
    insertPapel,
    updatePapel,
    selectAllPapel,
    selectByIdPapel,
    deletePapel
}