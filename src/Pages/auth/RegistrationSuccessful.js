import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const RegistrationSuccessful = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const name = params.get("name");
  const email = params.get("email");

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="#F5F7F8"
      p="1rem"
      minH="100vh"
    >
      <Box
        bg="white"
        p="2rem"
        borderRadius="6px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        w="48%"
        textAlign="center"
      >
        <Image src="/assets/checkMark.png" w="40%"></Image>
        <Text fontSize="3xl" as="b" color="#3C0753">
          Email Verification
        </Text>
        <Text fontSize="xl" mt="1rem">
          {name}, Thank you for registering with us!
        </Text>
        <Text fontSize="xl" mt="1rem">
          We've sent an email to verify your account. Please check your inbox
          and follow the instructions to complete the verification process
        </Text>
        <Text fontSize="xl" mt="1rem">
          Didn't receive mail?{" "}
          <span style={{ color: "#3C0753", cursor: "pointer" }}>Resend</span>
        </Text>
      </Box>
    </Box>
  );
};

export default RegistrationSuccessful;
