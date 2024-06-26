import React, { useState, useEffect } from 'react';
import { Container, VStack, HStack, Input, Textarea, Button, Box, Text, Heading, Alert, AlertIcon, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

const ReminderApp = () => {
  const [reminders, setReminders] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedReminders = JSON.parse(localStorage.getItem('reminders')) || [];
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setReminders(savedReminders);
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [reminders, tasks]);

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

  const handleAddTask = () => {
    if (!title || !description || !dueDate) {
      setError('All fields are required');
      return;
    }
    setError(null);
    const newTask = { id: uuidv4(), title, description, dueDate };
    setTasks([...tasks, newTask]);
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  const handleDeleteReminder = (id) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEditReminder = (id) => {
    const reminder = reminders.find(reminder => reminder.id === id);
    setTitle(reminder.title);
    setDescription(reminder.description);
    setDueDate(reminder.dueDate);
    handleDeleteReminder(id);
  };

  const handleEditTask = (id) => {
    const task = tasks.find(task => task.id === id);
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.dueDate);
    handleDeleteTask(id);
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
        <Tabs variant="enclosed">
          <TabList>
            <Tab>Reminders</Tab>
            <Tab>Tasks</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
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
            </TabPanel>
            <TabPanel>
              <Box w="100%">
                <VStack spacing={4}>
                  <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                  <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                  <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                  <Button colorScheme="teal" onClick={handleAddTask}>Add Task</Button>
                </VStack>
              </Box>
              <Box w="100%">
                <Heading as="h2" size="lg" mb={4}>Tasks</Heading>
                {tasks.length === 0 ? (
                  <Text>No tasks yet</Text>
                ) : (
                  tasks.map(task => (
                    <Box key={task.id} p={5} shadow="md" borderWidth="1px" borderRadius="md" mb={4}>
                      <HStack justify="space-between">
                        <VStack align="start">
                          <Text fontSize="xl">{task.title}</Text>
                          <Text>{task.description}</Text>
                          <Text>Due Date: {task.dueDate}</Text>
                        </VStack>
                        <HStack>
                          <Button colorScheme="blue" onClick={() => handleEditTask(task.id)}>Edit</Button>
                          <Button colorScheme="red" onClick={() => handleDeleteTask(task.id)}>Delete</Button>
                        </HStack>
                      </HStack>
                    </Box>
                  ))
                )}
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  );
};

export default ReminderApp;