/************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD da filmografia
 * Data: 2026-05-20
 * Autor: Matheus Lucas
 * Versão: 1.0
 *************************************************************************************************************************/

// Import do arquivo de configurações de mensagens do projeto.
const configMessages = require('../modulo/configMessages.js')

//Import da DAO
const filmografiaDAO = require('../../model/DAO/filmografia/filmografia.js')


const inserirNovaFilmografia = async function (dados, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDados(dados)

            if (!validar) {

                let result = await filmografiaDAO.insertFilmografia(await tratarDados(dados))

                if (result) {

                    // Cria o ID do JSON do filme e adiciona o ID gerado no DAO
                    dados.id = result
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATE_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATE_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATE_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = dados
                    return customMessage.DEFAULT_MESSAGE // RETORNA UM 201

                } else {
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL //RETORNA UM 500 (MODEL)
                }

            } else {
                return validar // RETORNA UM 400
            }

        } else {
            return customMessage.ERROR_CONTENT_TYPE //RETORNA UM 415
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //RETORNA UM 500 (CONTROLLER)
    }

}

const atualizarFilmografia = async function (dados, id, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let resultBuscarFilmografia = await buscarFilmografia(id)

            if (resultBuscarFilmografia.status) {

                let validar = await validarDados(dados)

                if (!validar) {
                    dados.id = Number(id)
                    let result = await filmografiaDAO.updateFilmografia(await tratarDados(dados))

                    if (result) {
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = dados

                        return customMessage.DEFAULT_MESSAGE // RETORNA UM 200
                    } else {
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL //RETORNA UM 500 (MODEL)
                    }

                } else {
                    return validar //RETORNA UM 400
                }

            } else {
                return resultBuscarPapel //RETORNA UM 404
            }

        } else {
            return customMessage.ERROR_CONTENT_TYPE //RETORNA UM 415
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //RETORNA UM 500 (CONTROLLER)
    }



}

const listarFilmografia = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let result = await filmografiaDAO.selectAllFilmografia()

        if (result) {

            if (result.length > 0) {

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.filmografia = result

                return customMessage.DEFAULT_MESSAGE // RETORNA UM 200

            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL //RETORNA UM 500 (MODEL)
            }

        } else {
            return customMessage.ERROR_NOT_FOUND //RETORNA UM 404
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //RETONAR UM 500 (CONTROLLER)
    }

}

const buscarFilmografia = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || isNaN(id) || id <= 0) {
            customMessage.DEFAULT_MESSAGE.field = '[ID] INVÁLIDO'
            return customMessage.DEFAULT_MESSAGE
        } else {

            let result = await filmografiaDAO.selectByIdFilmografia(id)

            if (result) {

                if (result.length > 0) {

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filmografia = result

                    return customMessage.DEFAULT_MESSAGE //RETONA UM 200
                } else {
                    return customMessage.ERROR_NOT_FOUND //RETORNA UM 404
                }


            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL //RETORNA UM 500 (MODEL)
            }
        }

    } catch (error) {


        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //RETORNAR UM 500 (CONTROLLER)
    }

}

const excluirFilmografia = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let resultBuscarFilmografia = await buscarFilmografia(id)

        if (resultBuscarFilmografia.status) {

            let result = await filmografiaDAO.deleteFilmografia(id)

            if (result) {

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_DELETED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_DELETED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_DELETED_ITEM.message

                return customMessage.DEFAULT_MESSAGE // RETORNA UM 200

            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL //RETORNA UM 500 (MODEL)
            }

        } else {
            return resultBuscarPapel // RETORNA UM 404
        }


    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //RETORNA UM 500 (CONTROLLER)
    }


}

const validarDados = async function (dados) {
    // Fazendo um clone do meu JSON para poder modificar caso seja necessario.
    // Ele converte um objeto para string e depois transforma em um outro objeto.
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if (dados.filmografia == undefined || dados.filmografia == '' || dados.filmografia == null || dados.filmografia.length > 80) {
        customMessage.ERROR_BAD_REQUEST.field = '[PAPEL] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if(dados.capa == undefined || dados.capa == '' || dados.capa == null || dados.capa.length > 255) {
        customMessage.ERROR_BAD_REQUEST.field = '[PAPEL] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }else{
        return false
    }
}

const tratarDados = async function (dados) {

    dados.filmografia == dados.filmografia.replaceAll("'", "")
    dados.capa == dados.capa.replaceAll("'", "")

    return dados

}


module.exports = {
    inserirNovaFilmografia,
    listarFilmografia,
    buscarFilmografia,
    atualizarFilmografia,
    excluirFilmografia
}