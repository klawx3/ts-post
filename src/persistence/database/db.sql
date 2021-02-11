DROP DATABASE IF EXISTS post;
CREATE DATABASE post;

USE post;

CREATE TABLE user (
    id INT AUTO_INCREMENT,
    username VARCHAR(50),
    passwd VARCHAR(64),

    PRIMARY KEY(id),
    UNIQUE(username)
);

CREATE TABLE post (
    id INT AUTO_INCREMENT,
    user_id_fk INT,
    text TEXT,
    date DATETIME,

    PRIMARY KEY (id),
    FOREIGN KEY (user_id_fk) REFERENCES user(id)
);

-- INSERTS 

INSERT INTO user VALUES (NULL,"klawx3", SHA2('123',0));

INSERT INTO post VALUES (NULL,(SELECT id FROM user WHERE username = "klawx3"), "texto 1",now());
INSERT INTO post VALUES (NULL,(SELECT id FROM user WHERE username = "klawx3"), "texto 2",now());