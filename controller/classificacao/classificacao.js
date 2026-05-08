/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD da classificacao
 * Data: 2026-04-17
 * Autor: Matheus Lucas
 * Versão: 1.0
 ************************************************************************************************************************/

// Import do arquivo de configurações de mensagens do projeto.
const configMessages = require('../modulo/configMessages.js')

// Import do arquido DAO para manipular os dados de filme no Banco de Dados.
const classificacaoDAO = require('../../model/DAO/classificacao/classificacao.js')

const inserirNovaClassificacao = async function (classificacao, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let validar = await validarDados(classificacao)

            if(validar){
                return validar
            }else{
                let result = await classificacaoDAO.insertClassificacao(await tratarDados(classificacao))

                if(result){
                    classificacao.id = result
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATE_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATE_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATE_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = classificacao
                    return customMessage.DEFAULT_MESSAGE // RETORNA UM 201
                }else{
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL
                }
            }
            
        }else{
            return customMessage.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // RETORNA UM 500 (Controller)
    }

}

const atualizarClassificacao = async function (classificacao) {
    let sql = `update tbl_classificacao set
                    classificacao = '${classificacao.classificacao}'`
}

const listarClassificacao = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        
        let result = await classificacaoDAO.selectALLClassificacao()

        if(result){
            if(result.length > 0){
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_RESPONSE.message
                customMessage.DEFAULT_MESSAGE.response = result

                return customMessage.DEFAULT_MESSAGE // RETORNA UM 200
            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // RETORNA UM 500 (MODEL)
            }

        }else{
            return customMessage.ERROR_NOT_FOUND // RETORNA UM 404
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // RETORNA UM 500 (CONTROLLER)
    }
}

const buscarClassificacao = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if(id == undefined || String(id).replaceAll(' ', '') == '' || isNaN(id) || id <=0){
            customMessage.DEFAULT_MESSAGE.field = '[ID] INVÁLIDO'
            return customMessage.DEFAULT_MESSAGE
        }else{

            let result = await classificacaoDAO.selectByIdClassificacao(id)
            if(result){
                if(result.length > 0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_RESPONSE.message
                    customMessage.DEFAULT_MESSAGE.response = result
                    return customMessage.DEFAULT_MESSAGE
                }else{
                    return customMessage.ERROR_NOT_FOUND // Retorna um 404
                }
            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // RETORNA UM 500 (MODEL)
            }
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //RETORNA UM 500(CONTROLLER)
    }
}

const excluirClassificacao = async function (id) {

}

//Funções para validar
const validarDados = async function (classificacao) {
    if(classificacao.classificacao == undefined || classificacao.classificacao == '' || classificacao.classificacao == null || classificacao.classificacao.length > 8){
        customMessage.ERROR_BAD_REQUEST.field = '[CLASSIFICACAO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }else{
        return false
    }
}

const tratarDados = async function (classificacao) {
    classificacao.classificacao = classificacao.classificacao.replaceAll("'", "")

    return classificacao
}

module.exports = {
    inserirNovaClassificacao,
    atualizarClassificacao,
    listarClassificacao,
    buscarClassificacao,
    excluirClassificacao
}
