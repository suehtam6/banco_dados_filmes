/***************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de profissionalNacionalidade para realizar o CRUD do profissional com a nacionalidade
 * Data: 2026-05-22
 * Autor: Matheus Lucas
 * Versão: 1.0
 ****************************************************************************************************************************************************/

// Import do arquivo de configurações de mensagens do projeto.
const configMessages = require('../modulo/configMessages.js')

//Importando o arquivo do DAO para manipular os profissionalNacionalidade no BD
const profissionalNacionalidadeDAO = require('../../model/DAO/profissional_nacionalidade/profissional_nacionalidade.js')

//Função para inserir um novo profissionalNacionalidade
const inserirNovoProfissionalNacionalidade = async function (profissionalNacionalidade) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let validar = await validarDados(profissionalNacionalidade)

        if (validar) {
            return validar // RETORNA UM 400 (VALIDAR)
        } else {
            // inserindo o novo genero, e tratando o dado para chegar se tem aspas(')
            let result = await profissionalNacionalidadeDAO.insertProfissionalNacionalidade(profissionalNacionalidade)
            if (result) {

                profissionalNacionalidade.id = result
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATE_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATE_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATE_ITEM.message
                customMessage.DEFAULT_MESSAGE.response = profissionalNacionalidade
                return customMessage.DEFAULT_MESSAGE // RETORNA UM 201

            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL //RETORNA UM 500 (MODEL)
            }
        }
    } catch (error) {

        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // RETORNA 500(CONTROLLER)
    }
}

//Função para atualizar um profissionalNacionalidade
const atualizarprofissionalNacionalidade = async function (profissionalNacionalidade, id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        //Enviando para a função buscarGenero para saber se este id existe
        let resultBuscarprofissionalNacionalidade = await buscarprofissionalNacionalidade(id)

        //Verificando se o que esta retornando é um true
        if (resultBuscarprofissionalNacionalidade.status) {

            if (resultBuscarprofissionalNacionalidade) {
                //Validando os profissionalNacionalidade
                let validar = await validarDados(profissionalNacionalidade)

                if (!validar) {

                    profissionalNacionalidade.id = Number(id)

                    //Enviando para o updateGenero para atualizar o filme, se o que retornar for um true ele vai 
                    // Mostrar a mensagem de sucesso, caso contrario irá mostrar o que falhou
                    let result = await profissionalNacionalidadeDAO.updateprofissionalNacionalidade(profissionalNacionalidade)
                    if (result) {
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = profissionalNacionalidade
                        return customMessage.DEFAULT_MESSAGE //RETORNA 200
                    } else {
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL // RETORNA 500 (MODEL)
                    }
                } // FECHA IF RESULT
            } // FECHA IF resultBuscarprofissionalNacionalidade

        } else {
            return resultBuscarprofissionalNacionalidade // RETORNA UM 400 E UM 404 do buscarGenero
        } // FECHA IF resultBuscarprofissionalNacionalidade.status

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // RETORNA UM 500 (CONTROLLER)
    }

}

//Função para listar os profissionalNacionalidade
const listarprofissionalNacionalidade = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let result = await profissionalNacionalidadeDAO.selectAllProfissionalNacionalidade()
        // Verificando se o conteúdo executou o script
        if (result) {
            // Verificando se o conteúdo está vazio
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code // RETORNA UM 200
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.profissional = result

                return customMessage.DEFAULT_MESSAGE // RETORNA UM 200
            } else {
                return customMessage.ERROR_NOT_FOUND // RETORNA UM 404
            }

        } else {
            return customMessage.ERROR_INTERNAL_SERVER_MODEL // RETORNA UM 500 (MODEL)
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // RETORNA UM 500(CONTROLLER)
    }
}

//Função para buscar um profissionalNacionalidade
const buscarprofissionalNacionalidade = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST // RETORNA UM 400
        } else {

            let result = await profissionalNacionalidadeDAO.selectByIdProfissionalNacionalidade(id)
            if (result) {

                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.profissional_nacionalidade = result

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


//Função para buscar um Genero pelo ID do filme
const buscarNacionalidadeIDProfissional = async function (idProfissional) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idProfissional == undefined || String(idProfissional).replaceAll(' ', '') == '' || idProfissional == null || isNaN(idProfissional) || idProfissional <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID_profissional] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST // RETORNA UM 400
        } else {

            let result = await profissionalNacionalidadeDAO.selectNacionalidadeByIdProfissional(idProfissional)
            if (result) {

                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.profissional_nacionalidade = result

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
const buscarFilmesidNacionalidade = async function (idNacionalidade) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idNacionalidade == undefined || String(idNacionalidade).replaceAll(' ', '') == '' || idNacionalidade == null || isNaN(idNacionalidade) || idNacionalidade <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID_NACIONALIDADE] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST // RETORNA UM 400
        } else {

            let result = await profissionalNacionalidadeDAO.selectProfissionalByIdNacionalidade(idNacionalidade)
            if (result) {

                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.profissional_nacionalidade = result

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


//Função para excluir um profissionalNacionalidade
const excluirprofissionalNacionalidade = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarprofissionalNacionalidade = await buscarprofissionalNacionalidade(id)
        if (resultBuscarprofissionalNacionalidade.status) {

            let result = await profissionalNacionalidadeDAO.deleteProfissionalNacionalidade(id)

            if (result) {

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_DELETED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_DELETED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_DELETED_ITEM.message

                return customMessage.DEFAULT_MESSAGE
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // RETORNA UM 500 (MODEL)
            }
        } else {
            return resultBuscarprofissionalNacionalidade // RETORNA 400 E 404
        } // FECHA IF resultBuscarprofissionalNacionalidade.status
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // RETORNA UM 500(CONTROLLER)
    }
}

//Função para excluir a relação de gêneros com o Filme
const excluirGenerosidProfissional = async function (idProfissional) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let result = await profissionalNacionalidadeDAO.deleteNacionalidadeByidProfissional(idProfissional)
        if (result) {

            customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_DELETED_ITEM.status
            customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_DELETED_ITEM.status_code
            customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_DELETED_ITEM.message

            return customMessage.DEFAULT_MESSAGE // RETORNA UM 200
            
        } else {
            return customMessage.ERROR_INTERNAL_SERVER_MODEL // RETORNA UM 500 (MODEL)
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // RETORNA UM 500(CONTROLLER)
    }
}

const validarDados = async function (profissionalNacionalidade) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    if (profissionalNacionalidade.id_profissional == undefined || String(profissionalNacionalidade.id_profissional).replaceAll(' ', '') == '' || profissionalNacionalidade.id_profissional == null || isNaN(profissionalNacionalidade.id_profissional) || profissionalNacionalidade.id_profissional <= 0) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID PROFISSIONAL] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (profissionalNacionalidade.id_nacionalidade == undefined || String(profissionalNacionalidade.id_nacionalidade).replaceAll(' ', '') == '' || profissionalNacionalidade.id_nacionalidade == null || isNaN(profissionalNacionalidade.id_nacionalidade) || profissionalNacionalidade.id_nacionalidade <= 0) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID NACIONALIDADE] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else {
        return false
    }

}

module.exports = {
    inserirNovoProfissionalNacionalidade,
    listarprofissionalNacionalidade,
    atualizarprofissionalNacionalidade,
    buscarprofissionalNacionalidade,
    buscarNacionalidadeIDProfissional,
    buscarFilmesidNacionalidade,
    excluirprofissionalNacionalidade,
    excluirGenerosidProfissional
}