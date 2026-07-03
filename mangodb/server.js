const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    course: String
});

const Student = mongoose.model("Student", studentSchema);

app.post("/api/students", async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();

        res.json({
            message: "Student Saved Successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "Error saving student"
        });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
