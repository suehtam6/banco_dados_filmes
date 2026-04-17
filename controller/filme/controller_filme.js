/*****************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD de filme
 * Data: 2026-04-17
 * Autor: Matheus Lucas
 * Versão: 1.0
 ******************************************************************************************************************/

// Import do arquivo de configurações de mensagens do projeto.
const configMessages = require('../modulo/configMessages.js')

// Import do arquido DAO para manipular os dados de filme no Banco de Dados.
const filmeDAO = require('../../model/DAO/filme/filme.js')

// Função para inserir um novo filme.
const inserirNovoFilme = async function (filme) {

    // Fazendo um clone do meu JSON para poder modificar caso seja necessario.
    // Ele converte um objeto para string e depois transforma em um outro objeto.
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    
    if (filme.nome == '' || filme.nome == null || filme.nome == undefined || filme.nome.length > 80) {
        customMessage.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
    } else if (filme.sinopse == '' || filme.sinopse == null || filme.sinopse == undefined) {
        customMessage.ERROR_BAD_REQUEST.field = '[SINÓPSE] INVÁLIDO'
    } else if (filme.capa == '' || filme.capa == null || filme.capa == undefined || filme.capa.length > 255) {
        customMessage.ERROR_BAD_REQUEST.field = '[CAPA] INVÁLIDO'
    } else if (filme.data_lancamento == '' || filme.data_lancamento == null || filme.data_lancamento == undefined || filme.data_lancamento.length != 10) {
        customMessage.ERROR_BAD_REQUEST.field = '[DATA DE LANÇAMENTO] INVÁLIDO'
    } else if (filme.duracao == '' || filme.duracao == null || filme.duracao == undefined || filme.duracao.length < 5) {
        customMessage.ERROR_BAD_REQUEST.field = '[DURAÇÃO] INVÁLIDO'
    } else if (filme.valor == undefined || isNaN(filme.valor) || filme.valor.length > 5) {
        customMessage.ERROR_BAD_REQUEST.field = '[VALOR] INVÁLIDO'
    } else if (filme.avaliacao == undefined || isNaN(filme.avaliacao) || filme.avaliacao.length > 3) {
        customMessage.ERROR_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDO'
        
    } else {
        let result = await filmeDAO.insertFilme(filme)
        if(result){
            customMessage.DEFAULT_MESSAGE.status        = customMessage.SUCCESS_CREATE_ITEM.status
            customMessage.DEFAULT_MESSAGE.status_code   = customMessage.SUCCESS_CREATE_ITEM.status_code
            customMessage.DEFAULT_MESSAGE.message       = customMessage.SUCCESS_CREATE_ITEM.message
            customMessage.DEFAULT_MESSAGE.response = filme
            
        }else{
            customMessage.DEFAULT_MESSAGE.status        = customMessage.ERROR_INTERNAL_SERVER_MODEL.status
            customMessage.DEFAULT_MESSAGE.status_code   = customMessage.ERROR_INTERNAL_SERVER_MODEL.status_code
            customMessage.DEFAULT_MESSAGE.message       = customMessage.ERROR_INTERNAL_SERVER_MODEL.message
           
        }
        
        return customMessage.DEFAULT_MESSAGE
    }

}

// Função para atualizar um filme existente.
const atualizarFilme = async function (filme) {
}

// Função para retornar todos os filmes existentes.
const listarFilme = async function (filme) {
}

// Função para buscar um filme filtrando pelo id.
const buscarFilme = async function (id) {
}

// Função para excluir um filme.
const excluirFilme = async function (filme) {
}

module.exports = {
    inserirNovoFilme,
    atualizarFilme,
    listarFilme,
    buscarFilme,
    excluirFilme
}