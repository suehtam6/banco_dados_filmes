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

create table tbl_genero(
	id int not null  auto_increment primary key,
    genero varchar(40) not null
);

create table tbl_profissional(
	id	int not null auto_increment primary key,
    nome varchar(80) not null,
    data_nascimento date not null,
    foto varchar(255) not null,
    biografia text 
    
);

create table tbl_nacionalidade(
	id int not null auto_increment primary key,
    nacionalidade varchar(30) not null
);

#CRIANDO TABELA SOBRE OS CARGOS DOS ATORES
create table tbl_cargo(
	id int not null auto_increment primary key,
    cargo varchar(25) not null
);

#CRIANDO TABELA SOBRE O PAPEL DOS ATORES
create table tbl_papel(
	id int not null auto_increment primary key,
	papel varchar(20)
);

create table tbl_filmografia(
	id int not null auto_increment primary key,
    filmografia varchar(80) not null,
    capa varchar(255) not null
);

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


DELIMITER $
	create trigger tgrDeleteFilmeProfissionalCargo
		before delete on tbl_filme
			for each row
				begin
				delete from tbl_filme_profissional_cargo where id_filme = old.id;

		END $
        
        
select * from tbl_profissional_nacionalidade;
select * from tbl_profissional;
#drop database db_filmes_20261_b;
    

