/**************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados sobre o filme e o profissional no banco de dados mySQL
 * Data: 2026/05/29
 * Autor: Matheus Lucas
 * Versão: 1.0
 **************************************************************************************************************************/

// Import da biblioteca Knex para manipular dados no Banco de dados MySQL.
const knex = require('knex')

// Import do arquivo para configuração para acesso ao banco de dados.
const knexDataBaseConfig = require('../../database_config/knexConfig.js')

// Criar a conexão com o banco de dados mySQL conforme o arquivo de configuração.
const knexConection = knex(knexDataBaseConfig.development)

//Função para inserir um Profissional com cargo
const insertProfissionalCargo = async function(dados) {
    
    try {
        
        let sql = `insert into tbl_profissional_cargo(
                        id_cargo,
                        id_profissional
                    )values(
                        ${dados.id_cargo},
                        ${dados.id_profissional}
                    );`

        // Coloca o script SQL dentro do banco de dados
        // await serve para evitar do knexConection mande o scritp e ja comece a rodar as outras funções sem nem ter chegado no BD o script antigo.
        // E para utilizar o await a função tem que ser async.
        let result = await knexConection.raw(sql)
        console.log(result)
        if (result) {
            return result[0].insertId
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}
//Função para atualizar um filme Profissional
const updateProfissionalCargo = async function(dados) {

    try {

        let sql = `update tbl_profissional_cargo set
                    id_cargo = ${dados.id_cargo},
                    id_profissional = ${dados.id_profissional}
                    where id = ${dados.id};`

        let result = await knexConection.raw(sql)

        // Verificando se o result é verdadeiro ou não.
        if (result) {
            return true // Retornando o ID gerado no insert
        } else {
            return false
        }

    } catch (error) {
        return false
    }


}

//Função para selecionar todos os filme Profissional
const selectAllProfissionalCargo = async function() {
    
    try {
        // Script SQL para listar todos os filmes.
        let sql = 'select * from tbl_profissional_cargo order by id desc;'

        // Executa no BD o script e guarda o retorno do BD,
        // Pode ser um ERRO(false) ou um ARRAY com os dados.
        let result = await knexConection.raw(sql)
        
        // Verificando se o que está retornando é um ARRAY ou não.
        if (Array.isArray(result)) {
            return result[0] // Retorna somente o índice com a lista de filmes.
            
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}

//Função para selecionar por id cada Profissional com cargo
const selectByIdProfissionalCargo = async function(id) {
    try {
        // Script SQL para listar o filme de acordo com o ID.
        let sql = `select * from tbl_profissional_cargo where id=${id};`

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

//Função para retornar os dados do Gênero filtrando pelo ID do filme
const selectProfissionalsByIdCargo = async function(idCargo) {
    try {
        // Script SQL para listar o filme de acordo com o ID.
        let sql = `select tbl_profissional.*
                    from tbl_cargo
                        inner join tbl_profissional_cargo
                            on tbl_cargo.id = tbl_profissional_cargo.id_cargo
                        inner join tbl_profissional
                            on tbl_profissional.id = tbl_profissional_cargo.id_profissional
                    where tbl_cargo.id=${idCargo};`

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

//Função para retornar os dados do Gênero filtrando pelo ID do filme
const selectCargoByIdProfissional = async function(idProfissional) {
    try {
        // Script SQL para listar o filme de acordo com o ID.
        let sql = `select tbl_cargo.*
                    from tbl_cargo
                        inner join tbl_profissional_cargo
                            on tbl_cargo.id = tbl_profissional_cargo.id_cargo
                        inner join tbl_profissional
                            on tbl_profissional.id = tbl_profissional_cargo.id_profissional
                    where tbl_profissional.id=${idProfissional};`

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

//Função para deletar um filme Profissional
const deleteFilmeProfissionalCargo = async function(id) {
    try {
        let sql = `delete from tbl_profissional_cargo where id=${id};`

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

//Função para excluir os gêneros relacionados com um filme
//OBS: Esta função será utilizada no PUT do Filme
const deleteProfissionalsByIdCargo = async function(idCargo) {
    try {
        let sql = `delete from tbl_profissional_cargo where id_=${idCargo};`

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
    insertProfissionalCargo,
    updateProfissionalCargo,
    selectAllProfissionalCargo,
    selectByIdProfissionalCargo,
    selectCargoByIdProfissional,
    selectProfissionalsByIdCargo,
    deleteFilmeProfissionalCargo,
    deleteProfissionalsByIdCargo
}