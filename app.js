/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela criação do bando de dados sobre filmes
 * Data: 2026-04-17
 * Autor: Matheus Lucas
 * Versão: 1.0
 ********************************************************************************************************/

// Import das dependencias para criar a API
const express       = require('express')
const cors          = require('cors')
const bodyParser    = require('body-parser')

// Import das controllers do projeto
const controllerFilme = require('./controller/filme/controller_filme.js')


// Permitindo a utilização do JSON no body das requisições.
const bodyParserJSON = bodyParser.json()


// Criando um objeto do express para criar a API
const app = express()

// Configurações do CORS da API
const corsOptions = {
    origin: ['*'], //Configuração de origem da requisição(IP ou Dominio).
    methods: 'GET, POST, PUT, DELETE, OPTIONS', //Configuração dos verbos que serão utilizados na API.
    allowedHeaders: ['Content-type', 'Authorization'] //Configurações de permissões.
                    //Tipo de dados  //Autorização de acesso 
}

// Aplica as configurações do CORS no app (EXPRESS)
app.use(cors(corsOptions))


// ENDPOINTS

// endpoint para cadastrar o filme
app.post('/v1/senai/locadora/filme',bodyParserJSON, async function(request, response){
   // Recebendo o body da requisição
    let  dados = request.body


    // Recebendo o tipo de dados da requisição para validar se é JSON.
    let contentType = request.headers['content-type']

    let result = await controllerFilme.inserirNovoFilme(dados, contentType)
    

    response.status(result.status_code)
    response.json(result)
})

// endpoint para pegar todos os filmes
app.get('/v1/senai/locadora/filme', async function(request, response){
    let result = await controllerFilme.listarFilme()

    response.status(result.status_code)
    response.json(result)
})

// endpoint para pegar um filme pelo id
app.get('/v1/senai/locadora/filme/:id', async function(request, response) {
    let id = request.params.id

    let result = await controllerFilme.buscarFilme(id)

    response.status(result.status_code)
    response.json(result)
})













// Faz um start na API (Aguardando requisição)
app.listen(8080, function(){
    console.log('API aguardando novas requisições...')
})

