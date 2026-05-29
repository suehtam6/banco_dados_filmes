/**********************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD do Profissional
 * Data: 2026-04-17
 * Autor: Matheus Lucas
 * Versão: 1.0
 **********************************************************************************************************************/

// Import do arquivo de configurações de mensagens do projeto.
const configMessages = require('../modulo/configMessages.js')

// Import do arquido DAO para manipular os dados do profissional no Banco de Dados.
const profissionaCargoDAO = require('../../model/DAO/profissional_cargo/profissional_cargo.js')

const inserirNovoProfissionalCargo   = async function (dados) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
       
            let validar = await validarDados(dados)
            console.log(validar)
            if(!validar){

                let result = await profissionaCargoDAO.insertProfissionalCargo(dados)
                
                if(result){

                    dados.id = result
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATE_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATE_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATE_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = dados

                    return customMessage.DEFAULT_MESSAGE

                }else{
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL // RETORNA UM 500 (MODEL)
                }

            }else{
                return validar //RETORNA 400
            }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // RETORNA UM 500 (CONTROLLER)
    }

}

const atualizarProfissionalCargo     = async function (dados, id, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    
    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let resultBuscarProfissionalCargo = await buscarProfissionalCargo(id)

            //Verificando o status do buscarProfissionalCargo
            if(resultBuscarProfissionalCargo.status){
                if(resultBuscarProfissionalCargo){

                    
                    let validar = await validarDados(dados)
                    if(!validar){

                        dados.id = Number(id)
                        let result = await profissionaCargoDAO.updateProfissionalCargo(dados)

                        if(result){
                            customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                            customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                            customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                            customMessage.DEFAULT_MESSAGE.response = dados

                            return customMessage.DEFAULT_MESSAGE // RETORNA UM 200

                        }else{
                            return customMessage.ERROR_INTERNAL_SERVER_MODEL // RETORNA UM 500 (MODEL)
                        }

                    }else{
                        return validar // RETORNA UM 400
                    }
                }else{
                    return customMessage.ERROR_NOT_FOUND // RETORNA UM 404
                }


            }else{
                return resultBuscarProfissionalCargo // RETORNA UM 400 ou 404
            }


        }else{
            return customMessage.ERROR_CONTENT_TYPE // RETORNA UM 415
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // RETORNA UM 500 (CONTROLLER)
    }
    
}

const listarProfissionalCargo        = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await profissionaCargoDAO.selectAllProfissionalCargo()
        if(result){

            if(result.length > 0){

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code // RETORNA UM 200
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.profissional = result

                return customMessage.DEFAULT_MESSAGE

            }else{
                return customMessage.ERROR_NOT_FOUND // RETORNA UM 404 
            }


        }else{
            return customMessage.ERROR_INTERNAL_SERVER_MODEL // RETORNA UM 500 (MODEL)
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // RETORNA UM 500 (CONTROLLER)
    }
}

const buscarProfissionalCargo        = async function (id) {
     let customMessage = JSON.parse(JSON.stringify(configMessages))

     try {
        if(id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0){
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST // RETORNA UM 400
        }else{
            let result = await profissionaCargoDAO.selectByIdProfissionalCargo(id)

            //Verificando se está tudo correto
            if(result){

                //Verificando se está vazio
                if(result.length > 0){

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.profissional = result

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


//Função para buscar um Genero pelo ID do filme
const buscarProfissionalIdCargo = async function (idCargo) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idCargo == undefined || String(idCargo).replaceAll(' ', '') == '' || idCargo == null || isNaN(idCargo) || idCargo <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[id_cargo] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST // RETORNA UM 400
        } else {

            let result = await profissionaCargoDAO.selectProfissionalsByIdCargo(idCargo)
            if (result) {

                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme_genero = result

                    return customMessage.DEFAULT_MESSAGE // RETORNA UM 200
                } else {
                    return customMessage.ERROR_NOT_FOUND // RETORNA UM 404
                }

            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // RETORNA UM 500 (MODEL)
            }

        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // RETORNA UM 500 (CONTROLLER)
    }
}


//Função para buscar um filme pelo ID do gênero
const buscarCargoIdProfissional = async function (idProfissional) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idProfissional == undefined || String(idProfissional).replaceAll(' ', '') == '' || idProfissional == null || isNaN(idProfissional) || idProfissional <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID_GENERO] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST // RETORNA UM 400
        } else {

            let result = await profissionaCargoDAO.selectCargoByIdProfissional(idProfissional)
            if (result) {

                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme_profissional = result

                    return customMessage.DEFAULT_MESSAGE // RETORNA UM 200
                } else {
                    return customMessage.ERROR_NOT_FOUND // RETORNA UM 404
                }

            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // RETORNA UM 500 (MODEL)
            }

        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // RETORNA UM 500 (CONTROLLER)
    }
}

const excluirProfissionalCargo       = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarProfissionalCargo = await buscarProfissionalCargo(id)

        // Verificando se o retorna é verdadeiro(true)
        if(resultBuscarProfissionalCargo.status){
            let result = await profissionaCargoDAO.deleteProfissional(id)
            
            if(result){
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_DELETED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_DELETED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_DELETED_ITEM.message
                
                return customMessage.DEFAULT_MESSAGE // RETORNA UM 200 PARA ENVIAR UMA MENSAGEM DE OK!!
            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // RETORNA UM 500 (MODEL)
            }


        }else{
            return resultBuscarProfissionalCargo // Retorna um 404
        }


    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // RETORNA UM 500 (CONTROLLER)
    }


}


// Função para validar dados.
const validarDados = async function (profissionalCargo) {
    if (profissionalCargo.id_cargo == undefined || String(profissionalCargo.id_cargo).replaceAll(' ', '') == '' || profissionalCargo.id_cargo == null || isNaN(profissionalCargo.id_cargo) || profissionalCargo.id_cargo <= 0) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID CARGO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (profissionalCargo.id_Profissional == undefined || String(profissionalCargo.id_Profissional).replaceAll(' ', '') == '' || profissionalCargo.id_Profissional == null || isNaN(profissionalCargo.id_Profissional) || profissionalCargo.id_Profissional <= 0) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID PROFISSIONAL] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else {
        return false
    }

}

module.exports = {
    inserirNovoProfissionalCargo,
    atualizarProfissionalCargo,
    listarProfissionalCargo,
    buscarProfissionalCargo,
    buscarProfissionalIdCargo,
    buscarCargoIdProfissional,
    excluirProfissionalCargo
}