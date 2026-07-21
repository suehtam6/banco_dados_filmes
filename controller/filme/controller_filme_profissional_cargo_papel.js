/*************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de filmeProfissional para realizar o CRUD de filme, profissional e cargo
 * Data: 2026-05-29
 * Autor: Matheus Lucas
 * Versão: 1.0
 **************************************************************************************************************************/

// Import do arquivo de configurações de mensagens do projeto.
const configMessages = require('../modulo/configMessages.js')

//Importando o arquivo do DAO para manipular os filmeProfissional no BD
const filmeProfissionalDAO = require('../../model/DAO/filme_profissional_cargo/filme_profissional_cargo_papel.js')

//Função para inserir um novo FilmeProfissional
const inserirNovoFilmeProfissional = async function (filmeProfissional) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let validar = await validarDados(filmeProfissional)

        if (validar) {
            return validar // RETORNA UM 400 (VALIDAR)
        } else {
            // inserindo o novo Profissional, e tratando o dado para chegar se tem aspas(')
            let result = await filmeProfissionalDAO.insertFilmeProfissional(filmeProfissional)
            if (result) {

                filmeProfissional.id = result
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATE_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATE_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATE_ITEM.message
                customMessage.DEFAULT_MESSAGE.response = filmeProfissional
                return customMessage.DEFAULT_MESSAGE // RETORNA UM 201

            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL //RETORNA UM 500 (MODEL)
            }
        }
    } catch (error) {

        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // RETORNA 500(CONTROLLER)
    }
}

//Função para atualizar um FilmeProfissional
const atualizarFilmeProfissional = async function (filmeProfissional, id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        //Enviando para a função buscarProfissional para saber se este id existe
        let resultBuscarFilmeProfissional = await buscarFilmeProfissional(id)

        //Verificando se o que esta retornando é um true
        if (resultBuscarFilmeProfissional.status) {

            if (resultBuscarFilmeProfissional) {
                //Validando os filmeProfissional
                let validar = await validarDados(filmeProfissional)

                if (!validar) {

                    filmeProfissional.id = Number(id)

                    //Enviando para o updateProfissional para atualizar o filme, se o que retornar for um true ele vai 
                    // Mostrar a mensagem de sucesso, caso contrario irá mostrar o que falhou
                    let result = await filmeProfissionalDAO.updateFilmeProfissional(filmeProfissional)
                    if (result) {
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = filmeProfissional
                        return customMessage.DEFAULT_MESSAGE //RETORNA 200
                    } else {
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL // RETORNA 500 (MODEL)
                    }
                } else { // fecha if !validar
                    return validar // RETORNA 400 DA VALIDAÇÃO
                }
            } // FECHA IF resultBuscarFilmeProfissional

        } else {
            return resultBuscarFilmeProfissional // RETORNA UM 400 E UM 404 do buscarProfissional
        } // FECHA IF resultBuscarFilmeProfissional.status

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // RETORNA UM 500 (CONTROLLER)
    }

}

//Função para listar os FilmeProfissional
const listarFilmeProfissional = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let result = await filmeProfissionalDAO.selectAllFilmeProfissional()
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

//Função para buscar um FilmeProfissional
const buscarFilmeProfissional = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST // RETORNA UM 400
        } else {

            let result = await filmeProfissionalDAO.selectByIdFilmeProfissional(id)
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


//Função para buscar um Profissional pelo ID do filme
const buscarProfissionalIdFilme = async function (idFilme) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idFilme == undefined || String(idFilme).replaceAll(' ', '') == '' || idFilme == null || isNaN(idFilme) || idFilme <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST // RETORNA UM 400
        } else {

            let result = await filmeProfissionalDAO.selectProfissionalsByIdFilme(idFilme)
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


//Função para buscar um filme pelo ID do profissional
const buscarFilmesIdProfissional = async function (idProfissional) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idProfissional == undefined || String(idProfissional).replaceAll(' ', '') == '' || idProfissional == null || isNaN(idProfissional) || idProfissional <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID_PROFISSIONAL] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST // RETORNA UM 400
        } else {

            let result = await filmeProfissionalDAO.selectFilmesByIdProfissional(idProfissional)
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


//Função para excluir um FilmeProfissional
const excluirFilmeProfissional = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarFilmeProfissional = await buscarFilmeProfissional(id)
        if (resultBuscarFilmeProfissional.status) {

            let result = await filmeProfissionalDAO.deleteFilmeProfissional(id)

            if (result) {

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_DELETED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_DELETED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_DELETED_ITEM.message

                return customMessage.DEFAULT_MESSAGE
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // RETORNA UM 500 (MODEL)
            }
        } else {
            return resultBuscarFilmeProfissional // RETORNA 400 E 404
        } // FECHA IF resultBuscarFilmeProfissional.status
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // RETORNA UM 500(CONTROLLER)
    }
}

//Função para excluir a relação de profissionais com o Filme
const excluirProfissionalIdFilme = async function (idFilme) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let result = await filmeProfissionalDAO.deleteProfissionalsByIdFilme(idFilme)
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

const validarDados = async function (filmeProfissional) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if (filmeProfissional.id_filme == undefined || String(filmeProfissional.id_filme).replaceAll(' ', '') == '' || filmeProfissional.id_filme == null || isNaN(filmeProfissional.id_filme) || filmeProfissional.id_filme <= 0) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID FILME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (filmeProfissional.id_profissional == undefined || String(filmeProfissional.id_profissional).replaceAll(' ', '') == '' || filmeProfissional.id_profissional == null || isNaN(filmeProfissional.id_profissional) || filmeProfissional.id_profissional <= 0) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID PROFISSIONAL] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (filmeProfissional.id_cargo == undefined || String(filmeProfissional.id_cargo).replaceAll(' ', '') == '' || filmeProfissional.id_cargo == null || isNaN(filmeProfissional.id_cargo) || filmeProfissional.id_cargo <= 0) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID CARGO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (filmeProfissional.id_papel == undefined || String(filmeProfissional.id_papel).replaceAll(' ', '') == '' || filmeProfissional.id_papel == null || isNaN(filmeProfissional.id_papel) || filmeProfissional.id_papel <= 0) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID PAPEL] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }else {
        return false
    }

}

module.exports = {
    inserirNovoFilmeProfissional,
    listarFilmeProfissional,
    atualizarFilmeProfissional,
    buscarFilmeProfissional,
    buscarProfissionalIdFilme,
    buscarFilmesIdProfissional,
    excluirFilmeProfissional,
    excluirProfissionalIdFilme
}