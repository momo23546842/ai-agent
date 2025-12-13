import 'dotenv/config';
import { ToolLoopAgent } from 'ai';
import { groq } from '@ai-sdk/groq';
import { weatherTools } from './tools';
import * as readline from 'readline';

/**
 * Get city input from user interactively
 * @param rl The readline interface to use
 * @returns Promise<string | null> The city name, or null if user wants to exit
 */
async function getCityInput(rl: readline.Interface): Promise<string | null> {
  return new Promise((resolve) => {
    rl.question('Please enter a city name (or type "exit" to quit): ', (input) => {
      const city = input.trim();
      
      // Check if user wants to exit
      if (city.toLowerCase() === 'exit' || city.toLowerCase() === 'quit' || city.toLowerCase() === 'q') {
        resolve(null);
      } else {
        resolve(city);
      }
    });
  });
}

async function main() {
  console.log('=== Weather Assistant CLI ===\n');
  console.log('Enter city names to get weather information.');
  console.log('Type "exit", "quit", or "q" to quit the program.\n');
  
  // Create readline interface for continuous input
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // 1. Define the Agent (once, outside the loop)
  const agent = new ToolLoopAgent({
    // Use the Groq provider with Llama 3 model
    model: groq('llama-3.3-70b-versatile'),

    // System instructions define behavior
    instructions: `You are a helpful weather assistant. 
    - Always provide temperature in Celsius.
    - Include the chance of rain in your response.
    - Be friendly and informative.`,

    // Define tools the agent can use (imported from separate file)
    tools: weatherTools,
  });

  // Continuous input loop
  while (true) {
    // Get city input from user
    const city = await getCityInput(rl);
    
    // If user wants to exit
    if (city === null) {
      console.log('\nThank you for using Weather Assistant! Goodbye! 👋\n');
      rl.close();
      break;
    }
    
    // Validate city input
    if (!city) {
      console.log('Error: City name cannot be empty. Please try again.\n');
      continue;
    }

    console.log(`\nFetching weather information for: ${city}\n`);

    try {
      // 2. Run the Agent
      // The agent will automatically loop:
      // Call LLM -> Call Tool -> Feed Result to LLM -> Final Answer
      const userPrompt = `What is the weather like in ${city}?`;
      console.log(`User: ${userPrompt}`);

      const result = await agent.generate({
        prompt: userPrompt,
      });

      // 3. Output the result
      console.log(`\nAgent: ${result.text}\n`);
    } catch (error) {
      console.error(`Error fetching weather: ${error instanceof Error ? error.message : 'Unknown error'}\n`);
    }
  }
}

main().catch(console.error);
