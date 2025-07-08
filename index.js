const express = require("express");
const Joi = require("joi");
const app = express();

app.use(express.json());

let courses = [
  { id: 1, title: "angular" },
  { id: 2, title: "java" },
  { id: 3, title: "asd" },
];
app.get("/", (req, res) => {
  res.send("hello bright coding ");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.post("/api/courses", (req, res) => {
  const schema = Joi.object({
    title: Joi.string().alphanum().min(3).max(100).required(),
  });


   const {error, value} =schema.validate(req.body)

if (error) {
       return res.status(400).send(error.details[0].message);

}



  const course = {
    id: courses.length + 1,
    title: value.title,
  };
  courses.push(course);

  res.send(course);
});

app.get("/api/courses/:id", (req, res) => {
  let course = courses.find((course) => course.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("course not found ");
  } else {
    res.send(course);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`the app is listening to port ${port}`);
});
