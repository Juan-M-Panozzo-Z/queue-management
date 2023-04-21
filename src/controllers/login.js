import bcrypt from "bcryptjs";
import Users from "../models/Users";

export const register = async (req, res) => {
  console.log(`register: ${req.body.username} ${req.body.password}`);
  const { username, password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      res.status(500).json({ message: err });
    } else {
      const user = new Users({
        username,
        password: hash,
      });
      user
        .save()
        .then((result) => {
          res.status(201).json({ message: "Usuario creado" });
        })
        .catch((err) => {
          res.status(500).json({ message: err });
        });
    }
  });
};

export const login = async (req, res) => {
  console.log(`login: ${req.body.username} ${req.body.password}`);
  const { username, password } = req.body;
  const user = await Users.findOne({ username })
    .then((user) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          req.session.user = user;
          res.redirect("/ventanilla");
        } else {
          res.status(401).json({ message: "Usuario o contraseña incorrectos" });
        }
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

export const logout = async (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};
