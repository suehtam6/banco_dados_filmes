/***********************************************************************************************
 * Objetivo: Guardar todas as rotas dos endpoints sobre o gênero
 * Autor: Matheus Lucas
 * Data: 2060-06-10
***********************************************************************************************/

//Import do express, body-parser
const express = require('express')
const bodyParser = require('body-parser')

// Permitindo a utilização do JSON no body das requisições.
const bodyParserJSON = bodyParser.json()

//Criando um objeto de rota para os Endpoints de Genero
const router = express.Router()

//Import da controller
const controllerGenero = require('../controller/genero/controller_genero.js')


// ENDPOINTS SOBRE O GÊNERO

// endpoint para o CRUD do gênero
router.post('/',bodyParserJSON, async function(request, response){
    // Recebendo o body da requisição
     let  dados = request.body
 
 
     // Recebendo o tipo de dados da requisição para validar se é JSON.
     let contentType = request.headers['content-type']
 
     let result = await controllerGenero.inserirNovoGenero(dados, contentType)
 
     response.status(result.status_code)
     response.json(result)
 })

 // endpoint para listar os gêneros
 router.get('/', async function(request, response) {
    let result = await controllerGenero.listarGenero()

    response.status(result.status_code)
    response.json(result)
 })

 // endpoint para pegar um gênero pelo id
router.get('/:id', async function(request, response) {
    let id = request.params.id

    let result = await controllerGenero.buscarGenero(id)

    response.status(result.status_code)
    response.json(result)
})

// endpoint para atualizar um gênero
router.put('/:id', bodyParserJSON, async function(request, response) {

    // Recebe o id do registro a ser atualizado.
    let id = request.params.id

    // Recebe os dados do body que serão modificados no banco de dados.
    let dados = request.body

    // Recebe o content-type da requisição para validar se é JSON.
    let contentType = request.headers['content-type']
    
    // Chama a função para atualizar o filme.
    let result = await controllerGenero.atualizarGenero(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

// endpoint para deletar gênero pelo id
router.delete('/:id', async function(request, response) {
    let id = request.params.id

    let result = await controllerGenero.excluirGenero(id)
    response.status(result.status_code)
    response.json(result)
})

//Export do objeto de rotas do gênero
module.exports = router