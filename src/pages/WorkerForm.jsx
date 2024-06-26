import React, { useState } from 'react';
import { Container, VStack, Input, Button, Box, Heading, Text } from '@chakra-ui/react';

const WorkerForm = () => {
  const [workers, setWorkers] = useState([]);
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');

  const handleAddWorker = () => {
    if (!name || !department || !position) {
      alert('All fields are required');
      return;
    }
    const newWorker = { id: Date.now(), name, department, position };
    setWorkers([...workers, newWorker]);
    setName('');
    setDepartment('');
    setPosition('');
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl">Worker Management</Heading>
        <Box w="100%">
          <VStack spacing={4}>
            <Input placeholder="Worker Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} />
            <Input placeholder="Position" value={position} onChange={(e) => setPosition(e.target.value)} />
            <Button colorScheme="teal" onClick={handleAddWorker}>Add Worker</Button>
          </VStack>
        </Box>
        <Box w="100%">
          <Heading as="h2" size="lg" mb={4}>Workers</Heading>
          {workers.length === 0 ? (
            <Text>No workers yet</Text>
          ) : (
            workers.map(worker => (
              <Box key={worker.id} p={5} shadow="md" borderWidth="1px" borderRadius="md" mb={4}>
                <Text fontSize="xl">{worker.name}</Text>
                <Text>Department: {worker.department}</Text>
                <Text>Position: {worker.position}</Text>
              </Box>
            ))
          )}
        </Box>
      </VStack>
    </Container>
  );
};

export default WorkerForm;