const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("../config/db");
const Joi = require("joi");

exports.get_profile = async (req, res) => {
  const user_id = req.user.id;
  try {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [
      user_id,
    ]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.get_all_users = async (req, res) => {
  if (req.user.is_admin) {
    try {
      const result = await pool.query(`SELECT * FROM users`);
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(403).json({ error: "Forbidden" });
  }
};

exports.delete_user = async (req, res) => {
  const del_id = req.body.id;
  if (req.user.is_admin) {
    try {
      await pool.query(`DELETE FROM users WHERE id = $1`, [del_id]);
      res.json({ message: "User deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(403).json({ error: "Forbidden" });
  }
};
