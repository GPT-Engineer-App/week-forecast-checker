import React, { useState, useEffect } from 'react';
import { Container, Table, Thead, Tbody, Tr, Th, Td, Heading, Select, Button, Box, Alert, AlertIcon, Text } from '@chakra-ui/react';
import axios from 'axios';

const ScheduleTable = () => {
  const [departments, setDepartments] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [objects, setObjects] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [newEntry, setNewEntry] = useState({ department: '', worker: '', object: '', vehicle: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data for dropdowns
    const fetchData = async () => {
      try {
        const departmentsData = await axios.get('/api/departments');
        const workersData = await axios.get('/api/workers');
        const objectsData = await axios.get('/api/objects');
        const vehiclesData = await axios.get('/api/vehicles');

        console.log('Departments:', departmentsData.data);
        console.log('Workers:', workersData.data);
        console.log('Objects:', objectsData.data);
        console.log('Vehicles:', vehiclesData.data);

        setDepartments(departmentsData.data);
        setWorkers(workersData.data);
        setObjects(objectsData.data);
        setVehicles(vehiclesData.data);
      } catch (err) {
        setError('Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  const handleAddEntry = () => {
    if (!newEntry.department || !newEntry.worker || !newEntry.object || !newEntry.vehicle) {
      setError('All fields are required');
      return;
    }
    setError(null);
    setSchedule([...schedule, newEntry]);
    setNewEntry({ department: '', worker: '', object: '', vehicle: '' });
  };

  return (
    <Container maxW="container.md" py={10}>
      <Heading as="h1" size="2xl" mb={6}>Daily Schedule</Heading>
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      {schedule.length === 0 ? (
        <Text>No schedule entries yet</Text>
      ) : (
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
            {schedule.map((row, index) => (
              <Tr key={index}>
                <Td>{row.department}</Td>
                <Td>{row.worker}</Td>
                <Td>{row.object}</Td>
                <Td>{row.vehicle}</Td>
              </Tr>
            ))}
            <Tr>
              <Td>
                <Select placeholder="Select department" value={newEntry.department} onChange={(e) => setNewEntry({ ...newEntry, department: e.target.value })}>
                  {departments.map(department => (
                    <option key={department.id} value={department.name}>{department.name}</option>
                  ))}
                </Select>
              </Td>
              <Td>
                <Select placeholder="Select worker" value={newEntry.worker} onChange={(e) => setNewEntry({ ...newEntry, worker: e.target.value })}>
                  {workers.map(worker => (
                    <option key={worker.id} value={worker.name}>{worker.name}</option>
                  ))}
                </Select>
              </Td>
              <Td>
                <Select placeholder="Select object" value={newEntry.object} onChange={(e) => setNewEntry({ ...newEntry, object: e.target.value })}>
                  {objects.map(object => (
                    <option key={object.id} value={object.name}>{object.name}</option>
                  ))}
                </Select>
              </Td>
              <Td>
                <Select placeholder="Select vehicle" value={newEntry.vehicle} onChange={(e) => setNewEntry({ ...newEntry, vehicle: e.target.value })}>
                  {vehicles.map(vehicle => (
                    <option key={vehicle.id} value={vehicle.name}>{vehicle.name}</option>
                  ))}
                </Select>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      )}
      <Button mt={4} colorScheme="teal" onClick={handleAddEntry}>Add Entry</Button>
    </Container>
  );
};

export default ScheduleTable;