CREATE DATABASE MexFlix;
-- DROP DATABASE MexFlix;
use MexFlix;
CREATE TABLE Info_Bancaria(
    Id_InfoBancaria BIGINT NOT NULL AUTO_INCREMENT,
    INFOBANC_Caducidad DATE NOT NULL,
    INFOBANC_NombrePropietario VARCHAR(50) NOT NULL,
    INFOBANC_CVV SMALLINT NOT NULL,
    INFOBANC_NumTarjeta BIGINT NOT NULL,
    CONSTRAINT PK_InfoBancaria PRIMARY KEY (Id_InfoBancaria)
);
CREATE TABLE Usuario(
    Id_Usuario BIGINT NOT NULL AUTO_INCREMENT,
    Id_InfoBancaria BIGINT NOT NULL,
    USR_Password VARCHAR(25) NOT NULL,
    USR_Correo VARCHAR(40) NOT NULL,
    USR_Nombre VARCHAR(25) NOT NULL,
    USR_Apellido VARCHAR(25) NOT NULL,
    CONSTRAINT PK_Usuario PRIMARY KEY (Id_Usuario),
    CONSTRAINT UQ_USR_Correo UNIQUE (USR_Correo),
    CONSTRAINT FK_InfoBancaria FOREIGN KEY (Id_InfoBancaria) REFERENCES Info_Bancaria(Id_InfoBancaria)
);
CREATE TABLE Perfil(
    Id_Perfil BIGINT NOT NULL AUTO_INCREMENT,
    Id_Usuario BIGINT NOT NULL,
    PERF_Img MEDIUMBLOB NOT NULL,
    PERF_Nombre VARCHAR(25) NOT NULL,
    CONSTRAINT PK_Perfil PRIMARY KEY (Id_Perfil),
    CONSTRAINT FK_Usuario_Perfil FOREIGN KEY (Id_Usuario) REFERENCES Usuario(Id_Usuario),
    CONSTRAINT UQ_Usuario_Perfil UNIQUE (Id_Usuario, Id_Perfil)
);
CREATE TABLE TipoContenido(
    Id_TipoContenido TINYINT NOT NULL AUTO_INCREMENT,
    TIPOCONT_Descripcion VARCHAR(15) NOT NULL,
    CONSTRAINT PK_TipoContenido PRIMARY KEY (Id_TipoContenido)
);
CREATE TABLE Genero(
    Id_Genero TINYINT NOT NULL AUTO_INCREMENT,
    genero VARCHAR(15) NOT NULL,
    CONSTRAINT PK_Genero PRIMARY KEY (Id_Genero)
);
CREATE TABLE Contenido(
    Id_Contenido BIGINT NOT NULL AUTO_INCREMENT,
    Id_TipoContenido TINYINT NOT NULL,
    Id_Genero TINYINT NOT NULl,
    CONT_Nombre VARCHAR(40) NOT NULL,
    CONT_FechaLanz DATE NOT NULL,
    CONT_Cover MEDIUMBLOB NOT NULL,
    CONT_Trailer VARCHAR(50) NOT NULL,
    CONT_Descripcion VARCHAR(200) NOT NULL,
    CONSTRAINT PK_Contenido PRIMARY KEY (Id_Contenido),
    CONSTRAINT FK_Genero_Contenido FOREIGN KEY (Id_Genero) REFERENCES Genero(Id_Genero),
    CONSTRAINT FK_TipoContenido FOREIGN KEY (Id_TipoContenido) REFERENCES TipoContenido(Id_TipoContenido)
);
CREATE TABLE Pelicula(
    Id_Pelicula BIGINT NOT NULL AUTO_INCREMENT,
    Id_Contenido BIGINT NOT NULL,
    PELI_Source LONGBLOB NOT NULL,
    PELI_Duracion VARCHAR(20) NOT NULL,
    CONSTRAINT PK_Pelicula PRIMARY KEY (Id_Pelicula),
    CONSTRAINT FK_Contenido_Pelicula FOREIGN KEY (Id_Contenido) REFERENCES Contenido(Id_Contenido),
    CONSTRAINT UQ_Pelicula_Contenido UNIQUE (Id_Contenido, Id_Pelicula)
);
CREATE TABLE Serie(
    Id_Serie BIGINT NOT NULL AUTO_INCREMENT,
    Id_Contenido BIGINT NOT NULL,
    SER_Capitulos SMALLINT NOT NULL,
    SERIE_Temporadas TINYINT NOT NULL,
    CONSTRAINT PK_Serie PRIMARY KEY (Id_Serie),
    CONSTRAINT FK_Contenido_Serie FOREIGN KEY (Id_Contenido) REFERENCES Contenido(Id_Contenido),
    CONSTRAINT UQ_Serie_Contenido UNIQUE (Id_Contenido, Id_Serie)
);
CREATE TABLE Capitulo(
    Id_Capitulo BIGINT NOT NULL AUTO_INCREMENT,
    Id_Serie BIGINT NOT NULL,
    CAP_Source LONGBLOB NOT NULL,
    CAP_Duracion VARCHAR(20) NOT NULL,
    CAP_Temporada TINYINT NOT NULL,
    CAP_Number TINYINT NOT NULL,
    CAP_Cover MEDIUMBLOB NOT NULL,
    CONSTRAINT PK_Serie PRIMARY KEY (Id_Capitulo),
    CONSTRAINT UQ_Capitulo_Serie UNIQUE (Id_Serie, Id_Capitulo)
);
CREATE TABLE Historial(
    Id_Historial BIGINT NOT NULL AUTO_INCREMENT,
    Id_Perfil BIGINT NOT NULL,
    Id_Contenido BIGINT NOT NULL,
    CONSTRAINT PK_Historial PRIMARY KEY (Id_Historial),
    CONSTRAINT FK_Contenido_Historial FOREIGN KEY (Id_Contenido) REFERENCES Contenido(Id_Contenido),
    CONSTRAINT FK_Perfil_Historial FOREIGN KEY (Id_Perfil) REFERENCES Perfil(Id_Perfil),
    CONSTRAINT UQ_Perfil_Historial UNIQUE (Id_Perfil, Id_Historial)
);