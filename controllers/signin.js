const handleSignin = (req, res, bcrypt, db) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("Du har glömt att fylla i något!");
  }
  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then(user => {
            res.json(user[0]);
          })
          .catch(err => res.status(400).json("Kan inte hitta användaren"));
      } else {
        res
          .status(400)
          .json("Något har gått snett, kolla dina inloggningsuppgifter!");
      }
    })
    .catch(err => res.status(400).json("Kolla dina inloggningsuppgifter!"));
};

module.exports = { handleSignin };
