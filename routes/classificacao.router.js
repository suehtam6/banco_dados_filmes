/***********************************************************************************************
 * Objetivo: Guardar todas as rotas dos endpoints sobre a classificação
 * Autor: Matheus Lucas
 * Data: 2026-07-19
***********************************************************************************************/

//Import do express, body-parser
const express = require('express')
const bodyParser = require('body-parser')

// Permitindo a utilização do JSON no body das requisições.
const bodyParserJSON = bodyParser.json()

//Criando um objeto de rota para os Endpoints de Genero
const router = express.Router()

//Import da controller
const controllerClassificacao = require('../controller/classificacao/controllerClassificacao.js')

// endpoint para o CRUD do filme
router.post('/',bodyParserJSON, async function(request, response){
    // Recebendo o body da requisição
     let  dados = request.body
 
 
     // Recebendo o tipo de dados da requisição para validar se é JSON.
     let contentType = request.headers['content-type']
 
     let result = await controllerClassificacao.inserirNovaClassificacao(dados, contentType)
     response.status(result.status_code)
     response.json(result)
 })
 
 // endpoint para pegar todos os filmes
router.get('/', async function(request, response){
     let result = await controllerClassificacao.listarClassificacao()
 
     response.status(result.status_code)
     response.json(result)
 })
 
 // endpoint para pegar um filme pelo id
router.get('/:id', async function(request, response) {
     let id = request.params.id
 
     let result = await controllerClassificacao.buscarClassificacao(id)
 
     response.status(result.status_code)
     response.json(result)
 })
 
 // endpoint para atualizar um filme
router.put('/:id', bodyParserJSON, async function(request, response) {
 
     // Recebe o id do registro a ser atualizado.
     let id = request.params.id
 
     // Recebe os dados do body que serão modificados no banco de dados.
     let dados = request.body
 
     // Recebe o content-type da requisição para validar se é JSON.
     let contentType = request.headers['content-type']
     
     // Chama a função para atualizar o filme.
     let result = await controllerClassificacao.atualizarClassificacao(dados, id, contentType)
 
     response.status(result.status_code)
     response.json(result)
 })
 
router.delete('/:id', async function (request, response){
     let id = request.params.id
 
     let result = await controllerClassificacao.excluirClassificacao(id)
 
     response.status(result.status_code)
     response.json(result)
 })

//Export do objeto de rotas do gênero
module.exports = router