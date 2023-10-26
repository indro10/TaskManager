import React, { useContext, useState, useEffect } from "react";
import TaskListitem from "./TaskListitem";
import styled from "styled-components";
import { Button } from "@mui/material";
import { IoMdAdd } from "react-icons/io";
import ModalContainer from "./ModalContainer";
import Task from "./TaskForm";
import { TaskType } from "../utils/TaskType";
import { AuthContext } from "../context/AuthContextProvider";
import { Navigate } from "react-router-dom";
import axios from "axios";
import {
  addTask,
  deleteTask,
  getAllTask,
  updateTask,
} from "../config/API_config";
import { ErrorContext } from "../context/ErrorContextProvider";
import { LoaderContext } from "../context/LoaderContext";
const getInitialTaskConfig = () => {
  return {
    taskInfo: { title: "", description: "" },
    display: false,
    taskAction: null,
  };
};

export default function TasKManager() {
  const errorContext = useContext(ErrorContext);
  const loaderContext = useContext(LoaderContext);
  const authContext = useContext(AuthContext);
  const isAuthorized = () => {
    return authContext.values.accessToken != false;
  };
  const getAllTasks = () => {
    loaderContext.setLoader("Fetching Task", true);
    axios(getAllTask())
      .then((r) => {
        console.log(r.data);
        const allTasks = r.data.filter(
          (task) => task.createdBy === authContext.values.userInfo.name
        );
        setTaskList(allTasks);
        loaderContext.setLoader("", false);
      })
      .catch((e) => {
        errorContext.setError(e.message, true);
        loaderContext.setLoader("", false);
      });
  };

  const onDeleteTask = (id) => {
    loaderContext.setLoader("Deleting Task", true);
    axios(deleteTask(id))
      .then((r) => {
        getAllTask();
      })
      .catch((e) => {
        errorContext.setError(e.message, true);
        loaderContext.setLoader("", false);
      });
  };
  const [taskList, setTaskList] = useState([]);
  const [currentTaskConfig, setCurrentTaskConfig] = useState(
    getInitialTaskConfig()
  );

  const handleOpenAddTaskContainer = () => {
    setCurrentTaskConfig({
      ...getInitialTaskConfig(),
      display: true,
      taskAction: TaskType.add,
    });
  };
  useEffect(() => {
    if (isAuthorized) {
      getAllTasks();
    }
  }, []);

  const handleAddNewTasktoList = (newTask) => {
    setTaskList([...taskList, newTask]);
    setCurrentTaskConfig({
      taskInfo: null,
      display: false,
      taskAction: null,
    });
  };

  const handleTask = (values) => {
    console.log(currentTaskConfig);
    console.log(values);
    console.log(authContext.values.userInfo.name);
    if (currentTaskConfig.taskAction === TaskType.add) {
      const task = {
        id: values.id,
        title: values.title,
        description: values.description,
        isCompleted: false,
        createdBy: authContext.values.userInfo.name,
      };
      axios(addTask(task))
        .then((r) => {
          getAllTasks();
        })
        .catch((e) => {
          errorContext.setError(e.message, true);
          loaderContext.setLoader("", false);
        });
      // handleAddNewTasktoList();
      // return;
    }
    if (currentTaskConfig.taskAction === TaskType.update) {
      axios(updateTask(values))
        .then((r) => {
          getAllTasks();
        })
        .catch((e) => {
          errorContext.setError(e.message, true);
          loaderContext.setLoader("", false);
        });
    }
  };
  const handleCancelTask = () => {
    setCurrentTaskConfig(getInitialTaskConfig());
  };

  const handleTaskMod = (task) => {
    axios(updateTask(task))
      .then((r) => {
        getAllTasks();
      })
      .catch((e) => {
        errorContext.setError(e.message, true);
        loaderContext.setLoader("", false);
      });
  };

  const handleTaskView = (taskId) => {
    const task = taskList.filter((task) => task.id === taskId)[0];
    // console.log(task);
    setCurrentTaskConfig({
      taskAction: TaskType.update,
      taskInfo: task,
      display: true,
    });
  };
  const handleDeleteTask = (id) => {
    loaderContext.setLoader("Deleting Task", true);
    axios(deleteTask(id))
      .then((r) => {
        getAllTasks();
      })
      .catch((e) => {
        errorContext.setError(e.message, true);
        loaderContext.setLoader("", false);
      });
  };
  return (
    <Container>
      {/* {authContext.values.accessToken ? ( */}
      <>
        {currentTaskConfig.display && (
          <ModalContainer>
            <Task
              taskInfo={currentTaskConfig.taskInfo}
              onSubmit={handleTask}
              onCancel={handleCancelTask}
            />
          </ModalContainer>
        )}
        <AddItemWrapper>
          <Button
            sx={{ backgroundColor: "white", color: "rgb(116, 37, 207)" }}
            onClick={handleOpenAddTaskContainer}
            variant="contained"
            title="Add Item"
            startIcon={<IoMdAdd />}
          >
            Add Item
          </Button>
          {/* <Button
              onClick={getAllTasks}
              variant="contained"
              title="Add Item"
              startIcon={<IoMdAdd />}
            >
              Test
            </Button> */}
        </AddItemWrapper>
        <TaskListWrapper>
          {taskList.map((task) => (
            <TaskListitem
              key={task.id}
              taskInfo={task}
              onTaskModification={handleTaskMod}
              onTaskView={handleTaskView}
              onTaskDelete={handleDeleteTask}
            />
          ))}
        </TaskListWrapper>
      </>
      {/* ) : (
        <Navigate to={"/"} />
      )} */}
    </Container>
  );
}

const TaskListWrapper = styled.div`
  /* border: 1px solid black; */
  margin: 5px;
`;
const AddItemWrapper = styled.div`
  margin: 5px;
`;
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  /* border: 1px solid black; */
  padding: 10px;
`;
