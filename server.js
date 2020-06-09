const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "",
    password: "",
    database: "face_recognition"
  }
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// HOME
app.get("/", (req, res) => {
  res.send(database.users);
});

// SIGNIN
app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, bcrypt, db);
});

// REGISTER
app.post("/register", (req, res) => {
  register.handleRegister(req, res, bcrypt, db);
});

// PROFILE
app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db);
});

// IMAGE
app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});
app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(3000, () => console.log("Running on port 3000"));
