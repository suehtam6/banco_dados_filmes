/*****************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD do gênero
 * Data: 2026-05-08
 * Autor: Matheus Lucas
 * Versão: 1.0
 ******************************************************************************************************************/

// Import do arquivo de configurações de mensagens do projeto.
const configMessages = require('../modulo/configMessages.js')

//Importando o arquivo do DAO para manipular os dados no BD
const generoDAO = require('../../model/DAO/genero/genero.js')

const inserirNovoGenero = async function(genero, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        // Verificando qual tipo de arquivo está chegando pelo header
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let validar = await validarDados(genero)

            if(validar){
                return validar // RETORNA UM 400 (VALIDAR)
            }else{
                // inserindo o novo genero, e tratando o dado para chegar se tem aspas(')
                let result = await generoDAO.insertGenero(await tratarDados(genero))
                if(result){
                    genero.id = result
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATE_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATE_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATE_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = genero
                    return customMessage.DEFAULT_MESSAGE // RETORNA UM 201
                }else{
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL //RETORNA UM 500 (MODEL)
                }
            }
        }else{
            return customMessage.ERROR_CONTENT_TYPE // RETORNA UM 415
        }
    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // RETORNA 500(CONTROLLER)
    }
}

const atualizarGenero = async function(genero, id, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            //Enviando para a função buscarGenero para saber se este id existe
            let resultBuscarGenero = await buscarGenero(id)

            //Verificando se o que esta retornando é um true
            if(resultBuscarGenero.status){

                if(resultBuscarGenero){
                    //Validando os dados
                    let validar = await validarDados(genero)

                    if(!validar){

                        genero.id = Number(id)
                        
                        //Enviando para o updateGenero para atualizar o filme, se o que retornar for um true ele vai 
                        // Mostrar a mensagem de sucesso, caso contrario irá mostrar o que falhou
                        let result = await generoDAO.updateGenero(await tratarDados(genero))
                        if(result){
                            customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                            customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                            customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                            customMessage.DEFAULT_MESSAGE.response = genero
                            return customMessage.DEFAULT_MESSAGE //RETORNA 200
                        }else{
                            return customMessage.ERROR_INTERNAL_SERVER_MODEL // RETORNA 500 (MODEL)
                        }
                    } // FECHA IF RESULT
                } // FECHA IF resultBuscarGenero

            }else{
                return resultBuscarGenero // RETORNA UM 400 E UM 404 do buscarGenero
            } // FECHA IF resultBuscarGenero.status

        }else{
            return customMessage.ERROR_CONTENT_TYPE // RETORNA UM 415 
        }// FECHA IF content-Type
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // RETORNA UM 500 (CONTROLLER)
    }

}

const listarGenero = async function() {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        
        let result = await generoDAO.selectAllGenero()
        // Verificando se o conteúdo executou o script
        if(result){
            // Verificando se o conteúdo está vazio
            if(result.length > 0){
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code // RETORNA UM 200
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.genero = result

                return customMessage.DEFAULT_MESSAGE // RETORNA UM 200
            }else{
                return customMessage.ERROR_NOT_FOUND // RETORNA UM 404
            }

        }else{
            return customMessage.ERROR_INTERNAL_SERVER_MODEL // RETORNA UM 500 (MODEL)
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // RETORNA UM 500(CONTROLLER)
    }
}

const buscarGenero = async function(id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if(id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <=0){
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST // RETORNA UM 400
        }else{

            let result = await generoDAO.selectByIdGenero(id)
            if(result){

                if(result.length > 0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.genero = result

                    return customMessage.DEFAULT_MESSAGE // RETORNA UM 200
                }else{
                    return customMessage.ERROR_NOT_FOUND // RETORNA UM 404
                }

            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // RETORNA UM 500 (MODEL)
            }

        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // RETORNA UM 500 (CONTROLLER)
    }
}

const excluirGenero = async function(id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarGenero = await buscarGenero(id)
        if(resultBuscarGenero.status){
            if(resultBuscarGenero){
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_DELETED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_DELETED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_DELETED_ITEM.message

                return customMessage.DEFAULT_MESSAGE
            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // RETORNA UM 500 (MODEL)
            }
        }else{
            return resultBuscarGenero // RETORNA 400 E 404
        } // FECHA IF resultBuscarGenero.status
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // RETORNA UM 500(CONTROLLER)
    }
}

const validarDados = async function(genero) {
    if(genero.genero == undefined || genero.genero == '' || genero.genero == null || genero.genero.length > 15){
        customMessage.ERROR_BAD_REQUEST.field = '[GÊNERO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }else{
        return false
    }
        
}

const tratarDados = async function(genero) {
    genero.genero = genero.genero.replaceAll("'", "")

    return genero
}

module.exports = {
    inserirNovoGenero,
    listarGenero,
    atualizarGenero,
    buscarGenero,
    excluirGenero
}