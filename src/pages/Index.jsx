import React from "react";
import { Container, VStack, Heading, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl">
          Worker Management App
        </Heading>
        <Button as={Link} to="/departments" colorScheme="teal" size="lg">
          Manage Departments
        </Button>
        <Button as={Link} to="/workers" colorScheme="teal" size="lg">
          Manage Workers
        </Button>
        <Button as={Link} to="/objects" colorScheme="teal" size="lg">
          Manage Objects
        </Button>
        <Button as={Link} to="/vehicles" colorScheme="teal" size="lg">
          Manage Vehicles
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;