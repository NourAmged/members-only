const pool = require("./pool");
const bcrypt = require("bcryptjs");

async function getUserByUsername(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);

  return rows[0];
}

async function getUserById(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

  return rows[0];
}

async function registerUser({ fullname, username, password }) {
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await pool.query(
      `INSERT INTO users (fullname, username, password)
       VALUES ($1, $2, $3) `,
      [fullname, username, hashedPassword],
    );
  } catch (error) {
    if (error.code === "23505") {
      throw new Error("username already in use");
    }

    throw error;
  }
}

async function addContent({ title, content }, userid) {
  try {
    await pool.query(
      `
      INSERT INTO user_post (user_id, title, content) VALUES ($1, $2, $3);
      `,
      [userid, title, content],
    );
  } catch (error) {
    throw error;
  }
}

async function getAllPosts() {
  const { rows } = await pool.query(
    `SELECT title, content, created_at, fullname, username
     FROM user_post INNER JOIN users ON user_id = id`,
  );
  return rows;
}

module.exports = {
  getUserByUsername,
  getUserById,
  registerUser,
  addContent,
  getAllPosts,
};
