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

const controllerClassificacao   = require('./controller/classificacao/controllerClassificacao.js')
const controllerProfissional    = require('./controller/profissional/controllerProfissional.js')
const controllerNacionalidade   = require('./controller/nacionalidade/controllerNacionalidade.js')
const controllerCargo           = require('./controller/cargo/controllerCargo.js')
const controllerPapel           = require('./controller/papel/controllerPapel.js')
const controllerFilmografia     = require('./controller/filmografia/controllerFilmografia.js')



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



// ENDPOINTS SOBRE O FILME
const filmeRouter = require('./routes/filme.router.js')
app.use('/v1/senai/locadora/filme', cors(), filmeRouter)


// IMPORT DO ARQUIVO DE ROTAS SOBRE O GÊNERO
const generoRouter = require('./routes/genero.router.js')
app.use('/v1/senai/locadora/genero', cors(), generoRouter)

// ENDPOINTS SOBRE A CLASSIFICAÇÃO

// endpoint para CRUD da classificação
app.post('/v1/senai/locadora/classificacao',bodyParserJSON, async function(request, response){
    // Recebendo o body da requisição
     let  dados = request.body
 
 
     // Recebendo o tipo de dados da requisição para validar se é JSON.
     let contentType = request.headers['content-type']
 
     let result = await controllerClassificacao.inserirNovaClassificacao(dados, contentType)
 
     response.status(result.status_code)
     response.json(result)
 })

// endpoint para listar os classificação
app.get('/v1/senai/locadora/classificacao', async function(request, response) {
    let result = await controllerClassificacao.listarClassificacao()

    response.status(result.status_code)
    response.json(result)
})

// endpoint para listar por ID a classificação
app.get('/v1/senai/locadora/classificacao/:id', async function(request, response) {
    let id = request.params.id
    let result = await controllerClassificacao.buscarClassificacao(id)

    response.status(result.status_code)
    response.json(result)
})

