import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  FormControl,
  FormLabel,
  VStack,
  InputGroup,
  Input,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import useChakraToast from "../../hooks/useChakraToast";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useChakraToast();
  const navigate = useNavigate();

  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        strongPasswordRegex,
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    pic: Yup.mixed().required("Picture is required"),
  });

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);
      const { data } = await authService.registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
        pic: values.pic,
      });
      toast({
        title: "Registration successful",
        status: "success",
      });

      navigate(
        `/registration-successful?name=${values.name}&email=${values.email}`
      );
    } catch (error) {
      toast({
        title: error?.response?.data?.message,
        status: "warning",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const postDetails = async (pic) => {
    if (pic) {
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("file", pic);
        formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
        formData.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        return data.url;
      } catch (error) {
        console.error("Error uploading image: ", error);
        return null;
      } finally {
        setIsLoading(false);
      }
    } else {
      return null;
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        pic: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form>
          <VStack spacing={4} align="stretch">
            <Field name="name">
              {({ field, form }) => (
                <FormControl
                  id="first-name"
                  isInvalid={form.errors.name && form.touched.name}
                >
                  <FormLabel>Name</FormLabel>
                  <Input
                    {...field}
                    placeholder="Enter Your Name"
                    bg="#f4f3ee"
                    border="none"
                  />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="email">
              {({ field, form }) => (
                <FormControl
                  id="email"
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <FormLabel>Email</FormLabel>
                  <Input
                    {...field}
                    placeholder="Enter Your Email"
                    bg="#f4f3ee"
                    border="none"
                  />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field, form }) => (
                <FormControl
                  id="password"
                  isInvalid={form.errors.password && form.touched.password}
                >
                  <FormLabel>Password</FormLabel>
                  <InputGroup size="md">
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter Your Password"
                      bg="#f4f3ee"
                      border="none"
                    />
                  </InputGroup>
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="confirmPassword">
              {({ field, form }) => (
                <FormControl
                  id="confirmpassword"
                  isInvalid={
                    form.errors.confirmPassword && form.touched.confirmPassword
                  }
                >
                  <FormLabel>Confirm Password</FormLabel>
                  <InputGroup size="md">
                    <Input
                      {...field}
                      type="password"
                      placeholder="Confirm Password"
                      bg="#f4f3ee"
                      border="none"
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {form.errors.confirmPassword}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="pic">
              {({ field, form }) => (
                <FormControl
                  id="pic"
                  isInvalid={form.errors.pic && form.touched.pic}
                >
                  <FormLabel>Upload Your Picture</FormLabel>
                  <Input
                    {...field}
                    value={undefined}
                    type="file"
                    p={1.5}
                    placeholder="Upload Your Picture"
                    bg="#f4f3ee"
                    border="none"
                    onChange={async (event) => {
                      const result = await postDetails(event.target.files[0]);
                      setFieldValue("pic", result);
                    }}
                  />
                  <FormErrorMessage>{form.errors.pic}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              colorScheme="blue"
              type="submit"
              width="100%"
              style={{ marginTop: 15 }}
              isLoading={isLoading}
            >
              Sign Up
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default SignUp;
