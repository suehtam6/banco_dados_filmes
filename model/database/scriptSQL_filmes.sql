#Permite criar um database
create database db_filmes_20261_b;

#Permite visualizar todos os databases existentes
show databases;

#Permite escolher o database a ser utilizado
use db_filmes_20261_b;

#Permite visualizar todas as tabelas existentes dentro do database
show tables;

#Permite criar tabelas
create table tbl_filme (
	id					int not null auto_increment primary key,
    nome 				varchar(80) not null,
    sinopse 			text not null,
    capa 				varchar(255) not null,
    data_lancamento 	date not null,
    duracao 			time not null,
    valor 				decimal(5,2) default 0,
    avaliacao 			decimal(3,2) default null
);

# Permite apagar qualquer tabela e até mesmo o database, !!não deve ser utilizado em nenhum momento caso tenho dados na tabela e database!!
#drop table tbl_filme
#drop database db_filmes_20261_b

# Permite inserir itens na tabela, mas deve sempre ser seguido na ordem para evitar que inverta algum item
insert into tbl_filme(
	nome,
	sinopse,
	capa,
	data_lancamento,
	duracao,
	valor,
	avaliacao

)values(
	replace("Super Mario Galaxy: O Filme", "'", ""),
    'Uma nova aventura leva Mario a enfrentar um inédito e ameaçador super vilão. Em Super Mario Galaxy: O Filme, o bigodudo encanador italiano e seus aliados embarcam numa aventura galáctica repleta de ação e momentos emocionantes depois de salvar o Reino dos Cogumelos.',
    'https://br.web.img3.acsta.net/c_310_420/img /5b/ea/5bea1aeac3323aeaaf82449a34fafbbf.jpg',
    '2026-04-02',
    '01:39:00',
    '50.60',
    if('', null, 2)
    
);

# Mostrando todos os filmes cadastrados na tabela
select * from tbl_filme;

# Mostrando todos os filmes cadastrados na tabela de forma decrescente
select * from tbl_filme order by id desc;

# Buscando por id o filme
#select * from tbl_filme where id =	if('', null, 2) ;

# Permite apagar todos os registros da tabela aonde o id é maior que 1
#delete from tbl_filme where id=52;

#---------------------------------- DIA 2026-04-29 --------------------------------------#

#Fazendo a tabela de update, ela pode ser considerada bem perigosa caso você não fale qual 
# tabela gostaria de atualizar, ela irá mudar todos os nomes sem acessão.
# NUNCA ESQUECER DE UTILIZAR O WHERE PARA EVITAR ERROS!!
update tbl_filme set
	nome = 'Filme 03',
    sinopse = 'teste',
    capa = 'teste.png',
    data_lancamento = '2026-04-29',
    duracao = '01:50:00',
    valor = '10',
    avaliacao = '5'
    where id = 64;
    
    #Permite deletar filmes utilizando o id
    delete from tbl_filme where id=64;
    
    select * from tbl_filme;
#---------------------------------- DIA 2026-04-29 --------------------------------------#

#---------------------------------- DIA 2026-05-08 --------------------------------------#

#Criando tabela de genero
create table tbl_genero(
	id int not null  auto_increment primary key,
    genero varchar(15) not null
);

insert into tbl_genero(
	genero
)values(
	replace("terror", "'", "")
);

create table tbl_classificacao(
	id int not null auto_increment primary key,
    classificacao varchar(8) not null
);


#---------------------------------- DIA 2026-05-08 --------------------------------------#

