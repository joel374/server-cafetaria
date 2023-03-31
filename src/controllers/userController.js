const { signToken } = require("../lib/jwt");
const db = require("../models");

const userController = {
  loginUser: async (req, res) => {
    try {
      const { username, email } = req.body;

      const findUserByEmail = await db.User.findOne({
        where: {
          email: email,
        },
      });

      if (!findUserByEmail) {
        const newUser = await db.User.create({
          username,
          email,
        });

        const token = signToken({
          id: newUser.id,
        });

        return res.status(201).json({
          message: "User registered",
          data: newUser,
          token: token,
        });
      }

      const token = signToken({
        id: findUserByEmail.id,
      });

      return res.status(200).json({
        message: "Login User",
        data: findUserByEmail,
        token: token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error" });
    }
  },
  refreshToken: async (req, res) => {
    try {
      const findUserById = await db.User.findByPk(req.user.id);

      const renewedToken = signToken({
        id: req.user.id,
      });

      return res.status(200).json({
        message: "Renewed user token",
        data: findUserById,
        token: renewedToken,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
};

module.exports = userController;
