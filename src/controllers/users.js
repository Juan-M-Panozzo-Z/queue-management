import Users from "../models/Users";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.find().select("-password");
    users == 0
      ? res.status(404).json({ message: "No hay usuarios" })
      : res.json(users);
  } catch (err) {
    res.send({
      message: "Ocurrió un error al obtener los usuarios, reintente",
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    res.json(user.name);
  } catch (err) {
    res.send({
      message: "Ocurrió un error al obtener el usuario, reintente",
    });
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    const user = new Users({
      name,
      password,
    });
    await user
      .save()
      .then((user) => {
        console.log(`Usuario ${user.name} creado`);
        res.send({
          message: `Usuario ${user.name} creado`,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    res.send({
      message: "Ocurrió un error al crear el usuario, reintente",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userDeleted = await Users.findByIdAndDelete(req.params.id)
      .then((user) => {
        res.send(`Usuario ${user.name} eliminado`);
      })
      .catch((err) => {
        res.send({
          message: "Ocurrió un error al eliminar el usuario, reintente",
        });
      });
  } catch (err) {
    res.send({
      message: "Ocurrió un error al eliminar el usuario, reintente",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { password } = req.body;
    const userUpdated = await Users.findByIdAndUpdate(
      req.params.id,
      {
        password,
      },
      { new: true }
    );
    console.log(`Usuario ${userUpdated.name} actualizado`);
    res.send({
      message: `Usuario ${userUpdated.name} actualizado`,
    });
  } catch (err) {
    res.send({
      message: "Ocurrió un error al actualizar el usuario, reintente",
    });
  }
};

