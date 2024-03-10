import React from "react";
import {
  Flex,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
} from "@chakra-ui/react";
import Login from "../../components/Auth/Login";
import SignUp from "../../components/Auth/SignUp";

const HomePage = () => {
  return (
    <Flex
      justifyContent="center"
      flexDirection={{ base: "column", lg: "row " }}
    >
      <Box
        flex="1"
        backgroundImage="url('/assets/background.jpg')"
        backgroundSize="contain" // Adjust as necessary
        backgroundPosition="left"
        width="100%"
        height="100vh"
        backgroundRepeat="no-repeat"
        order={{ base: "2", lg: "1" }}
      ></Box>
      <Box flex="1" order={{ base: "1", lg: "2" }}>
        <Box
          d="flex"
          p="10px 100px"
          bg={"white"}
          w="80%"
          m="40px 300px 15px 0"
          borderRadius="lg"
          borderWidth="1px"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize="4xl" textAlign="center" fontFamily="Work Sans">
            Supp
          </Text>
        </Box>
        <Box
          d="flex"
          p="10px"
          bg={"white"}
          w="80%"
          m="40px 300px 15px 0"
          borderRadius="lg"
          borderWidth="1px"
          justifyContent="center"
          alignItems="center"
        >
          <Tabs variant="soft-rounded">
            <TabList>
              <Tab width="50%">Login</Tab>
              <Tab width="50%">Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <SignUp />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Flex>
  );
};

export default HomePage;
