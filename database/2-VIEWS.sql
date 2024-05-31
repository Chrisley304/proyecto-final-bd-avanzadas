use MexFlix;
-- Content view to obtain the information of the content without catalogs IDs
CREATE or REPLACE VIEW Contenido_View AS
SELECT c.Id_Contenido "id",
    c.CONT_Nombre "title",
    c.CONT_FechaLanz "launchDate",
    c.CONT_Cover "coverImage",
    c.CONT_Trailer "trailerLink",
    c.CONT_Descripcion "description",
    g.genero "category",
    TIPOCONT_Descripcion "type"
FROM Contenido c
    JOIN Genero g ON c.Id_Genero = g.Id_Genero
    JOIN TipoContenido t ON c.Id_TipoContenido = t.Id_TipoContenido;
select *
from Contenido_View;
-- User view for select info from the user
CREATE or REPLACE VIEW User_View AS
SELECT u.Id_Usuario "id",
    u.USR_Nombre "name",
    u.USR_Apellido "lastName",
    u.USR_Correo "email",
    u.USR_Password "password",
    ib.INFOBANC_NumTarjeta "cardNumber",
    ib.INFOBANC_Caducidad "expirationDate",
    ib.INFOBANC_NombrePropietario "cardFullName",
    ib.INFOBANC_CVV "cvv"
FROM Usuario u
    JOIN Info_Bancaria ib ON u.Id_InfoBancaria = ib.Id_InfoBancaria;
select *
from User_View;