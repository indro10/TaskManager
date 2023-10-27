import { Button, InputLabel, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";

// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function Task({
  onSubmit = () => {},
  onCancel = () => {},
  taskInfo,
}) {
  const Schema = Yup.object().shape({
    title: Yup.string().required("Required"),
  });
  const handleSubmitForm = (values) => {
    values.id = taskInfo.id ? taskInfo.id : uuid();
    if (taskInfo) {
      if (
        taskInfo.title === values.title &&
        taskInfo.description === values.description
      ) {
        handleCancel();
        console.log(values);

        return;
      }
    }
    onSubmit({ ...taskInfo, ...values });
    handleCancel();
  };
  const handleCancel = () => {
    onCancel();
  };
  return (
    <Formik
      initialValues={{
        title: taskInfo ? taskInfo.title : "",
        description: taskInfo ? taskInfo.description : "",
      }}
      validationSchema={Schema}
      onSubmit={handleSubmitForm}
    >
      {({ handleChange, handleSubmit, values, errors }) => {
        return (
          <Form onSubmit={handleSubmitForm}>
            <Container>
              <ItemContainer>
                <Header>Task Info :-</Header>
              </ItemContainer>
              <ItemContainer>
                <TextField
                  error={errors.title ? true : false}
                  helperText={errors.title}
                  required
                  value={values.title}
                  onChange={(text) => {
                    handleChange("title")(text);
                  }}
                  variant="outlined"
                  label="Title"
                />
              </ItemContainer>
              <ItemContainer>
                <TextField
                  maxRows={5}
                  value={values.description}
                  onChange={handleChange("description")}
                  multiline
                  variant="outlined"
                  label="Description"
                />
              </ItemContainer>
              <Footer>
                <Button
                  style={{ margin: "10px" }}
                  variant="contained"
                  type="submit"
                  title="Submit"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
                <Button
                  type="reset"
                  style={{ margin: "10px" }}
                  variant="contained"
                  title="Cancel"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Footer>
            </Container>
          </Form>
        );
      }}
    </Formik>
  );
}

const Header = styled.div``;
const Container = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ItemContainer = styled.div`
  width: 100%;
  padding: 10px;
`;
const Footer = styled.div`
  padding: 10px;
`;
