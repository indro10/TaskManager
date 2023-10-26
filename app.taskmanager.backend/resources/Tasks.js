let Tasks = [
  {
    id: "1",
    title: "Task Title-test",
    description: "Task description",
    isCompleted: true,
    createdBy: "username",
  },
];
const setTasks = (TasksOb) => {
  Tasks = TasksOb;
};
const getTasks = () => {
  return Tasks;
};
module.exports.setTasks = setTasks;
module.exports.getTasks = getTasks;
