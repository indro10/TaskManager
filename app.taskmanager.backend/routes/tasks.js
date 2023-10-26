const express = require("express");
const router = express.Router();
const authVerification = require("../middlewares/auth");
const { getAccessToken } = require("../resources/AccessToken");
const { getTasks, setTasks } = require("../resources/Tasks");
const generateUniqueId = require("generate-unique-id");
const Joi = require("joi");

//Get all task
router.get("/", authVerification, (req, res) => {
  try {
    const allTask = getTasks();
    res.send(allTask);
  } catch (error) {
    res.send(error.message);
  }
});

//Get 1 task
router.get("/:id", authVerification, (req, res) => {
  try {
    const Tasks = getTasks();
    const task = Tasks.find((task) => task.id === req.params.id);
    if (!task) {
      res.status(404).send("No task found!");
      return;
    } else {
      res.send(task);
    }
  } catch (error) {
    res.send(error.message);
  }
});
//Add a task;
router.post("/addTask", authVerification, (req, res) => {
  //validate the  task;

  const taskSchema = Joi.object({
    id: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().empty(),
    isCompleted: Joi.boolean().required(),
    createdBy: Joi.string().required(),
  });

  const result = taskSchema.validate(req.body);
  if (result.error) {
    res.status(400).send("Bad request");
  }

  // console.log(req);
  if (!req.body.title) {
    res.status(400).send("Bad request");
  }
  const Task = {
    id: generateUniqueId(),
    title: req.body.title,
    description: req.body.description,
    isCompleted: req.body.isCompleted,
    createdBy: req.body.createdBy,
  };
  const Tasks = getTasks();
  const newTasks = [...Tasks, Task];
  setTasks(newTasks);
  res.status(201).send(Task);
});
//modify a task
router.put("/updateTask/:id", authVerification, (req, res) => {
  const taskSchema = Joi.object({
    id: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().empty(),
    isCompleted: Joi.boolean().required(),
    createdBy: Joi.string().required(),
  });

  const result = taskSchema.validate(req.body);
  if (result.error) {
    res.status(400).send("Bad request");
  }

  const newTask = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    isCompleted: req.body.isCompleted,
    createdBy: req.body.createdBy,
  };

  const allTasKs = getTasks();
  const task = allTasKs.find((task) => task.id == req.params.id);
  if (!task) {
    res.status(404).send("Bad request");
  }
  const index = allTasKs.indexOf(task);
  allTasKs[index] = newTask;
  setTasks(allTasKs);
  res.status(200).send(newTask);
});

//delete a task
router.delete("/deleteTask/:id", authVerification, (req, res) => {
  //validate the req
  //find the task or the index that needs to be deleted,
  const allTask = getTasks();
  const index = getTasks().findIndex((task) => task.id === req.params.id);
  if (index == -1) {
    res.status(404).send("No Task found wiht the id");
    return;
  }
  //delete the task
  allTask.splice(index, 1);
  //update the task Array
  setTasks(allTask);
  res.json(allTask);
});

module.exports = router;
