/**************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados sobre a filmografia no banco de dados mySQL
 * Data: 2026/05/20
 * Autor: Matheus Lucas
 * Versão: 1.0
 **************************************************************************************************************************/

// Import da biblioteca Knex para manipular dados no Banco de dados MySQL.
const knex = require('knex')

// Import do arquivo para configuração para acesso ao banco de dados.
const knexDataBaseConfig = require('../../database_config/knexConfig.js')

// Criar a conexão com o banco de dados mySQL conforme o arquivo de configuração.
const knexConection = knex(knexDataBaseConfig.development)



const insertFilmografia = async function(dados) {
    try {
        
        let sql = `insert into tbl_filmografia(
                        filmografia,
                        capa
                    )values(
                        "${dados.filmografia}",
                        "${dados.capa}"
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

const updateFilmografia = async function(dados) {
 
    try {
        let sql = `update tbl_filmografia set
                        filmografia = '${dados.filmografia}',
                        capa = '${dados.capa}'
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

const selectAllFilmografia = async function() {
    try {
        let sql = `select * from tbl_filmografia order by id desc;`

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

const selectByIdFilmografia = async function(id) {
    try {
        
        try {
            
            let sql = `select * from tbl_filmografia where id = ${id};`

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

const deleteFilmografia = async function(id) {
    try {
        
        let sql = `delete from tbl_filmografia where id = ${id};`

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
    insertFilmografia,
    updateFilmografia,
    selectAllFilmografia,
    selectByIdFilmografia,
    deleteFilmografia
}