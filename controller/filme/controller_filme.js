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

                let tratarFilme = await tratarDados(await tratarDados(filme))
                // Encaminha os dados fo Filme para o DAO inserir no banco de dados.
                let result = await filmeDAO.insertFilme(tratarFilme)
                if (result) { // RETORNA UM 201

                    // Cria o ID do JSON do filme e adiciona o ID gerado no DAO
                    filme.id = result
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATE_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATE_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATE_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = filme
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
const atualizarFilme = async function (filme, id, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        // Validando o content type, para saber se é um JSON que está sendo enviado.
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            //Chama a função para buscar o filme e validar se o id está correto
            // Se o ID existe no Banco de Dados e se o filme existe.
            let resultBuscarFilme = await buscarFilme(id)
            if (resultBuscarFilme.status) {
                
                // Validando se JSON está chegando corretamente.
                if (resultBuscarFilme) {

                    // Chama a função para validar os dados dos Filmes para ver se estão corretos
                    let validar = await validarDados(filme)
                    if (!validar) {

                        // Adiciona um atributo id no JSON de filme, para enviar para o DAO um único objeto, 
                        // ja que o body iria mandar os dois de formas separados para o DAO.
                        filme.id = Number(id)

                        // Chama a função para atualizar o filme no banco de dados.
                        let result = await filmeDAO.updateFilme(await tratarDados(filme))
                        if (result) {

                            customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                            customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                            customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                            customMessage.DEFAULT_MESSAGE.response = filme
                            return customMessage.DEFAULT_MESSAGE //RETORNA 200

                        } else {
                            return customMessage.ERROR_INTERNAL_SERVER_MODEL // RETORNA 500 (MODEL)
                        }


                    } else { // fecha if sobre a validação
                        return validar // RETORNA 400 DA VALIDAÇÃO DOS CAMPOS DO BANCO DE DADOS!
                    }

                } else { // fecha if sobre o buscarFilme(campos obrigatórios)
                    return customMessage.ERROR_BAD_REQUEST // RETORNA 400
                }


            } else { //fecha if o buscarFilme(id)
                return resultBuscarFilme // RETORNA 400(ID INVÁLIDO) ou 404(NÃO ENCONTRADO) ou 500(MODEL OU CONTROLLER)
            }


        } else { // Fecha if content_type
            return customMessage.ERROR_CONTENT_TYPE // RETORNA 415 
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // RETORNA 500 (CONTROLLER) 
    }


}

// Função para retornar todos os filmes existentes.
const listarFilme = async function () {

    let customMessage = JSON.parse(JSON.stringify(configMessages))


    try {
        // Solicitando a função do selectALLFilme que está dentro do DAO.
        let result = await filmeDAO.selectAllFilme()

        // Validação para verificar se o DAO conseguiu processar o script no BD.
        if (result) {

            // Validação para verificar se o conteúdo do ARRAY tem dados de retorno ou se está vazio
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code // RETORNA UM 200
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.filme = result

                return customMessage.DEFAULT_MESSAGE
            } else {
                return customMessage.ERROR_NOT_FOUND // RETORNA UM 404
            }// fecha  if sobre o conteúdo.

        } else {
            return customMessage.ERROR_INTERNAL_SERVER_MODEL // RETORNA UM 500
        } // fecha if sobre se o DAO conseguiu processar o script.

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // RETORNA UM 500
    } // fecha o try
}

// Função para buscar um filme filtrando pelo id.
const buscarFilme = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        // validação para garantir que o ID seja um argumento valido
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0) {

            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST // RETORNA UM 400

        } else {

            // Pesquisando o filme pelo id
            let result = await filmeDAO.selectByIdFilme(id)

            // Validação para saber se tem algum erro na MODEL
            if (result) {

                // Validação para saber se o result tem o item pedido cadastrado.
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme = result

                    return customMessage.DEFAULT_MESSAGE // RETORNA UM 200

                } else {
                    return customMessage.ERROR_NOT_FOUND // RETORNA UM 404
                } // fecha if sobre se o item retornou

            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // RETORNA UM 500(MODEL)
            } // fecha validação

        } // fecha validação id

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // RETORNA UM 500(CONTROLLER)
    }
}

// Função para excluir um filme.
const excluirFilme = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        // Verificando se existe esse ID no buscarFilme
        let resultBuscarFilme = await buscarFilme(id)
        if (resultBuscarFilme.status) {
                let result = await filmeDAO.deleteFilme(id)
                
                if (result) {
                    
                    customMessage.DEFAULT_MESSAGE.status        = customMessage.SUCCESS_DELETED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code   = customMessage.SUCCESS_DELETED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message       = customMessage.SUCCESS_DELETED_ITEM.message
                    
                    return customMessage.DEFAULT_MESSAGE // RETORNA UM 200

                } else {
                    
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL // RETORNA UM 500(MODEL)
                }


        } else {
            return resultBuscarFilme // RETORNA 400 ou 404 (buscarFilme)
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // RETORNA 500(CONTROLLER)
    }

}



// Função para validar dados.
const validarDados = async function (filme) {

    // Fazendo um clone do meu JSON para poder modificar caso seja necessario.
    // Ele converte um objeto para string e depois transforma em um outro objeto.
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if (filme.nome == undefined || filme.nome == '' || filme.nome == null || filme.nome.length > 80) {
        customMessage.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (filme.sinopse == undefined || filme.sinopse == '' || filme.sinopse == null) {
        customMessage.ERROR_BAD_REQUEST.field = '[SINÓPSE] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (filme.capa == undefined || filme.capa == '' || filme.capa == null || filme.capa.length > 255) {
        customMessage.ERROR_BAD_REQUEST.field = '[CAPA] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (filme.data_lancamento == undefined || filme.data_lancamento == '' || filme.data_lancamento == null || filme.data_lancamento.length != 10) {
        customMessage.ERROR_BAD_REQUEST.field = '[DATA DE LANÇAMENTO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (filme.duracao == undefined || filme.duracao == '' || filme.duracao == null || filme.duracao.length < 5) {
        customMessage.ERROR_BAD_REQUEST.field = '[DURAÇÃO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (filme.valor == undefined || isNaN(filme.valor) || filme.valor.length > 5) {
        customMessage.ERROR_BAD_REQUEST.field = '[VALOR] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (filme.avaliacao == undefined || isNaN(filme.avaliacao) || filme.avaliacao.length > 3 || filme.avaliacao > 5) {
        customMessage.ERROR_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else {
        

        return false
    }

}

const tratarDados = async function(filme) {
    //tratamento para evitar a chegada das aspas(') como caracter inválido
    filme.nome              = filme.nome.replaceAll("'", "")
    filme.sinopse           = filme.sinopse.replaceAll("'", "")
    filme.capa              = filme.capa.replaceAll("'", "")
    filme.data_lancamento   = filme.data_lancamento.replaceAll("'", "")
    filme.duracao           = filme.duracao.replaceAll("'", "")
    filme.valor             = filme.valor.replaceAll("'", "")
    filme.avaliacao         = filme.avaliacao.replaceAll("'", "")

    return filme
}

module.exports = {
    inserirNovoFilme,
    atualizarFilme,
    listarFilme,
    buscarFilme,
    excluirFilme
}