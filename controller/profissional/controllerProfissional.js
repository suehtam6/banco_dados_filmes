/**********************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD do Profissional
 * Data: 2026-04-17
 * Autor: Matheus Lucas
 * Versão: 1.0
 **********************************************************************************************************************/

// Import do arquivo de configurações de mensagens do projeto.
const configMessages = require('../modulo/configMessages.js')

// Import do arquido DAO para manipular os dados do profissional no Banco de Dados.
const profissionalDAO = require('../../model/DAO/profissional/profissional.js')
const controllerProfissionalCargoDAO = require('./controllerProfissionalCargo.js')

const inserirNovoProfissional = async function (dados, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDados(dados)

            if (!validar) {
                
                let result = await profissionalDAO.insertProfissional(await tratarDados(dados))
                
                if (result) {

                    dados.id = result

                    // Manipulação de dados para inserir os gêneros relacionados ao filme.
                    //Percorre o ARRAY de gêneros que chegará na requisição pelo objeto Filme
                    for (itemCargo of dados.cargo) {


                        let profissionalCargo = {
                            "id_profissional": dados.id,
                            "id_cargo": itemCargo.id
                        }


                        let resultProfissionalCargo = await controllerProfissionalCargoDAO.inserirNovoProfissionalCargo(profissionalCargo)
                        console.log(resultProfissionalCargo)
                        // Validação para verificar se todos os itens de relacionamento foram inseridos!!
                        if (!resultProfissionalCargo.status) {
                            return customMessage.SUCCESS_CREATE_ITEM_WARNING //201 com alerta de cadastro
                        }
                    }


                    
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATE_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATE_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATE_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = dados

                    return customMessage.DEFAULT_MESSAGE
                } else {
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL // RETORNA UM 500 (MODEL)
                }
            } else {
                return validar //RETORNA 400
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE // RETORNA UM 415
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // RETORNA UM 500 (CONTROLLER)
    }

}

const atualizarProfissional = async function (dados, id, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let resultBuscarProfissional = await buscarProfissional(id)

            //Verificando o status do buscarProfissional
            if (resultBuscarProfissional.status) {
                if (resultBuscarProfissional) {


                    let validar = await validarDados(dados)
                    if (!validar) {

                        dados.id = Number(id)
                        let result = await profissionalDAO.updateProfissional(await tratarDados(dados))

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
                        return validar // RETORNA UM 400
                    }
                } else {
                    return customMessage.ERROR_NOT_FOUND // RETORNA UM 404
                }


            } else {
                return resultBuscarProfissional // RETORNA UM 400 ou 404
            }


        } else {
            return customMessage.ERROR_CONTENT_TYPE // RETORNA UM 415
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // RETORNA UM 500 (CONTROLLER)
    }

}

const listarProfissional = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await profissionalDAO.selectAllProfissional()
        if (result) {

            if (result.length > 0) {

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code // RETORNA UM 200
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.profissional = result

                return customMessage.DEFAULT_MESSAGE

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

const buscarProfissional = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST // RETORNA UM 400
        } else {
            let result = await profissionalDAO.selectByIdProfissional(id)

            //Verificando se está tudo correto
            if (result) {

                //Verificando se está vazio
                if (result.length > 0) {

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.profissional = result

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

const excluirProfissional = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarProfissional = await buscarProfissional(id)

        // Verificando se o retorna é verdadeiro(true)
        if (resultBuscarProfissional.status) {
            let result = await profissionalDAO.deleteProfissional(id)

            if (result) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_DELETED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_DELETED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_DELETED_ITEM.message

                return customMessage.DEFAULT_MESSAGE // RETORNA UM 200 PARA ENVIAR UMA MENSAGEM DE OK!!
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // RETORNA UM 500 (MODEL)
            }


        } else {
            return resultBuscarProfissional // Retorna um 404
        }


    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // RETORNA UM 500 (CONTROLLER)
    }


}


// Função para validar dados.
const validarDados = async function (dados) {

    // Fazendo um clone do meu JSON para poder modificar caso seja necessario.
    // Ele converte um objeto para string e depois transforma em um outro objeto.
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if (dados.nome == undefined || dados.nome == '' || dados.nome == null || dados.nome.length > 80) {
        customMessage.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (dados.data_nascimento == undefined || dados.data_nascimento == '' || dados.data_nascimento == null || dados.data_nascimento.length != 10) {
        customMessage.ERROR_BAD_REQUEST.field = '[DATA NASCIMENTO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (dados.foto == undefined || dados.foto == '' || dados.foto == null || dados.foto.length > 255) {
        customMessage.ERROR_BAD_REQUEST.field = '[FOTO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (dados.biografia == undefined || dados.biografia == null || dados.biografia.length > 255) {
        customMessage.ERROR_BAD_REQUEST.field = '[BIOGRAFIA] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else {
        return false
    }

}


const tratarDados = async function (dados) {

    //Trantando entrade de aspas (') dentro do projeto
    dados.nome = dados.nome.replaceAll("'", "")
    dados.data_nascimento = dados.data_nascimento.replaceAll("'", "")
    dados.foto = dados.foto.replaceAll("'", "")
    dados.biografia = dados.biografia.replaceAll("'", "")

    return dados

}

module.exports = {
    inserirNovoProfissional,
    atualizarProfissional,
    listarProfissional,
    buscarProfissional,
    excluirProfissional
}