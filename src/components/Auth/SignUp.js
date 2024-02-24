import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  VStack,
  StackDivider,
  InputGroup,
  Input,
  Button,
  InputRightElement,
} from "@chakra-ui/react";

const SignUp = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    pic: "",
  });
  const [show, setShow] = useState(false);

  const submitHandler = () => {};

  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      align="stretch"
    >
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) =>
            setUserDetails((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) =>
            setUserDetails((prev) => ({ ...prev, email: e.target.value }))
          }
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) =>
              setUserDetails((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => setShow((prev) => !prev)}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Upload Your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          placeholder="Enter Your Email"
          onChange={(e) =>
            setUserDetails((prev) => ({ ...prev, email: e.target.files[0] }))
          }
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
