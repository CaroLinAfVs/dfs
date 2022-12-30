
const { Pool } = require("pg");
require("dotenv").config({ path: "./.env" });

const credenciales = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  allowExitOnIdle: true,
};

console.log(credenciales);

const pool = new Pool(credenciales);

const addPost = async (titulo, url, descripcion) => {
    const query = "INSERT INTO posts VALUES (DEFAULT, $1, $2, $3)RETURNING *";
    const values = [titulo, url, descripcion];
    const result = await pool.query(query, values);
    console.log("¡Post agregado!");
    
  };

const getPost = async () => {
    const result = await pool.query("SELECT * FROM posts")
    console.log(result.rows)
    return result.rows;
};
module.exports = {addPost, getPost}