const pool = require("./pool");
const bcrypt = require("bcryptjs");

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

module.exports = {
  registerUser,
};
