import express from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/register", (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  bcrypt
    .genSalt(10)
    .then((salt) => {
      return bcrypt.hash(password, salt);
    })
    .then((hashedPassword) => {
      const newUser = new User({
        email,
        password: hashedPassword,
        firstName,
        lastName,
      });

      return newUser.save();
    })
    .then(() => {
      res.status(201).json({ message: "Account Created" });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send("Error registering user");
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email })
    .then((user_account) => {
      console.log(user_account)
      if (!user_account) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      bcrypt
        .compare(password, user_account.password)
        .then((isMatch) => {
          if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
          }

          return res.status(200).json({ message: "Login Successful" });
        })
        .catch((error) => {
          console.error("Error during password comparison: ", error);
          return res.status(500).json({ error: "Server error" });
        });
    })
    .catch((error) => {
      console.error("Error during login: ", error);
      return res.status(500).json({ error: "Server error" });
    });
});

router.get("/search", (req, res) => {
  let filters = {};
  if (req.query.first_Name) {
    filters.first_name = req.body.first_Name;
  }
  if (req.query.last_Name) {
    filters.last_name = req.body.last_Name;
  }
  if (req.query.email) {
    filters.email = req.body.email;
  }
  User.find(filters)
    .then((results) => {
      res.json(results);
    })
    .catch((error) => {
      console.error("Error Finding Users. Error: ", error);
      return res.status(500).json({ error: "Server error" });
    });
});

router.get("/profile/:user_id", (req, res) => {
  User.findById(req.params.user_id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    });
});

export default router;
