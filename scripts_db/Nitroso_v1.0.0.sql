-- --------------------------------------------------
-- CREACION DE BASE DE DATOS
-- --------------------------------------------------

CREATE DATABASE IF NOT EXISTS nitroso;
USE nitroso;

-- --------------------------------------------------
-- ELIMINACION DE TABLAS
-- --------------------------------------------------

DROP TABLE IF EXISTS puntuacion;
DROP TABLE IF EXISTS usuario;

-- --------------------------------------------------
-- CREACION DE TABLAS
-- --------------------------------------------------
CREATE TABLE usuario
(
	id_usuario			INT AUTO_INCREMENT PRIMARY KEY,
    nick				VARCHAR(50) NOT NULL,
    password			VARCHAR(50) NOT NULL,
    fecha_alta			DATETIME NOT NULL DEFAULT NOW(),
    fecha_mod			DATETIME NOT NULL DEFAULT NOW()
);

CREATE TABLE puntuacion
(
	id_puntuacion		INT AUTO_INCREMENT PRIMARY KEY,
	id_usuario			INT,
    score				DECIMAL(18, 2),
    dificultad			VARCHAR(50),
    fecha_alta			DATETIME NOT NULL DEFAULT NOW(),
    fecha_mod			DATETIME NOT NULL DEFAULT NOW(),
    
    CONSTRAINT 			FK_puntuacion_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

-- --------------------------------------------------
-- CREACION DE SPs
-- --------------------------------------------------

DROP PROCEDURE IF EXISTS sp_usuario_create;

DELIMITER //

CREATE PROCEDURE sp_usuario_create -- CALL sp_usuario_create('asd', '123', 'asd@jotmail.com')
(
    IN p_nick		VARCHAR(50),
    IN p_password	VARCHAR(50)
)
BEGIN

	INSERT INTO usuario (nick, 		password) 
	VALUES 				(p_nick,		p_password);
    
    SELECT IFNULL(MAX(id_usuario), 0) AS id FROM usuario;
    
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS sp_usuario_exists;

DELIMITER //

CREATE PROCEDURE sp_usuario_exists -- CALL sp_usuario_exists('test', '123')
(
	IN p_nick		VARCHAR(50),
    IN p_password	VARCHAR(50)
)
BEGIN

	DECLARE id INT DEFAULT 0;
    
    SET id = 
    (
		SELECT IFNULL(
			(SELECT		u.id_usuario
			FROM		usuario u
			WHERE		u.nick = p_nick
						AND u.password = p_password
            LIMIT		1)
		, 0)
	);
    
    SELECT id;
	
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS sp_usuario_exists_by_nick;

DELIMITER //

CREATE PROCEDURE sp_usuario_exists_by_nick -- CALL sp_usuario_exists_by_nick('isolis')
(
	IN p_nick		VARCHAR(50)
)
BEGIN

	DECLARE id INT DEFAULT 0;
    
    SET id = 
    (
		SELECT IFNULL(
			(SELECT		u.id_usuario
			FROM		usuario u
			WHERE		u.nick = p_nick
            LIMIT		1)
		, 0)
	);
    
    SELECT id;
	
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS sp_puntuacion_create;

DELIMITER //

CREATE PROCEDURE sp_puntuacion_create -- CALL sp_puntuacion_create()
(
    IN p_id_usuario	INT,
    IN p_score		DECIMAL(18, 2),
    IN p_dificultad	VARCHAR(50)
)
BEGIN

	INSERT INTO puntuacion 	(id_usuario, score, dificultad) 
	VALUES 					(p_id_usuario, p_score, p_dificultad);
    
    SELECT IFNULL(MAX(id_puntuacion), 0) AS id FROM puntuacion;
    
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS sp_puntuacion_selectall;

DELIMITER //

CREATE PROCEDURE sp_puntuacion_selectall -- CALL sp_puntuacion_selectall()
(
)
BEGIN

	SELECT		p.id_puntuacion,
				p.id_usuario,
                u.nick,
                p.score,
                p.dificultad,
                p.fecha_alta,
                p.fecha_mod
    FROM		puntuacion p
    
    INNER JOIN	usuario u
				ON p.id_usuario = u.id_usuario
                
	ORDER BY	p.fecha_alta DESC;
    
END //

DELIMITER ;