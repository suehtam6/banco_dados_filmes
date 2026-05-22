/**************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados sobre o filme e o gênero no banco de dados mySQL
 * Data: 2026/05/22
 * Autor: Matheus Lucas
 * Versão: 1.0
 **************************************************************************************************************************/

// Import da biblioteca Knex para manipular dados no Banco de dados MySQL.
const knex = require('knex')

// Import do arquivo para configuração para acesso ao banco de dados.
const knexDataBaseConfig = require('../../database_config/knexConfig.js')

// Criar a conexão com o banco de dados mySQL conforme o arquivo de configuração.
const knexConection = knex(knexDataBaseConfig.development)


const insertFilmeGenero = async function(dados) {
    
    try {
        
        let sql = `insert into tbl_filme_genero(
                        id_filme,
                        id_genero
                    )values(
                        ${dados.id_filme},
                        ${dados.id_genero}
                    );`

        // Coloca o script SQL dentro do banco de dados
        // await serve para evitar do knexConection mande o scritp e ja comece a rodar as outras funções sem nem ter chegado no BD o script antigo.
        // E para utilizar o await a função tem que ser async.
        let result = await knexConection.raw(sql)

        if (result) {
            return result[0].insertId
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}

const updateFilmeGenero = async function(dados) {

    try {

        let sql = `update tbl_filme_genero set
                    id_filme = ${dados.id_filme},
                    id_genero = ${dados.id_genero}
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

const selectAllFilmeGenero = async function() {
    
    try {
        // Script SQL para listar todos os filmes.
        let sql = 'select * from tbl_filme_genero order by id desc;'

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

const selectByIdFilmeGenero = async function(id) {
    try {
        // Script SQL para listar o filme de acordo com o ID.
        let sql = `select * from tbl_filme_genero where id=${id};`

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
const selectGenerosByIdFilme = async function(idfilme) {
    try {
        // Script SQL para listar o filme de acordo com o ID.
        let sql = `select tbl_genero.*
                    from tbl_filme
                        inner join tbl_filme_genero
                            on tbl_filme.id = tbl_filme_genero.id_filme
                        inner join tbl_genero
                            on tbl_genero.id = tbl_filme_genero.id_genero
                    where tbl_filme.id=${idfilme};`

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
const selectFilmesByIdGenero = async function(idGenero) {
    try {
        // Script SQL para listar o filme de acordo com o ID.
        let sql = `select tbl_filme.*
                    from tbl_filme
                        inner join tbl_filme_genero
                            on tbl_filme.id = tbl_filme_genero.id_filme
                        inner join tbl_genero
                            on tbl_genero.id = tbl_filme_genero.id_genero
                    where tbl_genero.id=${idGenero};`

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




const deleteFilmeGenero = async function(id) {
    try {
        let sql = `delete from tbl_filme_genero where id=${id};`

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
    insertFilmeGenero,
    updateFilmeGenero,
    selectAllFilmeGenero,
    selectByIdFilmeGenero,
    selectFilmesByIdGenero,
    selectGenerosByIdFilme,
    deleteFilmeGenero
}