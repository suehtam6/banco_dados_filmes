/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela padronização das mensagens e status code do projeto de filmes.
 * Data: 2026-04-17
 * Autor: Matheus Lucas
 * Versão: 1.0
 ********************************************************************************************************/


// Função para padronizar as messagens da API.
const DEFAULT_MESSAGE = {
    api_description: 'API para controlar projetos de Filmes',
    development: 'Matheus Lucas de Freitas Zacarias',
    version: '1.0.4.26',
    status: Boolean,
    status_code: Number,
    response: {}
}

// Funções para retornar as mensagens de ERRO da API
const ERROR_BAD_REQUEST             = {status: false, status_code: 400, message: 'Não foi possível processar a requisição devido a erros de entrada de dados.'}

const ERROR_CONTENT_TYPE            = {status: false, status_code: 415, message: 'Não foi possível processar a requisição pois o formado de dados encaminhado não é suportado pelo servidor, apenas deve ser utilizado JSON!'}

const ERROR_INTERNAL_SERVER_MODEL   = {status: false, status_code: 500, message: 'Não foi possível processar a requisição devido a um erro interno no servidor [MODEL]'}

const ERROR_INTERNAL_SERVER_CONTROLLER  = {status: false, status_code: 500, message: 'Não foi possível processar a requisição devido a um erro interno no servidor [CONTROLLER]'}

// Funções para retornar as mensagens de SUCESSO da API
const SUCCESS_CREATE_ITEM = {status: true, status_code: 201, message: 'Item inserido com sucesso!'}





module.exports = {
    DEFAULT_MESSAGE,
    ERROR_BAD_REQUEST,
    ERROR_CONTENT_TYPE,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    SUCCESS_CREATE_ITEM,
}