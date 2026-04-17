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
    '${filme.avaliacao}'

);`

// Coloca o script SQL dentro do banco de dados
// await serve para evitar do knexConection mande o scritp e ja comece a rodar as outras funções sem nem ter chegado no BD o script antigo.
// E para utilizar o await a função tem que ser async.
let result = await knexConection.raw(sql)

    if(result){
        return true
    }else{
        return false
    }
}

// Função para atualizar um filme existente no banco de dados
const updateFilme = async function (filme) {

}

// Função para retornar todos os dados de filmes do banco de dados
const selectAllFilme = async function () {
}

// Função para selecionar um filme através do ID do filme
const selectByIdFilme = async function (id) {
}

// Função para deletar um filme existente no banco de dados através do ID
const deleteFilme = async function (id) {
}

module.exports = {
    insertFilme,
    updateFilme,
    selectAllFilme,
    selectByIdFilme,
    deleteFilme
}

