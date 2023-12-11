const client = require("../service/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  const query = `SELECT * FROM app.users WHERE name = '${username}' `;
  client.query(query, (err, queryResult) => {
    if (!err && queryResult.rows.length > 0) {
      let storedHashedPassword = queryResult.rows[0].password;
      let plainPassword = password;
      bcrypt
        .compare(plainPassword, storedHashedPassword)
        .then((match) => {
          if (match) {
            const token = jwt.sign(
              {
                username: username,
                userId: queryResult.rows[0].id,
              },
              process.env.JWT_PRIVATE_KEY,
              { expiresIn: "1h" }
            );
            res.status(200).json({
              token: token,
              username: username,
              userId: queryResult.rows[0].id,
            });
          } else {
            res.status(500).json({
              error: "Incorrect password",
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      if (queryResult.rows.length === 0) {
        res.status(500).json({
          error: "User does not exist",
        });
      } else {
        res.status(500).json({
          error: "An error occurred while fetching users.",
        });
      }
    }

    // client.end();
  });
};
