const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user.routes");
const filmRoutes = require("./routes/film.routes");

const app = express();

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://arteaga:a1sQsXZT58TZT2eN@cluster0.etrrcnc.mongodb.net/movies"
  )
  .then(() => {
    console.log(`DB Connected Succesfully`);
  })
  .catch((err) => {
    console.log(`Error in DB Connection: ${err}`);
  });

app.use("/api/users", userRoutes);
app.use("/api/films", filmRoutes);

app.listen(3000, () => {
  console.log(`API running... port 3000`);
});
