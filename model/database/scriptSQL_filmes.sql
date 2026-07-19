#Permite criar um database
create database db_filmes_20261_b;

#Permite visualizar todos os databases existentes
show databases;

#Permite escolher o database a ser utilizado
use db_filmes_20261_b;

#Permite visualizar todas as tabelas existentes dentro do database
show tables;


#Permite criar tabelas

#Criando tabela de classificacao
create table tbl_classificacao(
	id int not null auto_increment primary key,
    classificacao varchar(30) not null
);

insert into tbl_classificacao(
	classificacao
)values(
	classificacao = 'livre'
);

select * from tbl_classificacao order by id desc;

update tbl_classificacao set
	classificacao = '10'
    where id=1;


create table tbl_filme (
	id					int not null auto_increment primary key,
    nome 				varchar(80) not null,
    sinopse 			text not null,
    capa 				varchar(255) not null,
    data_lancamento 	date not null,
    duracao 			time not null,
    valor 				decimal(5,2) default 0,
    avaliacao 			decimal(3,2) default null,
    id_classificacao	int not null,
    
    constraint FK_CLASSIFICACAO_FILME
	foreign key (id_classificacao)
	references tbl_classificacao(id)
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
	avaliacao,
    id_classificacao

)values(
	replace("Super Mario Galaxy: O Filme", "'", ""),
    'Uma nova aventura leva Mario a enfrentar um inédito e ameaçador super vilão. Em Super Mario Galaxy: O Filme, o bigodudo encanador italiano e seus aliados embarcam numa aventura galáctica repleta de ação e momentos emocionantes depois de salvar o Reino dos Cogumelos.',
    'https://br.web.img3.acsta.net/c_310_420/img /5b/ea/5bea1aeac3323aeaaf82449a34fafbbf.jpg',
    '2026-04-02',
    '01:39:00',
    '50.60',
    if('', null, 2),
    1
    
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

update tbl_genero set
	genero = 'Comedia'
    where id = 1;

select * from tbl_genero order by id desc;

#delete from tbl_genero where id=1;

show tables;




#---------------------------------- DIA 2026-05-08 --------------------------------------#

#---------------------------------- DIA 2026-05-13 --------------------------------------#

create table tbl_profissional(
	id	int not null auto_increment primary key,
    nome varchar(80) not null,
    data_nascimento date not null,
    foto varchar(255) not null,
    biografia text 
    
);

insert into tbl_profissional(
	nome,
    data_nascimento,
    foto,
    biografia
)values(
	replace("Matheus Lucas", "'", ""),
    '2026-05-16',
    'Matheus.png',
    'Olá, me chamo Matheus e estou desenvolvendo este projeto'
);

update tbl_profissional set
	nome 			= replace("Matheus Lucas", "'", ""),
	data_nascimento = '2026-05-16',
    foto 			= 'Matheus.png',
    biografia 		= 'Olá, me chamo Matheus e estou desenvolvendo este projeto!!'
		where id = 1;
        
select * from tbl_profissional order by id desc;

select * from tbl_profissional where id = 1;
        

#---------------------------------- DIA 2026-05-13 --------------------------------------#

#---------------------------------- DIA 2026-05-14 --------------------------------------#

create table tbl_nacionalidade(
	id int not null auto_increment primary key,
    nacionalidade varchar(30) not null
);

insert into tbl_nacionalidade(
	nacionalidade
)values(
	'Americano'
);

update tbl_nacionalidade set
	nacionalidade = 'AAAAAAAAA'
		where id = 2;
        

select * from tbl_nacionalidade order by id desc;

select * from tbl_nacionalidade where id = 1;

#delete from tbl_nacionalidade where id=1;

desc tbl_nacionalidade;

#drop table tbl_nacionalidade;

#---------------------------------- DIA 2026-05-14 --------------------------------------#

#---------------------------------- DIA 2026-05-15 --------------------------------------#


#CRIANDO TABELA SOBRE OS CARGOS DOS ATORES
create table tbl_cargo(
	id int not null auto_increment primary key,
    cargo varchar(25) not null
);

insert into tbl_cargo(
	cargo
)values(
	"Ator"
);

update tbl_cargo set
	cargo = "Atriz"
    where id = 1;
    
select * from tbl_cargo order by id desc;

select * from tbl_cargo where id = 1;
#delete from tbl_cargo where id = 1;



#CRIANDO TABELA SOBRE O PAPEL DOS ATORES
create table tbl_papel(
	id int not null auto_increment primary key,
	papel varchar(20)
);

insert into tbl_papel(
	papel
)values(
	'Ash'
);

update tbl_papel set
	papel = 'Gary'
		where id = 1;
        
select * from tbl_papel order by id desc;

select * from tbl_papel where id = 1;

#delete from tbl_papel where id = 1;


#---------------------------------- DIA 2026-05-15 --------------------------------------#



#---------------------------------- DIA 2026-05-20 --------------------------------------#

#Hoje irémos mexer com as tabela intermediárias.

desc tbl_filme;

#Primeiro devemos apagar todos os dados dentro da tabela filme, 
# pois eles iriam ficar com a chave estrangeira null e daria erro.
#delete from tbl_filme;

select * from tbl_filme;

#Logo quando você for atualizar o seu código, saiba que você vai ter que apagar sua tabela filme inteira.

alter table tbl_genero
	modify column genero varchar(30) not null;
    
create table tbl_filmografia(
	id int not null auto_increment primary key,
    filmografia varchar(80) not null,
    capa varchar(255) not null
);

insert into tbl_filmografia(
	filmografia,
    capa
)values(
	"pokemon as aventuras em galar",
    "pokemon.png"
);

update tbl_filmografia set
	filmografia = "pokemon as aventuras em Alola",
    capa = "pokemon.jpg"
	where id = 1;
    
select * from tbl_filmografia order by id desc;

select * from tbl_filmografia where id = 1;

#---------------------------------- DIA 2026-05-20 --------------------------------------#

#---------------------------------- DIA 2026-05-22 --------------------------------------#

create table tbl_filme_genero(
	id int not null auto_increment primary key,
    id_filme int not null,
    id_genero int not null,
    
    constraint FK_FILME_FILMEGENERO
    foreign key (id_filme)
    references tbl_filme(id),
    
    constraint FK_GENERO_FILMEGENERO
    foreign key (id_genero)
    references tbl_genero(id)
    
);

insert into tbl_filme_genero(
	id_filme,
    id_genero
)values(
	1,
    1
);

update tbl_filme_genero set
	id_filme = 1,
    id_genero = 1
    where id = 1;
    
select * from tbl_filme order by id desc;
select * from tbl_filme_genero order by id =1;

#delete from tbl_filme_genero;
#delete from tbl_filme;
#drop table tbl_filme_genero;


#---------------------------------- DIA 2026-05-22 --------------------------------------#


#---------------------------------- DIA 2026-05-29 --------------------------------------#


create table tbl_filme_profissional_cargo_papel(
	id int not null auto_increment primary key,
    id_filme int not null,
    id_profissional int not null,
    id_cargo int not null,
    id_papel int not null,
    
    constraint FK_FILME_FILMEPROFISSIONALCARGOPAPEL
    foreign key (id_filme)
    references tbl_filme(id),
    
    constraint FK_PROFISSIONAL_FILMEPROFISSIONALCARGOPAPEL
    foreign key (id_profissional)
    references tbl_profissional(id),
    
    constraint FK_CARGO_FILMEPROFISSIONALCARGOPAPEL
    foreign key (id_cargo)
    references tbl_cargo(id),
    
    constraint FK_PAPEL_FILMEPROFISSIONALCARGOPAPEL
    foreign key (id_papel)
    references tbl_papel(id)
    
);

insert into tbl_filme_profissional_cargo_papel(
	id_filme,
    id_profissional,
    id_cargo,
    id_papel
)values(
	1,
    1,
    1,
    1
);


update tbl_filme_profissional_cargo_papel set
	id_filme = 1,
    id_profissional = 1,
    id_cargo = 1,
    id_papel = 1
    where id = 1;


#drop table tbl_filme_profissional;

select * from tbl_filme;
select * from tbl_papel;
select * from tbl_profissional order by id desc;
select * from tbl_filme_profissional_cargo_papel order by id desc;
select * from tbl_filme_profissional_cargo_papel where id = 1;


DELIMITER $
	create trigger tgrDeleteFilmeProfissionalCargo
		before delete on tbl_filme
			for each row
				begin
				delete from tbl_filme_profissional_cargo where id_filme = old.id;

	END $
    
    
#delete from tbl_filme where id = 8;
#show triggers;

#---------------------------------- DIA 2026-05-29 --------------------------------------#

#---------------------------------- DIA 2026-07-19 --------------------------------------#

create table tbl_profissional_nacionalidade(
	id int not null auto_increment primary key,
    id_profissional int not null,
    id_nacionalidade int not null,
    
    constraint FK_PROFISSIONAL_PROFISSIONALNACIONALIDADE
    foreign key (id_profissional)
    references tbl_profissional(id),
    
    constraint FK_NACIONALIDADE_PROFISSIONALNACIONALIDADE
    foreign key (id_nacionalidade)
    references tbl_nacionalidade(id)
    
);



#---------------------------------- DIA 2026-07-19 --------------------------------------#

#drop database db_filmes_20261_b;
