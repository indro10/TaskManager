const express = require("express");

require("dotenv").config();
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Task Manager applicaiton!");
});
const logoutRouter = require("./routes/logout");
app.use("/api/logout", logoutRouter);

const loginRouter = require("./routes/login");
app.use("/api/login", loginRouter);
const signUpRouter = require("./routes/signup");
app.use("/api/signup", signUpRouter);
const refreshTokenRouter = require("./routes/refresh");
app.use("/api/refresh", refreshTokenRouter);
const taskRouter = require("./routes/tasks");
app.use("/api/tasks", taskRouter);
console.log(process.env.SECRET_KEY);
app.listen(port, () => {
  console.log(`TaskManager app listening on port ${port}`);
});
