const client = require("../service/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getUsers = (req, res, next) => {
  client.query(`SELECT id, name, email FROM app.users`, (err, queryResult) => {
    if (!err) {
      res.status(200).json({
        users: queryResult.rows,
      });
    } else {
      res.status(500).json({
        error: "An error occurred while fetching users.",
      });
    }
  });
};

exports.createUser = (req, res, next) => {
  const username = req.body.username;
  const userExist = `SELECT * FROM app.users WHERE name = '${username}' `;

  client.query(userExist, (err, queryResult) => {
    if (!err && queryResult.rows.length > 0) {
      res.status(500).json({
        error: "User already exist",
      });
    } else {
      const email = req.body.email;
      let password = req.body.password;
      const currentDate = new Date();
      // Convert the current date to a string in the desired format (YYYY-MM-DD HH:MM:SS)
      const created_date = currentDate
        .toISOString()
        .replace("T", " ")
        .slice(0, 19)
        .toString();

      bcrypt.hash(password, 12).then((hashedPw) => {
        const query = `INSERT INTO app.users (name, email, password, created_date) VALUES ('${username}','${email}','${hashedPw}','${created_date}');`;
        client.query(query, (err, queryResult) => {
          if (!err) {
            res.status(201).json({
              message: "User created succesfully",
            });
          } else {
            console.log(err.message);

            res.status(500).json({
              error: "An error occurred while fetching users.",
            });
          }
        });
      });
    }
  });
};

exports.getUser = (req, res, next) => {
  const userId = req.params.id;

  const query = `SELECT id,name,email,created_date FROM app.users WHERE id = '${userId}' `;

  console.log(query);
  client.query(query, (err, queryResult) => {
    if (!err) {
      res.status(200).json({
        user: queryResult.rows,
      });
    } else {
      res.status(500).json({
        error: `An error occurred while fetching users: ${err.message}`,
      });
    }
  });
};
