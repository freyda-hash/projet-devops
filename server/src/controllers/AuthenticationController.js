const { User } = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const crypto = require("crypto");

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK,
  });
}

module.exports = {
  async register(req, res) {
    try {
      req.body.userType = "Customer";

      if (req.body.userType == "Admin") {
        req.body.priority = 1;
      } else {
        req.body.priority = 2;
      }
      req.body.profileImage =
        "http://localhost:8084/public/user-image/default-man.png";
      const user = await User.create(req.body);

      return res.send({ id: user.id });
    } catch (err) {
      return res.status(400).send({
        error: "This account is already in use.",
      });
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        return res.status(403).send({
          error: "Incorrect login information.",
        });
      }

      const correctPassword = password === user.password;
      if (!correctPassword) {
        return res.status(403).send({
          error: "Incorrect login information.",
        });
      }
      const newUser = {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType,
        profileImage: user.profileImage,
        priority: user.priority,
      };
      res.send({
        user: newUser,
        token: jwtSignUser(newUser),
      });
    } catch (err) {
      res.status(500).send({
        error: "An error occured when trying to sign in.",
      });
    }
  },

  async verifyPassword(req, res) {
    try {
      const correctPassword = req.params.password === req.user.password;
      if (!correctPassword) {
        return res.status(403).send({
          error: "incorrect current password.",
        });
      }
      res.send({ correctPassword: correctPassword });
    } catch (error) {
      res.status(500).send({
        error: "An error occured when verifying the password",
      });
    }
  },
  async updatePassword(req, res) {
    try {
      const user = await User.update(req.body, {
        where: {
          id: req.user.id,
        },
      });
      res.send(user);
    } catch (err) {
      res.status(500).send({
        error: "An error occured when trying to update the password",
      });
    }
  },
  async requestPasswordToken(req, res) {
    try {
      var buf = crypto.randomBytes(20);
      var token = buf.toString("hex");
      const user = { email: req.body.email, resetPasswordToken: token };
      await User.update(user, {
        where: {
          email: user.email,
        },
      });
      res.send(token);
    } catch (err) {
      res.status(500).send({
        error: "An error occured when trying to request password token.",
      });
    }
  },
  async verifyPasswordToken(req, res) {
    try {
      const user = await User.findOne({
        where: {
          resetPasswordToken: req.params.token,
        },
        attributes: [
          "id",
          "username",
          "firstName",
          "lastName",
          "profileImage",
          "email",
          "userType",
          "priority",
        ],
      });
      if (!user) {
        return res.status(403).send({
          error: "invalid token.",
        });
      }
      res.send(user);
    } catch (err) {
      return res.status(500).send({
        error: "An error occured when verifying the password reset token.",
      });
    }
  },

  async resetPassword(req, res) {
    try {
      const user = { password: req.body.password, resetPasswordToken: "" };
      const userId = req.body.id;
      await User.update(user, {
        where: {
          id: userId,
        },
      });

      res.send(userId);
    } catch (err) {
      res.status(500).send({
        error: "An error occured when trying to reset password.",
      });
    }
  },
};
