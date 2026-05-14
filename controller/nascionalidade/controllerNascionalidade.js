/************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD da nascionalidade
 * Data: 2026-05-14
 * Autor: Matheus Lucas
 * Versão: 1.0
 *************************************************************************************************************************/

// Import do arquivo de configurações de mensagens do projeto.
const configMessages = require('../modulo/configMessages.js')

// Import do arquivo para verificar se o script rodou dentro do banco.
const nascionalidadeDAO = require('../../model/DAO/nascionalidade/nascionalidade.js')


const inserirNovoNascionalidade = async function(dados, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // RETORNA UM 500 (Controller)
    }
}

const atualizarNascionalidade = async function(dados, id, contentType) {
    
}

const listarNascionalidade = async function() {
    
}

const buscarNascionalidade = async function(id) {
    
}

const excluirNascionalidade = async function(id) {
    
}

const validarDados = async function(dados) {
    
}

const tratarDados = async function(dados) {
    
}



module.exports = {
    inserirNovoNascionalidade,
    atualizarNascionalidade,
    listarNascionalidade,
    buscarNascionalidade,
    excluirNascionalidade
}