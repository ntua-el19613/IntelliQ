drop schema if exists intelliq; 
create schema intelliq;
use intelliq;
CREATE TABLE questionnaire (
    questionnaire_id INT(10),
    PRIMARY KEY (questionnaire_id),
    questionnairetitle VARCHAR(50),
    n_quests INT(10)
);
CREATE TABLE questions (
    q_id INT(10),
    PRIMARY KEY (q_id),
    q_text VARCHAR(250),
    isprofile BOOLEAN,
    questionnaire_id INT(10),
    FOREIGN KEY (questionnaire_id)
        REFERENCES questionnaire (questionnaire_id)
        ON DELETE CASCADE
);
CREATE TABLE answers (
    a_id INT(10),
    PRIMARY KEY (a_id),
    a_text VARCHAR(250),
    q_id INT(10),
    q_id_next INT(10),
    questionnaire_id INT(10),
    FOREIGN KEY (questionnaire_id)
        REFERENCES questionnaire (questionnaire_id)
        ON DELETE CASCADE,
    FOREIGN KEY (q_id)
        REFERENCES questions (q_id)
        ON DELETE CASCADE,
    FOREIGN KEY (q_id_next)
        REFERENCES questions (q_id)
        ON DELETE CASCADE
);
CREATE TABLE energy (
    e_id INT(10),
    PRIMARY KEY (e_id),
    date_happend DATE,
    time_happend TIME,
    success BOOLEAN
);
CREATE TABLE selected (
    s_id INT(10),
    PRIMARY KEY (s_id),
    e_id INT(10),
    a_id INT(10),
    questionnaire_id INT(10),
    q_id INT(10),
    FOREIGN KEY (questionnaire_id)
        REFERENCES questionnaire (questionnaire_id)
        ON DELETE CASCADE,
    FOREIGN KEY (q_id)
        REFERENCES questions (q_id)
        ON DELETE CASCADE,
    FOREIGN KEY (a_id)
        REFERENCES answers (a_id)
        ON DELETE CASCADE,
    FOREIGN KEY (e_id)
        REFERENCES energy (e_id)
        ON DELETE CASCADE
);
use intelliq;
ALTER TABLE selected MODIFY s_id int(10) AUTO_INCREMENT;