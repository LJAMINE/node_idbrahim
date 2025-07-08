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
  const { error, value } = validateCourse(req.body);

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

app.put("/api/courses/:id", (req, res) => {
  let course = courses.find((course) => course.id === parseInt(req.params.id));

  if (!course) {
    res.status(404).send("course not found ");
  }

  const { error, value } = validateCourse(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
  }

  course.title = value.title;

  res.send(course);
});



app.delete('/api/courses/:id',(req,res) => {
  let course = courses.find((course) => course.id === parseInt(req.params.id));
  
  if (!course) {
    return  res.status(404).send("course not found ");
  }

  const index=courses.indexOf(course)

  courses.splice(index,1)

  res.status(204).send({})
}
)


app.get("/api/courses/:id", (req, res) => {
  let course = courses.find((course) => course.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("course not found ");
  } else {
    res.send(course);
  }
});

function validateCourse(course) {
  const schema = Joi.object({
    title: Joi.string().alphanum().min(3).max(10).required(),
  });

  return schema.validate(course);
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`the app is listening to port ${port}`);
});
