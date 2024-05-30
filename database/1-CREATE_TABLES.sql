--
-- ER/Studio 8.0 SQL Code Generation
-- Company :      FI-UNAM
-- Project :      prueba.DM1
-- Author :       RogelioYaelHJ
--
-- Date Created : Wednesday, May 29, 2024 11:36:46
-- Target DBMS : Oracle 11g
--
-- 
-- TABLE: Capitulos 
--
CREATE TABLE Capitulos(
    Id_Capitulo NUMBER(20, 0) NOT NULL,
    Id_Serie NUMBER(20, 0) NOT NULL,
    Id_Contenido NUMBER(20, 0) NOT NULL,
    CAP_Source BLOB NOT NULL,
    CAP_Duracion NUMBER(3, 0) NOT NULL,
    CAP_Temporada NUMBER(2, 0) NOT NULL,
    CAP_Number NUMBER(4, 0) NOT NULL,
    CONSTRAINT PK_Capitulos PRIMARY KEY (Id_Capitulo, Id_Serie, Id_Contenido)
);
-- 
-- TABLE: Contenido 
--
CREATE TABLE Contenido(
    Id_Contenido NUMBER(20, 0) NOT NULL,
    Id_TipoContenido NUMBER(2, 0) NOT NULL,
    CONT_Nombre VARCHAR2(40) NOT NULL,
    CONT_FechaLanz DATE NOT NULL,
    CONT_COVER BLOB NOT NULL,
    CONT_Sonido BLOB NOT NULL,
    CONT_Trailer BLOB NOT NULL,
    CONSTRAINT PK_Contenido PRIMARY KEY (Id_Contenido)
);
-- 
-- TABLE: Historial 
--
CREATE TABLE Historial(
    Id_Historial NUMBER(18, 0) NOT NULL,
    Id_Perfil NUMBER(18, 0) NOT NULL,
    Id_Usuario NUMBER(18, 0) NOT NULL,
    CONSTRAINT PK_Historial PRIMARY KEY (Id_Historial)
);
-- 
-- TABLE: HistorialContenido 
--
CREATE TABLE HistorialContenido(
    Id_HistorialContenido NUMBER(38, 0) NOT NULL,
    Id_Pelicula NUMBER(20, 0),
    Id_Contenido NUMBER(20, 0),
    Id_Capitulo NUMBER(20, 0),
    Id_Serie NUMBER(20, 0),
    Id_Historial NUMBER(18, 0) NOT NULL,
    CONSTRAINT PK_HistorialContenido PRIMARY KEY (Id_HistorialContenido)
);
-- 
-- TABLE: Info_Bancaria 
--
CREATE TABLE Info_Bancaria(
    Id_InfoBancaria NUMBER(18, 0) NOT NULL,
    INFOBANC_Caducidad DATE NOT NULL,
    INFOBANC_NombrePropietario VARCHAR2(50) NOT NULL,
    INFOBANC_CVV NUMBER(3, 0) NOT NULL,
    INFOBANC_NumTarjeta NUMBER(16, 0) NOT NULL,
    CONSTRAINT PK_InfoBancaria PRIMARY KEY (Id_InfoBancaria)
);
-- 
-- TABLE: Pelicula 
--
CREATE TABLE Pelicula(
    Id_Pelicula NUMBER(20, 0) NOT NULL,
    Id_Contenido NUMBER(20, 0) NOT NULL,
    PELI_Source BLOB NOT NULL,
    PELI_Duracion NUMBER(3, 0) NOT NULL,
    CONSTRAINT PK_Pelicula PRIMARY KEY (Id_Pelicula, Id_Contenido)
);
-- 
-- TABLE: Perfil 
--
CREATE TABLE Perfil(
    Id_Perfil NUMBER(18, 0) NOT NULL,
    Id_Usuario NUMBER(18, 0) NOT NULL,
    PERF_Img BLOB NOT NULL,
    PERF_Nombre VARCHAR2(25) NOT NULL,
    CONSTRAINT PK_Perfil PRIMARY KEY (Id_Perfil, Id_Usuario)
);
-- 
-- TABLE: Serie 
--
CREATE TABLE Serie(
    Id_Serie NUMBER(20, 0) NOT NULL,
    Id_Contenido NUMBER(20, 0) NOT NULL,
    SER_Capitulos NUMBER(4, 0) NOT NULL,
    SERIE_Temporadas NUMBER(2, 0) NOT NULL,
    CONSTRAINT PK_Serie PRIMARY KEY (Id_Serie, Id_Contenido)
);
-- 
-- TABLE: TipoContenido 
--
CREATE TABLE TipoContenido(
    Id_TipoContenido NUMBER(2, 0) NOT NULL,
    TIPOCONT_Descripcion VARCHAR2(15) NOT NULL,
    CONSTRAINT PK_TipoContenido PRIMARY KEY (Id_TipoContenido)
);
-- 
-- TABLE: Usuario 
--
CREATE TABLE Usuario(
    Id_Usuario NUMBER(18, 0) NOT NULL,
    Id_InfoBancaria NUMBER(18, 0) NOT NULL,
    USR_Password VARCHAR2(25) NOT NULL,
    USR_Correo VARCHAR2(25) NOT NULL,
    USR_Apellido VARCHAR2(20) NOT NULL,
    USR_Nombre VARCHAR2(20) NOT NULL,
    CONSTRAINT PK_Usuario PRIMARY KEY (Id_Usuario)
);
-- 
-- TABLE: Capitulos 
--
ALTER TABLE Capitulos
ADD CONSTRAINT FK_CAPITULO_SERIE FOREIGN KEY (Id_Serie, Id_Contenido) REFERENCES Serie(Id_Serie, Id_Contenido);
-- 
-- TABLE: Contenido 
--
ALTER TABLE Contenido
ADD CONSTRAINT FK_TIPO_CONTENIDO FOREIGN KEY (Id_TipoContenido) REFERENCES TipoContenido(Id_TipoContenido);
-- 
-- TABLE: Historial 
--
ALTER TABLE Historial
ADD CONSTRAINT FK_HISTORIAL_PERFIL FOREIGN KEY (Id_Perfil, Id_Usuario) REFERENCES Perfil(Id_Perfil, Id_Usuario);
-- 
-- TABLE: HistorialContenido 
--
ALTER TABLE HistorialContenido
ADD CONSTRAINT RefCapitulos92 FOREIGN KEY (Id_Capitulo, Id_Serie, Id_Contenido) REFERENCES Capitulos(Id_Capitulo, Id_Serie, Id_Contenido);
ALTER TABLE HistorialContenido
ADD CONSTRAINT RefPelicula102 FOREIGN KEY (Id_Pelicula, Id_Contenido) REFERENCES Pelicula(Id_Pelicula, Id_Contenido);
ALTER TABLE HistorialContenido
ADD CONSTRAINT FK_EDOREP_HISTORIAL FOREIGN KEY (Id_Historial) REFERENCES Historial(Id_Historial);
-- 
-- TABLE: Pelicula 
--
ALTER TABLE Pelicula
ADD CONSTRAINT FK_PELICULA_CONTENIDO FOREIGN KEY (Id_Contenido) REFERENCES Contenido(Id_Contenido);
-- 
-- TABLE: Perfil 
--
ALTER TABLE Perfil
ADD CONSTRAINT FK_PERFIL_USUARIO FOREIGN KEY (Id_Usuario) REFERENCES Usuario(Id_Usuario);
-- 
-- TABLE: Serie 
--
ALTER TABLE Serie
ADD CONSTRAINT FK_SERIE_CONTENIDO FOREIGN KEY (Id_Contenido) REFERENCES Contenido(Id_Contenido);