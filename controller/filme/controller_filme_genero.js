/*************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de filmeGenero para realizar o CRUD de filme e gênero
 * Data: 2026-05-22
 * Autor: Matheus Lucas
 * Versão: 1.0
 **************************************************************************************************************************/

// Import do arquivo de configurações de mensagens do projeto.
const configMessages = require('../modulo/configMessages.js')

//Importando o arquivo do DAO para manipular os filmeGenero no BD
const filmeGeneroDAO = require('../../model/DAO/filme_genero/filme_genero.js')

//Função para inserir um novo FilmeGenero
const inserirNovoFilmeGenero = async function (filmeGenero) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let validar = await validarDados(filmeGenero)

        if (validar) {
            return validar // RETORNA UM 400 (VALIDAR)
        } else {
            // inserindo o novo genero, e tratando o dado para chegar se tem aspas(')
            let result = await filmeGeneroDAO.insertFilmeGenero(filmeGenero)
            if (result) {
                filmeGenero.id = result
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATE_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATE_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATE_ITEM.message
                customMessage.DEFAULT_MESSAGE.response = filmeGenero
                return customMessage.DEFAULT_MESSAGE // RETORNA UM 201
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL //RETORNA UM 500 (MODEL)
            }
        }
    } catch (error) {

        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // RETORNA 500(CONTROLLER)
    }
}

//Função para atualizar um FilmeGenero
const atualizarFilmeGenero = async function (filmeGenero, id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        //Enviando para a função buscarGenero para saber se este id existe
        let resultBuscarFilmeGenero = await buscarFilmeGenero(id)

        //Verificando se o que esta retornando é um true
        if (resultBuscarFilmeGenero.status) {

            if (resultBuscarFilmeGenero) {
                //Validando os filmeGenero
                let validar = await validarDados(filmeGenero)

                if (!validar) {

                    filmeGenero.id = Number(id)

                    //Enviando para o updateGenero para atualizar o filme, se o que retornar for um true ele vai 
                    // Mostrar a mensagem de sucesso, caso contrario irá mostrar o que falhou
                    let result = await filmeGeneroDAO.updateFilmeGenero(filmeGenero)
                    if (result) {
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = filmeGenero
                        return customMessage.DEFAULT_MESSAGE //RETORNA 200
                    } else {
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL // RETORNA 500 (MODEL)
                    }
                } // FECHA IF RESULT
            } // FECHA IF resultBuscarFilmeGenero

        } else {
            return resultBuscarFilmeGenero // RETORNA UM 400 E UM 404 do buscarGenero
        } // FECHA IF resultBuscarFilmeGenero.status

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // RETORNA UM 500 (CONTROLLER)
    }

}

//Função para listar os FilmeGenero
const listarFilmeGenero = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let result = await filmeGeneroDAO.selectAllFilmeGenero()
        // Verificando se o conteúdo executou o script
        if (result) {
            // Verificando se o conteúdo está vazio
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code // RETORNA UM 200
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.filme = result

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

//Função para buscar um FilmeGenero
const buscarFilmeGenero = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST // RETORNA UM 400
        } else {

            let result = await filmeGeneroDAO.selectByIdFilmeGenero(id)
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


//Função para buscar um Genero pelo ID do filme
const buscarGeneroIdFilme = async function (idFilme) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idFilme == undefined || String(idFilme).replaceAll(' ', '') == '' || idFilme == null || isNaN(idFilme) || idFilme <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST // RETORNA UM 400
        } else {

            let result = await filmeGeneroDAO.selectGenerosByIdFilme(idFilme)
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
const buscarFilmesIdGenero = async function (idGenero) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idGenero == undefined || String(idGenero).replaceAll(' ', '') == '' || idGenero == null || isNaN(idGenero) || idGenero <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID_GENERO] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST // RETORNA UM 400
        } else {

            let result = await filmeGeneroDAO.selectFilmesByIdGenero(idGenero)
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


//Função para excluir um FilmeGenero
const excluirFilmeGenero = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarFilmeGenero = await buscarFilmeGenero(id)
        if (resultBuscarFilmeGenero.status) {

            let result = await filmeGeneroDAO.deleteFilmeGenero(id)

            if (result) {

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_DELETED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_DELETED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_DELETED_ITEM.message

                return customMessage.DEFAULT_MESSAGE
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // RETORNA UM 500 (MODEL)
            }
        } else {
            return resultBuscarFilmeGenero // RETORNA 400 E 404
        } // FECHA IF resultBuscarFilmeGenero.status
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // RETORNA UM 500(CONTROLLER)
    }
}

//Função para excluir a relação de gêneros com o Filme
const excluirGenerosIdFilme = async function (idFilme) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let result = await filmeGeneroDAO.deleteGenerosByIdFilme(idFilme)
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

const validarDados = async function (filmeGenero) {
    if (filmeGenero.id_filme == undefined || String(filmeGenero.id_filme).replaceAll(' ', '') == '' || filmeGenero.id_filme == null || isNaN(filmeGenero.id_filme) || filmeGenero.id_filme <= 0) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID FILME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (filmeGenero.id_genero == undefined || String(filmeGenero.id_genero).replaceAll(' ', '') == '' || filmeGenero.id_genero == null || isNaN(filmeGenero.id_genero) || filmeGenero.id_genero <= 0) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID GÊNERO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else {
        return false
    }

}

module.exports = {
    inserirNovoFilmeGenero,
    listarFilmeGenero,
    atualizarFilmeGenero,
    buscarFilmeGenero,
    buscarGeneroIdFilme,
    buscarFilmesIdGenero,
    excluirFilmeGenero,
    excluirGenerosIdFilme
}