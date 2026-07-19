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



// IMPORT DO ARQUIVO DE ROTAS SOBRE O FILME
const filmeRouter = require('./routes/filme.router.js')
app.use('/v1/senai/locadora/filme', cors(), filmeRouter)


// IMPORT DO ARQUIVO DE ROTAS SOBRE O GÊNERO
const generoRouter = require('./routes/genero.router.js')
app.use('/v1/senai/locadora/genero', cors(), generoRouter)

// IMPORT DO ARQUIVO DE ROTAS SOBRE A CLASSIFICAÇÃO
const classificacaoRouter = require('./routes/classificacao.router.js')
app.use('/v1/senai/locadora/classificacao', cors(), classificacaoRouter)

// IMPORT DO ARQUIVO DE ROTAS SOBRE A NACIONALIDADE
const nacionalidadeRouter = require('./routes/nacionalidade.router.js')
app.use('/v1/senai/locadora/nacionalidade', cors(), nacionalidadeRouter)

// IMPORT DO ARQUIVO DE ROTAS SOBRE O CARGO
const cargoRouter = require('./routes/cargo.router.js')
app.use('/v1/senai/locadora/cargo', cors(), cargoRouter)

// IMPORT DO ARQUIVO DE ROTAS SOBRE O PAPEL
const papelRouter = require('./routes/papel.router.js')
app.use('/v1/senai/locadora/papel', cors(), papelRouter)

// IMPORT DO ARQUIVO DE ROTAS SOBRE O PROFISSIONAL
const profissionalRouter = require('./routes/profissional.router.js')
app.use('/v1/senai/locadora/profissional', cors(), profissionalRouter)


// Faz um start na API (Aguardando requisição)
app.listen(8080, function(){
    console.log('API aguardando novas requisições...')
})