import React, { useState } from 'react';
import { Container, VStack, Input, Button, Box, Heading, Text } from '@chakra-ui/react';

const ObjectForm = () => {
  const [objects, setObjects] = useState([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const handleAddObject = () => {
    if (!name || !location) {
      alert('All fields are required');
      return;
    }
    const newObject = { id: Date.now(), name, location };
    setObjects([...objects, newObject]);
    setName('');
    setLocation('');
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl">Object Management</Heading>
        <Box w="100%">
          <VStack spacing={4}>
            <Input placeholder="Object Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
            <Button colorScheme="teal" onClick={handleAddObject}>Add Object</Button>
          </VStack>
        </Box>
        <Box w="100%">
          <Heading as="h2" size="lg" mb={4}>Objects</Heading>
          {objects.length === 0 ? (
            <Text>No objects yet</Text>
          ) : (
            objects.map(object => (
              <Box key={object.id} p={5} shadow="md" borderWidth="1px" borderRadius="md" mb={4}>
                <Text fontSize="xl">{object.name}</Text>
                <Text>Location: {object.location}</Text>
              </Box>
            ))
          )}
        </Box>
      </VStack>
    </Container>
  );
};

export default ObjectForm;