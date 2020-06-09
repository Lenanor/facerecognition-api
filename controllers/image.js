require("dotenv").config();
const Clarifai = require("clarifai");
const clarifaiApiKey = process.env.API_KEY;

const app = new Clarifai.App({
  apiKey: clarifaiApiKey,
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Api:et svarar ej."));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => res.json(entries[0]))
    .catch((err) => res.status(400).json("Ett fel uppstod :("));
};

module.exports = { handleImage, handleApiCall };
