import { Checkbox } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { RiDeleteBin5Line } from "react-icons/ri";
import { CgMaximizeAlt } from "react-icons/cg";
import { IoMdSave } from "react-icons/io";
import { Formik } from "formik";
import * as Yup from "yup";
export default function TaskListitem({
  taskInfo,
  onTaskView,
  onTaskDelete,
  onTaskEdit,
  onTaskModification,
}) {
  const [isCompleted, setIsCompleted] = useState(taskInfo.isCompleted);
  const isEdited = (val1, val2) => {
    return !val1 === val2;
  };
  const handleChangeTaskStatus = (event) => {
    const checkedValue = event.target.checked;
    setIsCompleted(checkedValue);
    if (checkedValue !== taskInfo.isCompleted) {
      onTaskModification({ ...taskInfo, isCompleted: checkedValue });
    }
  };

  const handleTitleOnBlur = (event) => {
    if (event.target.value !== taskInfo.title) {
      onTaskModification({ ...taskInfo, title: event.target.value });
    }
  };

  const handleSave = (value) => {
    if (taskInfo.title !== value.title) {
      onTaskModification({ ...taskInfo, title: value.title });
    }
  };
  const Schema = Yup.object().shape({
    title: Yup.string().required(),
  });
  return (
    <Container>
      <Checkdiv>
        <Checkbox
          checked={isCompleted}
          onChange={handleChangeTaskStatus}
          color="success"
        />
      </Checkdiv>
      {/* <Wrapper> */}
      <Formik
        enableReinitialize={true}
        validationSchema={Schema}
        initialValues={{
          title: taskInfo.title ? taskInfo.title : "",
        }}
        onSubmit={handleSave}
      >
        {({ handleSubmit, handleChange, values }) => {
          return (
            <>
              <Title
                placeholder="Enter title"
                onBlur={handleTitleOnBlur}
                // onChange={(event) => {
                //   setTitleContent(event.target.value);
                // }}
                onChange={handleChange("title")}
                // readOnly={titleDisabled}
                value={values.title}
                maxLength={30}
                type="text"
              />
              {/* </Wrapper> */}
              <SaveContainer onClick={handleSubmit}>
                <IoMdSave color="white" size={25} />
              </SaveContainer>
            </>
          );
        }}
      </Formik>
      <Maxcontainer
        onClick={() => {
          onTaskView(taskInfo.id);
        }}
      >
        <CgMaximizeAlt size={25} />
      </Maxcontainer>
      <DeleteDiv
        color="white"
        onClick={() => {
          onTaskDelete(taskInfo.id);
        }}
      >
        <RiDeleteBin5Line color="white" size={25} />
      </DeleteDiv>
    </Container>
  );
}
const SaveContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 5px;
  background-color: lightgreen;
`;
const Maxcontainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 5px;
  background-color: blanchedalmond;
`;
const DeleteDiv = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-radius: 5px;
  background-color: rgb(191, 97, 92);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const Container = styled.div`
  background-color: white;
  width: 50%;
  min-width: 350px;
  padding: 5px;
  display: flex;
  flex-direction: row;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  /* border: 1px solid black; */
  flex: 1;
  border-radius: 10px;
  margin: 10px;
`;
const Title = styled.input`
  min-width: 50px;
  flex: 1;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  height: 30px;
  border-radius: 10px;
  border: none;
  /* box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px; */
  margin: 5px;
`;
const Desciption = styled.textarea`
  flex: 1;
  padding: 5px;
  resize: none;
  color: grey;
  margin: 5px;
  border: none;

  border-radius: 10px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
`;
const Checkdiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
