import React, { useState } from 'react';
import { Container, VStack, Input, Button, Box, Heading, Text } from '@chakra-ui/react';

const DepartmentForm = () => {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState('');
  const [manager, setManager] = useState('');

  const handleAddDepartment = () => {
    if (!name || !manager) {
      alert('All fields are required');
      return;
    }
    const newDepartment = { id: Date.now(), name, manager };
    setDepartments([...departments, newDepartment]);
    setName('');
    setManager('');
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl">Department Management</Heading>
        <Box w="100%">
          <VStack spacing={4}>
            <Input placeholder="Department Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Manager" value={manager} onChange={(e) => setManager(e.target.value)} />
            <Button colorScheme="teal" onClick={handleAddDepartment}>Add Department</Button>
          </VStack>
        </Box>
        <Box w="100%">
          <Heading as="h2" size="lg" mb={4}>Departments</Heading>
          {departments.length === 0 ? (
            <Text>No departments yet</Text>
          ) : (
            departments.map(department => (
              <Box key={department.id} p={5} shadow="md" borderWidth="1px" borderRadius="md" mb={4}>
                <Text fontSize="xl">{department.name}</Text>
                <Text>Manager: {department.manager}</Text>
              </Box>
            ))
          )}
        </Box>
      </VStack>
    </Container>
  );
};

export default DepartmentForm;