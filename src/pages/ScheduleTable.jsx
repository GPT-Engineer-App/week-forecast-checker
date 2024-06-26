import React from 'react';
import { Container, Table, Thead, Tbody, Tr, Th, Td, Heading } from '@chakra-ui/react';

const ScheduleTable = () => {
  const data = [
    { department: 'HR', worker: 'John Doe', object: 'Building A', vehicle: 'Car 1' },
    { department: 'IT', worker: 'Jane Smith', object: 'Server Room', vehicle: 'Car 2' },
    // Add more data as needed
  ];

  return (
    <Container maxW="container.md" py={10}>
      <Heading as="h1" size="2xl" mb={6}>Daily Schedule</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Department</Th>
            <Th>Worker</Th>
            <Th>Object</Th>
            <Th>Vehicle</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, index) => (
            <Tr key={index}>
              <Td>{row.department}</Td>
              <Td>{row.worker}</Td>
              <Td>{row.object}</Td>
              <Td>{row.vehicle}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Container>
  );
};

export default ScheduleTable;