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
const inserirNovoFilme = async function (filme, contentType) {

    // Fazendo um clone do meu JSON para poder modificar caso seja necessario.
    // Ele converte um objeto para string e depois transforma em um outro objeto.
    let customMessage = JSON.parse(JSON.stringify(configMessages))


    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDados(filme)

            // Retorna um JSON de erro caso algum atributo seja inválido,
            // senão retorna um false(Não teve erro)
            if (validar) {
                return validar // RETORNA UM 400
            } else {

                // Encaminha os dados fo Filme para o DAO inserir no banco de dados.
                let result = await filmeDAO.insertFilme(filme)
                if (result) { // RETORNA UM 201
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATE_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATE_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATE_ITEM.message

                    return customMessage.DEFAULT_MESSAGE // RETORNA UM 201

                } else { // retorna um 500(MODEL)

                    return customMessage.ERROR_INTERNAL_SERVER_MODEL // RETORNA UM 500 (Model)
                } // FECHA IF RESULT
            } // FECHA IF VALIDAR
        } else {
            return customMessage.ERROR_CONTENT_TYPE // RETORNA UM 415
        } // fecha if content type


    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // RETORNA UM 500 (Controller)
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

// Função para validar dados.
const validarDados = async function (filme) {

    // Fazendo um clone do meu JSON para poder modificar caso seja necessario.
    // Ele converte um objeto para string e depois transforma em um outro objeto.
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if (filme.nome == '' || filme.nome == null || filme.nome == undefined || filme.nome.length > 80) {
        customMessage.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (filme.sinopse == '' || filme.sinopse == null || filme.sinopse == undefined) {
        customMessage.ERROR_BAD_REQUEST.field = '[SINÓPSE] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (filme.capa == '' || filme.capa == null || filme.capa == undefined || filme.capa.length > 255) {
        customMessage.ERROR_BAD_REQUEST.field = '[CAPA] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (filme.data_lancamento == '' || filme.data_lancamento == null || filme.data_lancamento == undefined || filme.data_lancamento.length != 10) {
        customMessage.ERROR_BAD_REQUEST.field = '[DATA DE LANÇAMENTO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (filme.duracao == '' || filme.duracao == null || filme.duracao == undefined || filme.duracao.length < 5) {
        customMessage.ERROR_BAD_REQUEST.field = '[DURAÇÃO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (filme.valor == undefined || isNaN(filme.valor) || filme.valor.length > 5) {
        customMessage.ERROR_BAD_REQUEST.field = '[VALOR] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (filme.avaliacao == undefined || isNaN(filme.avaliacao) || filme.avaliacao.length > 3) {
        customMessage.ERROR_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else {
        return false
    }

}

module.exports = {
    inserirNovoFilme,
    atualizarFilme,
    listarFilme,
    buscarFilme,
    excluirFilme
}