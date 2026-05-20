/************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD da nascionalidade
 * Data: 2026-05-14
 * Autor: Matheus Lucas
 * Versão: 1.0
 *************************************************************************************************************************/

// Import do arquivo de configurações de mensagens do projeto.
const configMessages = require('../modulo/configMessages.js')

// Import do arquivo para verificar se o script rodou dentro do banco.
const papelDAO = require('../../model/DAO/papel/papel.js')


const inserirNovoPapel = async function (dados, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

}

const atualizarPapel = async function (dados, id, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

}

const listarPapel= async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

}

const buscarPapel = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

}

const excluirPapel = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))


}

const validarDados = async function (dados) {
    // Fazendo um clone do meu JSON para poder modificar caso seja necessario.
    // Ele converte um objeto para string e depois transforma em um outro objeto.
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if (dados.papel == undefined || dados.papel == '' || dados.papel == null || dados.papel.length > 30) {
        customMessage.ERROR_BAD_REQUEST.field = '[PAPEL] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else {
        return false
    }
}

const tratarDados = async function (dados) {

    dados.papel == dados.papel.replaceAll("'", "")

    return dados

}



module.exports = {
    inserirNovoPapel,
    atualizarPapel,
    listarPapel,
    buscarPapel,
    excluirPapel
}