/**************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados sobre o filme, o profissional e o cargo no banco de dados mySQL
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

//Função para inserir um filme Profissional
const insertFilmeProfissional = async function (dados) {

    try {

        let sql = `insert into tbl_filme_profissional_cargo_papel(
                        id_filme,
                        id_profissional,
                        id_cargo,
                        id_papel
                    )values(
                        ${dados.id_filme},
                        ${dados.id_profissional},
                        ${dados.id_cargo},
                        ${dados.id_papel}
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

//Função para atualizar um filme Profissional
const updateFilmeProfissional = async function (dados) {

    try {

        let sql = `update tbl_filme_profissional_cargo_papel set
                    id_filme = ${dados.id_filme},
                    id_profissional = ${dados.id_profissional},
                    id_cargo = ${dados.id_cargo},
                    id_papel = ${dados.id_papel}
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
const selectAllFilmeProfissional = async function () {

    try {
        // Script SQL para listar todos os filmes.
        let sql = 'select * from tbl_filme_profissional_cargo_papel order by id desc;'

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

//Função para selecionar por id cada filme Profissional
const selectByIdFilmeProfissional = async function (id) {
    try {
        // Script SQL para listar o filme de acordo com o ID.
        let sql = `select * from tbl_filme_profissional_cargo_papel where id=${id};`

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

//Função para retornar os dados do Profissional filtrando pelo ID do filme
const selectProfissionalsByIdFilme = async function (idfilme) {
    try {
        // Script SQL para listar o filme de acordo com o ID.
        let sql = `select tbl_profissional.*, tbl_cargo.cargo, tbl_papel.papel, tbl_nacionalidade.nacionalidade
                    from tbl_filme
                        inner join tbl_filme_profissional_cargo_papel
                            on tbl_filme.id = tbl_filme_profissional_cargo_papel.id_filme
                        inner join tbl_profissional
                            on tbl_profissional.id = tbl_filme_profissional_cargo_papel.id_profissional
                        inner join tbl_cargo
                            on tbl_cargo.id = tbl_filme_profissional_cargo_papel.id_cargo
                        inner join tbl_papel
                            on tbl_papel.id = tbl_filme_profissional_cargo_papel.id_papel
                        inner join tbl_profissional_nacionalidade
                            on tbl_profissional.id = tbl_profissional_nacionalidade.id_profissional
                        inner join tbl_nacionalidade
                            on tbl_profissional_nacionalidade.id_nacionalidade
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

//Função para retornar os dados do Filme filtrando pelo ID do profissional
const selectFilmesByIdProfissional = async function (idProfissional) {
    try {
        // Script SQL para listar o filme de acordo com o ID.
        let sql = `select tbl_filme.*
                    from tbl_filme
                        inner join tbl_filme_profissional_cargo
                            on tbl_filme.id = tbl_filme_profissional_cargo.id_filme
                        inner join tbl_profissional
                            on tbl_profissional.id = tbl_filme_profissional_cargo.id_profissional
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
const deleteFilmeProfissional = async function (id) {
    try {
        let sql = `delete from tbl_filme_profissional_cargo_papel where id=${id};`

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

//Função para excluir os profissionais relacionados com um filme
//OBS: Esta função será utilizada no PUT do Filme
const deleteProfissionalsByIdFilme = async function (idFilme) {
    try {
        let sql = `delete from tbl_filme_profissional_cargo_papel where id_filme=${idFilme};`

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
    insertFilmeProfissional,
    updateFilmeProfissional,
    selectAllFilmeProfissional,
    selectByIdFilmeProfissional,
    selectFilmesByIdProfissional,
    selectProfissionalsByIdFilme,
    deleteFilmeProfissional,
    deleteProfissionalsByIdFilme
}