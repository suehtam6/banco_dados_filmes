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

// Função para mostrar mensagens de ERRO do projeto filmes.
const ERROR_BAD_REQUEST = {status: false, status_code: 400, message: 'Não foi possível processar a requisição devido a erros de entrada de dados.'}

// Função para mostrar mensagens de SUCESSO do projeto filmes
const SUCCESS_CREATE_ITEM = {status: true, status_code: 201, message: 'Item inserido com sucesso!'}

// Função para mostrar mensagens de ERRO INTERNO DO SERVER MODEL do projeto filmes.
const ERROR_INTERNAL_SERVER_MODEL = {status: false, status_code: 500, message: 'Não foi possível processar a requisição devido a um erro interno no servidor [MODEL]'}




module.exports = {
    DEFAULT_MESSAGE,
    ERROR_BAD_REQUEST,
    SUCCESS_CREATE_ITEM,
    ERROR_INTERNAL_SERVER_MODEL,
}