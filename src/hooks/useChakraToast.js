import { useToast } from "@chakra-ui/react";

const useChakraToast = () => {
  const toast = useToast();

  return ({ title, status }) =>
    toast({
      title: title,
      status: status,
      duration: 5000,
      isClosable: true,
    });
};

export default useChakraToast;
