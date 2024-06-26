import React, { useEffect, useState } from "react";
import { Container, VStack, Text, Box, Heading, Spinner, SimpleGrid } from "@chakra-ui/react";
import axios from "axios";

const Index = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get("https://api.weatherapi.com/v1/forecast.json", {
          params: {
            key: "YOUR_API_KEY",
            q: "London",
            days: 7,
          },
        });
        setWeatherData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return (
      <Container centerContent>
        <Spinner size="xl" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container centerContent>
        <Text fontSize="xl" color="red.500">
          {error}
        </Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl">
          7-Day Weather Forecast
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          {weatherData.forecast.forecastday.map((day) => (
            <Box key={day.date} p={5} shadow="md" borderWidth="1px" borderRadius="md">
              <Heading fontSize="xl">{day.date}</Heading>
              <Text>Max Temp: {day.day.maxtemp_c}°C</Text>
              <Text>Min Temp: {day.day.mintemp_c}°C</Text>
              <Text>Condition: {day.day.condition.text}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Index;