import { useState } from "react";
import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import useChakraToast from "../../hooks/useChakraToast";
import { authService } from "../../services/authService";

const Login = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useChakraToast();
  const navigate = useNavigate();

  // Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  // Submit Handler
  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const { data } = await authService.loginUser(values);
      toast({
        title: data?.message,
        status: "success",
      });

      localStorage.setItem("userInfo", JSON.stringify(data?.userDetails));
      navigate("/chats");
    } catch (error) {
      console.log(error);
      toast({
        title: error?.response?.data?.message,
        status: "warning",
      });
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const handleClick = () => setShow(!show);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form>
          <VStack spacing="10px">
            <Field name="email">
              {({ field, form }) => (
                <FormControl
                  id="email"
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <FormLabel>Email Address</FormLabel>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Enter Your Email Address"
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
                      type={show ? "text" : "password"}
                      placeholder="Enter password"
                      bg="#f4f3ee"
                      border="none"
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              type="submit"
              colorScheme="blue"
              width="100%"
              style={{ marginTop: 15 }}
              isLoading={loading || isSubmitting}
            >
              Login
            </Button>
            <Button
              type="button"
              variant="solid"
              colorScheme="red"
              width="100%"
              onClick={() => {
                setFieldValue("email", "guest@example.com");
                setFieldValue("password", "123456");
              }}
            >
              Get Guest User Credentials
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
