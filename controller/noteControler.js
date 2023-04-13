const Note = require("../models/notesModal");

exports.addnote = async (req, res) => {
  // console.log(req.body.subject,req.body.note,req.body.imp_note)
  try {
    const data = await new Note({
      subject: req.body.subject,
      note: req.body.note,
      noteby: req.user,
      imp_note: req.body.imp_note,
    }).save();
    res.status(201).json({ message: data });
  } catch (e) {
    console.log(e);
  }
};

exports.getallnotes = async (req, res) => {
  try {
    const data = await Note.find({
      noteby: req.user,
    });
    res.status(201).json({ message: data });
  } catch (e) {
    console.log(e);
  }
};

exports.deletenotes = async (req, res) => {
  const deleteNote = await Note.findByIdAndRemove({ _id: req.params.id });
  res.status(200).json({ message: "deleted sucessfully" });
};
exports.updatenotes = async (req, res) => {
  try {
    const updateNote = await Note.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          subject: req.body.subject,
          note: req.body.note,
          noteby: req.user,
          imp_note: req.body.imp_note,
        },
      }
    );
    res.status(200).json({ message: "updated sucessfully" });
  } catch (e) {
    res.status(400).json({ message: "please fill all the fields" });
  }
};

exports.findbysubject = async (req, res) => {
  try {
    const findnote = await Note.find({ subject: req.params.subject,noteby: req.user });
    return res.status(200).json({ message: findnote });
  } catch (e) {
    res.staus(404).json({ error: " Note not found" });
  }
};

exports.findImp_note = async (req, res) => {
  try {
    const impNote = await Note.find({
      imp_note: true,
        noteby: req.user,
    });
    return res.status(200).json({ message: impNote });
  } catch (e) {
    res.staus(404).json({ error: " Note not found" });
  }
};
