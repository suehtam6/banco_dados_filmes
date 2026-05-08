/*************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados dos generos banco de dados mySQL
 * Data: 2026/05/08
 * Autor: Matheus Lucas
 * Versão: 1.0
 *************************************************************************************/

// Import da biblioteca Knex para manipular dados no Banco de dados MySQL.
const knex = require('knex')

// Import do arquivo para configuração para acesso ao banco de dados.
const knexDataBaseConfig = require('../../database_config/knexConfig.js')

// Criar a conexão com o banco de dados mySQL conforme o arquivo de configuração.
const knexConection = knex(knexDataBaseConfig.development)


//Criando funções para fazer o CRUD
const insertGenero = async function(genero) {
    
    try {
        let sql = `insert into tbl_genero(
                       genero
                    )values(
                        '${genero.genero}'
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

const updateGenero = async function(genero) {
    try {
        let sql = `update tbl_genero set
                    genero = '${genero.genero}'
                    where id = ${genero.id};`

        let result = await knexConection.raw(sql)

        if(result){
            return true
        }else{
            return false
        }
    } catch (error) {
        
    }
}

const selectAllGenero = async function(){
    try {
        let sql = `select * from tbl_genero order by id desc;`

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

const selectByIdGenero = async function(id){
    try {
        // Script SQL para listar o filme de acordo com o ID.
        let sql = `select * from tbl_genero where id=${id};`

        let result = await knexConection.raw(sql)


        if (Array.isArray(result)) {
            return result[0]

        } else {
            return false
        }

    } catch (error) {
        return false
    }

}

const deleteGenero = async function(id){
    try {
        let sql = `delete from tbl_genero where id=${id};`

        let result = await knexConection.raw(sql)
        if (result) {
            return true
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

module.exports = {
    insertGenero,
    updateGenero,
    selectAllGenero,
    selectByIdGenero,
    deleteGenero
}