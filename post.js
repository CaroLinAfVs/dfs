
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
  return result.rows;
};
const addLike = async (id) => {
  const post = await getPostById(id);
  if (!post) {
    throw new Error('post not found');
  }

  let newLikes;
  if (post.likes && post.likes > 0) {
    newLikes = 0;
  } else {
    newLikes = 1;
  }

  const consulta = 'UPDATE posts SET likes = $1 WHERE id = $2';
  const valores = [newLikes, id];

  const result = await pool.query(consulta, valores);
  console.log(result)

  return result;
}
const deletePost = async (id) => {
  const consulta = "DELETE FROM posts WHERE id = $1"
  const values = [id]
  const result = await pool.query(consulta, values)
}
const getPostById = async (id) => {
  const consulta = 'SELECT * FROM posts WHERE id = $1';
  const valores = [id];
  const { rows } = await pool.query(consulta, valores);

  if (rows.length === 0) {
    return null
  }
  

  return rows[0];
}
module.exports = { addPost, getPost, addLike, deletePost }