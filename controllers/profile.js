const handleProfile = (req, res, db) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({ id })
    .then(user => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("Användaren kunde inte hittas.");
      }
    })
    .catch(err =>
      res.json("Ett problem uppstod, kunde inte hämta användaren.")
    );
};

module.exports = { handleProfile };
