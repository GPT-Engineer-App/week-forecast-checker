import React, { useState, useEffect } from 'react';
import { Container, VStack, HStack, Input, Textarea, Button, Box, Text, Heading, Alert, AlertIcon } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

const ReminderApp = () => {
  const [reminders, setReminders] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedReminders = JSON.parse(localStorage.getItem('reminders')) || [];
    setReminders(savedReminders);
  }, []);

  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  const handleAddReminder = () => {
    if (!title || !description || !dueDate) {
      setError('All fields are required');
      return;
    }
    setError(null);
    const newReminder = { id: uuidv4(), title, description, dueDate };
    setReminders([...reminders, newReminder]);
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  const handleDeleteReminder = (id) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  const handleEditReminder = (id) => {
    const reminder = reminders.find(reminder => reminder.id === id);
    setTitle(reminder.title);
    setDescription(reminder.description);
    setDueDate(reminder.dueDate);
    handleDeleteReminder(id);
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl">Reminder App</Heading>
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        <Box w="100%">
          <VStack spacing={4}>
            <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            <Button colorScheme="teal" onClick={handleAddReminder}>Add Reminder</Button>
          </VStack>
        </Box>
        <Box w="100%">
          <Heading as="h2" size="lg" mb={4}>Reminders</Heading>
          {reminders.length === 0 ? (
            <Text>No reminders yet</Text>
          ) : (
            reminders.map(reminder => (
              <Box key={reminder.id} p={5} shadow="md" borderWidth="1px" borderRadius="md" mb={4}>
                <HStack justify="space-between">
                  <VStack align="start">
                    <Text fontSize="xl">{reminder.title}</Text>
                    <Text>{reminder.description}</Text>
                    <Text>Due Date: {reminder.dueDate}</Text>
                  </VStack>
                  <HStack>
                    <Button colorScheme="blue" onClick={() => handleEditReminder(reminder.id)}>Edit</Button>
                    <Button colorScheme="red" onClick={() => handleDeleteReminder(reminder.id)}>Delete</Button>
                  </HStack>
                </HStack>
              </Box>
            ))
          )}
        </Box>
      </VStack>
    </Container>
  );
};

export default ReminderApp;