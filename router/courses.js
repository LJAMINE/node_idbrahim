const express= require("express")

const router=express.Router();


let courses = [
  { id: 1, title: "angular" },
  { id: 2, title: "java" },
  { id: 3, title: "asd" },
];





router.get("/", (req, res) => {
  res.send(courses);
});

router.post("/", (req, res) => {
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

router.put("/:id", (req, res) => {
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



router.delete('/:id',(req,res) => {
  let course = courses.find((course) => course.id === parseInt(req.params.id));
  
  if (!course) {
    return  res.status(404).send("course not found ");
  }

  const index=courses.indexOf(course)

  courses.splice(index,1)

  res.status(204).send({})
}
)


router.get("/:id", (req, res) => {
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


module.exports=router;