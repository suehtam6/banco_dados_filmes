/************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD da nascionalidade
 * Data: 2026-05-14
 * Autor: Matheus Lucas
 * Versão: 1.0
 *************************************************************************************************************************/

// Import do arquivo de configurações de mensagens do projeto.
const configMessages = require('../modulo/configMessages.js')

// Import do arquivo para verificar se o script rodou dentro do banco.
const nascionalidadeDAO = require('../../model/DAO/nacionalidade/nacionalidade.js')


const inserirNovoNacionalidade = async function (dados, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDados(dados)
            if (!validar) {
                let result = await nascionalidadeDAO.insertNascionalidade(await tratarDados(dados))

                if (result) {

                    dados.id = result
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATE_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATE_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATE_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = dados

                    return customMessage.DEFAULT_MESSAGE // RETORNA UM 200

                } else {
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL // RETORNA UM 500 (MODEL)
                }


            } else {
                return validar // RETORNA UM 400 
            }

        } else {
            return customMessage.ERROR_CONTENT_TYPE // RETORNA UM 415
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // RETORNA UM 500 (Controller)
    }
}

const atualizarNacionalidade = async function (dados, id, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let resultBuscarNascionalidade = await buscarNascionalidade(id)
            if (resultBuscarNascionalidade.status) {

                if (resultBuscarNascionalidade) {

                    let validar = await validarDados(dados)

                    if (!validar) {

                        dados.id = Number(id)
                        let result = await nascionalidadeDAO.updateNascionalidade(dados)

                        if (result) {

                            customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                            customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                            customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                            customMessage.DEFAULT_MESSAGE.response = dados

                            return customMessage.DEFAULT_MESSAGE // RETORNA UM 200

                        } else {
                            return customMessage.ERROR_INTERNAL_SERVER_MODEL // RETORNA UM 500 (MODEL)
                        }

                    } else {
                        return validar

                    }

                } else {
                    return customMessage.ERROR_BAD_REQUEST // RETORNA 400
                }

            } else {
                return resultBuscarNascionalidade
            }

        } else {
            return customMessage.ERROR_CONTENT_TYPE // RETORNA UM 415
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // RETORNA UM 500 (CONTROLLER)
    }
}

const listarNacionalidade = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await nascionalidadeDAO.selectAllNascionalidade()

        if (result) {
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.nascionalidade = result

                return customMessage.DEFAULT_MESSAGE // RETORNA UM 200

            } else {
                return customMessage.ERROR_NOT_FOUND // RETORNA UM 404
            }
        } else {
            return customMessage.ERROR_INTERNAL_SERVER_MODEL // RETORNA UM 500 (MODEL)
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // RETORNA UM 500 (CONTROLLER)
    }
}

const buscarNacionalidade = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        //Validando o id
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await nascionalidadeDAO.selectByIdNascionalidade(id)

            if (result) {

                //Validando para saber se tem itens cadastrados dentro do result
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.nascionalidade = result

                    return customMessage.DEFAULT_MESSAGE // RETORNA UM 200

                } else {
                    return customMessage.ERROR_NOT_FOUND // RETORNA UM 404
                }


            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // RETORNA UM 500 (MODEL)
            } // fecha result

        } // fecha id

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // RETORNA UM 500 (CONTROLLER)
    }

}

const excluirNacionalidade = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarNascionalidade = await buscarNascionalidade(id)

        if (resultBuscarNascionalidade.status) {
            let result = await nascionalidadeDAO.deleteNascionalidade(id)

            if (result) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_DELETED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_DELETED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_DELETED_ITEM.message

                return customMessage.DEFAULT_MESSAGE // RETORNA UM 200

            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL  // RETORNA UM 500 (CONTROLLER)
            }

        } else {
            return resultBuscarNascionalidade // RETORNA UM 400
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // RETORNA UM 500 (CONTROLLER)
    }
}

const validarDados = async function (dados) {
    // Fazendo um clone do meu JSON para poder modificar caso seja necessario.
    // Ele converte um objeto para string e depois transforma em um outro objeto.
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if (dados.nascionalidade == undefined || dados.nascionalidade == '' || dados.nascionalidade == null || dados.nascionalidade.length > 30) {
        customMessage.ERROR_BAD_REQUEST.field = '[NASCIONALIDADE] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST
    } else {
        return false
    }
}

const tratarDados = async function (dados) {

    dados.nascionalidade == dados.nascionalidade.replaceAll("'", "")

    return dados

}



module.exports = {
    inserirNovoNacionalidade,
    atualizarNacionalidade,
    listarNacionalidade,
    buscarNacionalidade,
    excluirNacionalidade
}