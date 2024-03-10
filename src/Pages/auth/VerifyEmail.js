import React, { useEffect, useState } from "react";
import { Box, Text, Image, Button } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { authService } from "../../services/authService";
import useChakraToast from "../../hooks/useChakraToast";

const VerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const token = params.get("token");
  const toast = useChakraToast();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        setLoading(true);
        const { data } = await authService.verifyUser(token);
        toast({
          title: data?.message,
          status: "success",
        });
        setResult("success");
      } catch (error) {
        toast({
          title: error?.response?.data?.message,
          status: "warning",
        });
        setResult("warning");
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, [token]);

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
        {loading ? (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <div class="loader"></div>
            <Text fontSize="3xl" mt="1rem" color="#3C0753">
              Verifying...
            </Text>
          </Box>
        ) : result === "success" ? (
          <>
            <Image src="/assets/verified.png" w="40%"></Image>
            <Text fontSize="3xl" as="b" color="#3C0753">
              Verified
            </Text>
            <Text fontSize="xl" mt="1rem">
              Your email address was successfully verified!
            </Text>
            <Link to="/">
              <Button bg="#3C0753" size="lg" mt="1rem" color="white">
                Login
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Image src="/assets/unverified.png" w="40%"></Image>
            <Text fontSize="3xl" as="b" color="#3C0753" mt="2rem">
              Email Verification Failed
            </Text>
            <Text fontSize="xl" mt="1rem">
              Please request a new verification link.
            </Text>
          </>
        )}
      </Box>
    </Box>
  );
};

export default VerifyEmail;
