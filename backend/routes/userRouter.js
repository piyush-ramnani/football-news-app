//---CONFIGURATION---
const express = require("express");
const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const config = require("../config");

router.use(express.json()); // instead of app.use(), we can use router.use()

//---IMPORTS---
const { User } = require("../db/db");
const { userInputValidation } = require("../validation/inputValidation");
const { authMiddleware } = require("../middlewares/auth");

//---USER ROUTES---
router.post("/signup", userInputValidation, async (req, res) => {
  const { firstName, lastName, username, password } = req.userData;

  try {
    const existingUser = await User.findOne({ username: username });

    if (!existingUser) {
      const user = await User.create({
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
      });

      console.log("newUser: ", user);
      return res.status(201).json({ message: "Signed up successfully!" });
    } else {
      return res.status(409).json({ message: "Username already in use." });
    }
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    try {
      const existingUser = await User.findOne({ username: username });
      if (existingUser && password == existingUser.password) {
        const payload = { username: username };
        const token = jwt.sign(payload, config.JWT_SECRET);

        res.json({ token });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (e) {
      res.status(500).json(e);
    }
  }
});

router.put("/profile/update", authMiddleware, async (req, res) => {
  let updateData = req.body;
  //checks if there are any keys
  if (Object.keys(updateData).length === 0) {
    return res.status(400).send({ message: "No data provided" });
  }

  try {
    const username = req.authData;
    const user = await User.findOneAndUpdate({ username }, updateData, {
      new: true,
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Remove the password from the output
    delete user.password;
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});
