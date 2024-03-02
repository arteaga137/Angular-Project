const Film = require("../models/film.model");

async function findAll(req, res) {
  try {
    const films = await Film.find();
    return res.json(films);
  } catch (error) {
    return res.status(500).json({ msg: "Movie not found" });
  }
}

async function insert(req, res) {
  try {
    const newFilm = new Film({
      title: req.body.title,
      synopsys: req.body.synopsys,
      director: req.body.director,
      year: req.body.year,
      category: req.body.category,
    });

    await newFilm.save();
    return res.json({ msg: "Movie Created" });
  } catch (error) {
    return res.status(500).json({ msg: "Error: Movie Not Saved" });
  }
}

async function deleteOne(req, res) {
  try {
    await Film.findByIdAndDelete(req.params.id);
    return res.json({ msg: "Movie Deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error: Movie Cannot Be Deleted" });
  }
}

module.exports = { findAll, insert, deleteOne };
