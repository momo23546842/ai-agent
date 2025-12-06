import { tool } from 'ai';
import { z } from 'zod';

export const weatherTools = {
  weather: tool({
    description: 'Get the weather in a specific location including temperature in Celsius and chance of rain',
    inputSchema: z.object({
      location: z.string().describe('The city and state/country, e.g. Sydney, Australia'),
    }),
    execute: async ({ location }) => {
      console.log(`[Tool] Fetching weather for ${location}...`);
      // Simulating an API call for this tutorial
      const tempCelsius = 15 + Math.floor(Math.random() * 20); // Random temp between 15-35°C
      const chanceOfRain = Math.floor(Math.random() * 100); // Random percentage 0-100%
      const conditions = chanceOfRain > 60 ? 'Rainy' : chanceOfRain > 30 ? 'Cloudy' : 'Sunny';
      
      return {
        temperature: tempCelsius,
        unit: 'Celsius',
        condition: conditions,
        chanceOfRain: `${chanceOfRain}%`,
        location: location
      };
    },
  }),

  askLocation: tool({
    description: 'Ask the user for their location when they want weather information but have not specified a location',
    inputSchema: z.object({
      question: z.string().describe('The question to ask the user about their location'),
    }),
    execute: async ({ question }) => {
      console.log(`[Tool] Asking user: ${question}`);
      // In a real app, this would prompt the user for input
      // For this demo, we'll return a default location
      return {
        userResponse: 'The user needs to provide their location',
        suggestedQuestion: question
      };
    },
  }),
};
