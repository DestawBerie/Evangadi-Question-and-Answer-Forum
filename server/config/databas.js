const mysql = require("mysql");
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
  connectionLimit: 10,
});

pool.getConnection(function (err, connection) {
  console.log("Database connected!");
});

//creating the connections
let registration = `CREATE TABLE if not exists registration(
    user_id int auto_increment,
    user_name varchar(50) not null,
    user_email varchar(50) not null,
    user_password varchar(50) not null,
    PRIMARY KEY(user_id)
)`;

let profile = `CREATE TABLE if not exists profile(
    user_profile_id int auto_increment,
    user_id int not null,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    PRIMARY KEY(user_profile_id),
    FOREIGN KEY(user_id) REFERENCES registration(user_id)
)`;
let question = `CREATE TABLE if not exists question(
    question_id int auto_increment,
    question varchar(50) not null,
    question_description varchar(50),
    question_code_block varchar(50),
    tags varchar(50),
    post_id varchar(50) not null,
    user_id int not null,
    PRIMARY KEY(question_id),
    UNIQUE KEY (post_id),
    FOREIGN KEY(user_id) REFERENCES registration(user_id)
)`;

let answer = `CREATE TABLE if not exists answer(
    answer_id int auto_increment,
    answer varchar(50) not null,
    answer_code_block varchar(50),
    user_id int not null,
    question_id int not null,
    PRIMARY KEY(answer_id),
    FOREIGN KEY(user_id) REFERENCES registration(user_id),
    FOREIGN KEY(question_id) REFERENCES question(question_id)
    )`;

pool.query(registration, (err, results) => {
  if (err) throw err;
  console.log("Registration Table Created");
});
pool.query(profile, (err, results) => {
  if (err) throw err;
  console.log("Profile Table Created");
});
pool.query(question, (err, results) => {
  if (err) throw err;
  console.log("Question Table Created");
});
pool.query(answer, (err, results) => {
  if (err) throw err;
  console.log("Answer Table Created");
});
module.exports = pool;
