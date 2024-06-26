import React, { useState } from 'react';
import { Container, VStack, Input, Button, Box, Heading, Text } from '@chakra-ui/react';

const VehicleForm = () => {
  const [vehicles, setVehicles] = useState([]);
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');

  const handleAddVehicle = () => {
    if (!make || !model || !registrationNumber) {
      alert('All fields are required');
      return;
    }
    const newVehicle = { id: Date.now(), make, model, registrationNumber };
    setVehicles([...vehicles, newVehicle]);
    setMake('');
    setModel('');
    setRegistrationNumber('');
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl">Vehicle Management</Heading>
        <Box w="100%">
          <VStack spacing={4}>
            <Input placeholder="Make" value={make} onChange={(e) => setMake(e.target.value)} />
            <Input placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} />
            <Input placeholder="Registration Number" value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} />
            <Button colorScheme="teal" onClick={handleAddVehicle}>Add Vehicle</Button>
          </VStack>
        </Box>
        <Box w="100%">
          <Heading as="h2" size="lg" mb={4}>Vehicles</Heading>
          {vehicles.length === 0 ? (
            <Text>No vehicles yet</Text>
          ) : (
            vehicles.map(vehicle => (
              <Box key={vehicle.id} p={5} shadow="md" borderWidth="1px" borderRadius="md" mb={4}>
                <Text fontSize="xl">{vehicle.make} {vehicle.model}</Text>
                <Text>Registration Number: {vehicle.registrationNumber}</Text>
              </Box>
            ))
          )}
        </Box>
      </VStack>
    </Container>
  );
};

export default VehicleForm;