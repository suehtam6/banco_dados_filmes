/*************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados do Filme banco de dados mySQL
 * Data: 2026/04/15
 * Autor: Matheus Lucas
 * Versão: 1.0
 *************************************************************************************/

// Import da biblioteca Knex para manipular dados no Banco de dados MySQL.
const knex = require('knex')

// Import do arquivo para configuração para acesso ao banco de dados.
const knexDataBaseConfig = require('../../database_config/knexConfig.js')

// Criar a conexão com o banco de dados mySQL conforme o arquivo de configuração.
const knexConection = knex(knexDataBaseConfig.development)


// Função para inserir um novo filme no banco de dados
const insertFilme = async function (filme) {

    try {
        let sql = `insert into tbl_filme(
            nome,
            sinopse,
            capa,
            data_lancamento,
            duracao,
            valor,
            avaliacao
        
        )values(
            '${filme.nome}',
            '${filme.sinopse}',
            '${filme.capa}',
            '${filme.data_lancamento}',
            '${filme.duracao}',
            '${filme.valor}',
            if('${filme.avaliacao}' = '', null , '${filme.avaliacao}')
        
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


} // fecha a insertFilme

// Função para atualizar um filme existente no banco de dados
const updateFilme = async function (filme) {
    try {

        let sql = `update tbl_filme set
                    nome            = '${filme.nome}',
                    sinopse         = '${filme.sinopse}',
                    capa            = '${filme.capa}',
                    data_lancamento = '${filme.data_lancamento}',
                    duracao         = '${filme.duracao}',
                    valor           = '${filme.valor}',
                    avaliacao       = if('${filme.avaliacao}' = '', null , '${filme.avaliacao}')
                    where id        = ${filme.id};`

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

// Função para retornar todos os dados de filmes do banco de dados
const selectAllFilme = async function () {
    try {
        // Script SQL para listar todos os filmes.
        let sql = 'select * from tbl_filme order by id desc'

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

// Função para selecionar um filme através do ID do filme
const selectByIdFilme = async function (id) {
    try {
        // Script SQL para listar o filme de acordo com o ID.
        let sql = `select * from tbl_filme where id=${id};`

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

// Função para deletar um filme existente no banco de dados através do ID
const deleteFilme = async function (id) {
    try {
        let sql = `delete from tbl_filme where id=${id};`

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
    insertFilme,
    updateFilme,
    selectAllFilme,
    selectByIdFilme,
    deleteFilme,
}