// endpoint para atualizar uma classificação
app.put('/v1/senai/locadora/classificacao/:id', bodyParserJSON, async function(request, response) {

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

// endpoint para deletar a classificação pelo id
app.delete('/v1/senai/locadora/classificacao/:id', async function(request, response) {
    let id = request.params.id

    let result = await controllerClassificacao.excluirClassificacao(id)
    response.status(result.status_code)
    response.json(result)
})



// ENDPOINTS SOBRE O PROFISSIONAL

// endpoint para inserir um profissional
app.post('/v1/senai/locadora/profissional',bodyParserJSON, async function(request, response){
    // Recebendo o body da requisição
     let  dados = request.body
 
 
     // Recebendo o tipo de dados da requisição para validar se é JSON.
     let contentType = request.headers['content-type']
 
     let result = await controllerProfissional.inserirNovoProfissional(dados, contentType)
 
     response.status(result.status_code)
     response.json(result)
 })

// endpoint para listar por ID o Profissonal
app.get('/v1/senai/locadora/profissional/:id', async function(request, response) {
    let id = request.params.id
    let result = await controllerProfissional.buscarProfissional(id)

    response.status(result.status_code)
    response.json(result)
})

// endpoint para atualizar um Profissional
app.put('/v1/senai/locadora/profissional/:id', bodyParserJSON, async function(request, response) {

    // Recebe o id do registro a ser atualizado.
    let id = request.params.id

    // Recebe os dados do body que serão modificados no banco de dados.
    let dados = request.body

    // Recebe o content-type da requisição para validar se é JSON.
    let contentType = request.headers['content-type']
    
    // Chama a função para atualizar o filme.
    let result = await controllerProfissional.atualizarProfissional(dados, id, contentType)
    
    response.status(result.status_code)
    response.json(result)
})

// endpoint para listar os Profissonais
app.get('/v1/senai/locadora/profissional', async function(request, response) {

    let result = await controllerProfissional.listarProfissional()
    response.status(result.status_code)
    response.json(result)
    
})

// endpoint para deletar algum profissional
app.delete('/v1/senai/locadora/profissional/:id', async function(request, response) {
    let id = request.params.id
    let result = await controllerProfissional.excluirProfissional(id)
    
    response.status(result.status_code)
    response.json(result)
})




// ENDPOINTS SOBRE A NACIONALIDADE  

// endpoint para inserir a nacionalidade
app.post('/v1/senai/locadora/nacionalidade', bodyParserJSON, async function(request, response) {
   
    //Guardando os dados do body para utilizar no CRUD
    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerNacionalidade.inserirNovoNacionalidade(dados, contentType)

    response.status(result.status_code)
    response.json(result)

})

// endpoint para listar por ID a nacionalidade
app.get('/v1/senai/locadora/nacionalidade/:id', async function(request, response) {
    let id = request.params.id

    let result = await controllerNacionalidade.buscarNacionalidade(id)

    response.status(result.status_code)
    response.json(result)

})

// endpoint para atualizar uma nacionalidade
app.put('/v1/senai/locadora/nacionalidade/:id', bodyParserJSON, async function(request, response) {

    // Recebe o id do registro a ser atualizado.
    let id = request.params.id

    // Recebe os dados do body que serão modificados no banco de dados.
    let dados = request.body

    // Recebe o content-type da requisição para validar se é JSON.
    let contentType = request.headers['content-type']
    
    // Chama a função para atualizar o filme.
    let result = await controllerNacionalidade.atualizarNacionalidade(dados, id, contentType)
    
    response.status(result.status_code)
    response.json(result)
})

// endpoint para listar as nacionalidades
app.get('/v1/senai/locadora/nacionalidade', async function(request, response) {

    let result = await controllerNacionalidade.listarNacionalidade()
    response.status(result.status_code)
    response.json(result)
    
})

// endpoint para deletar alguma nacionalidade
app.delete('/v1/senai/locadora/nacionalidade/:id', async function(request, response) {
    let id = request.params.id
    let result = await controllerNacionalidade.excluirNacionalidade(id)
    
    response.status(result.status_code)
    response.json(result)
})




// ENDPOINTS SOBRE O CARGO

// endpoint para inserir o cargo
app.post('/v1/senai/locadora/cargo', bodyParserJSON, async function(request, response) {
   
    //Guardando os dados do body para utilizar no CRUD
    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerCargo.inserirCargo(dados, contentType)

    response.status(result.status_code)
    response.json(result)

})

// endpoint para listar por ID o cargo
app.get('/v1/senai/locadora/cargo/:id', async function(request, response) {
    let id = request.params.id

    let result = await controllerCargo.buscarCargo(id)

    response.status(result.status_code)
    response.json(result)

})

// endpoint para atualizar um cargo
app.put('/v1/senai/locadora/cargo/:id', bodyParserJSON, async function(request, response) {

    // Recebe o id do registro a ser atualizado.
    let id = request.params.id

    // Recebe os dados do body que serão modificados no banco de dados.
    let dados = request.body

    // Recebe o content-type da requisição para validar se é JSON.
    let contentType = request.headers['content-type']
    
    // Chama a função para atualizar o filme.
    let result = await controllerCargo.atualizarCargo(dados, id, contentType)
    
    response.status(result.status_code)
    response.json(result)
})

// endpoint para listar os cargos
app.get('/v1/senai/locadora/cargo', async function(request, response) {

    let result = await controllerCargo.listarCargo()
    response.status(result.status_code)
    response.json(result)
    
})

// endpoint para deletar algum cargo
app.delete('/v1/senai/locadora/cargo/:id', async function(request, response) {
    let id = request.params.id
    let result = await controllerCargo.excluirCargo(id)
    
    response.status(result.status_code)
    response.json(result)
})





// ENDPOINTS SOBRE O PAPEL DO PROSSIFIONAL

//Endpoint para cadastrar um novo papel
app.post('/v1/senai/locadora/papel', bodyParserJSON, async function(request, response) {
    
    let dados = request.body

    let contentType = request.headers["content-type"]

    let result = await controllerPapel.inserirNovoPapel(dados, contentType)

    response.status(result.status_code)
    response.json(result)

})

//Endpoint para listar os papeis cadastrados
app.get('/v1/senai/locadora/papel', async function(request, response) {
    
    let result = await controllerPapel.listarPapel()

    response.status(result.status_code)
    response.json(result)
})

//Endpoint para buscar um papel pelo id
app.get('/v1/senai/locadora/papel/:id', async function(request, response) {
    let id = request.params.id
    
    let result = await controllerPapel.buscarPapel(id)

    response.status(result.status_code)
    response.json(result)

})

//Endpoint para atualizar um papel pelo id
app.put('/v1/senai/locadora/papel/:id', bodyParserJSON, async function(request, response) {
    let id = request.params.id
    let dados = request.body    
    let contentType = request.headers['content-type']

    let result = await controllerPapel.atualizarPapel(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

//Endpoint para deletar um papel pelo id
app.delete('/v1/senai/locadora/papel/:id', async function(request, response) {
    
    let id = request.params.id
    
    let result = await controllerPapel.excluirPapel(id)
    response.status(result.status_code)
    response.json(result)
})


// ENDPOINTS SOBRE A FILMOGRAFIA

//Endpoint para cadastrar uma nova filmografia
app.post('/v1/senai/locadora/filmografia', bodyParserJSON, async function(request, response) {
    
    let dados = request.body

    let contentType = request.headers["content-type"]

    let result = await controllerFilmografia.inserirNovaFilmografia(dados, contentType)

    response.status(result.status_code)
    response.json(result)

})

//Endpoint para listar as filmografia cadastrados
app.get('/v1/senai/locadora/filmografia', async function(request, response) {
    
    let result = await controllerFilmografia.listarFilmografia()

    response.status(result.status_code)
    response.json(result)
})

//Endpoint para buscar uma filmografia pelo id
app.get('/v1/senai/locadora/filmografia/:id', async function(request, response) {
    let id = request.params.id
    
    let result = await controllerFilmografia.buscarFilmografia(id)

    response.status(result.status_code)
    response.json(result)

})

//Endpoint para atualizar uma filmografia pelo id
app.put('/v1/senai/locadora/filmografia/:id', bodyParserJSON, async function(request, response) {
    let id = request.params.id
    let dados = request.body    
    let contentType = request.headers['content-type']

    let result = await controllerFilmografia.atualizarFilmografia(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

//Endpoint para deletar uma filmografia pelo id
app.delete('/v1/senai/locadora/filmografia/:id', async function(request, response) {
    
    let id = request.params.id
    
    let result = await controllerFilmografia.excluirFilmografia(id)
    response.status(result.status_code)
    response.json(result)
})



// Faz um start na API (Aguardando requisição)
app.listen(8080, function(){
    console.log('API aguardando novas requisições...')
})