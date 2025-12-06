import 'dotenv/config';
import { ToolLoopAgent } from 'ai';
import { groq } from '@ai-sdk/groq';
import { weatherTools } from './tools';
import * as readline from 'readline';

/**
 * Get city input from command line arguments or prompt user interactively
 * @returns Promise<string> The city name
 */
async function getCityInput(): Promise<string> {
  // Check if city is provided as command line argument
  const args = process.argv.slice(2);
  
  if (args.length > 0) {
    const city = args.join(' ');
    console.log(`Using city from command line: ${city}`);
    return city;
  }

  // If no argument provided, prompt user interactively
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question('Please enter a city name: ', (city) => {
      rl.close();
      resolve(city.trim());
    });
  });
}

async function main() {
  console.log('=== Weather Assistant CLI ===\n');
  
  // Get city input from CLI or interactive prompt
  const city = await getCityInput();
  
  if (!city) {
    console.error('Error: City name is required');
    process.exit(1);
  }

  console.log(`\nFetching weather information for: ${city}\n`);

  // 1. Define the Agent
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

  // 2. Run the Agent
  // The agent will automatically loop:
  // Call LLM -> Call Tool -> Feed Result to LLM -> Final Answer
  const userPrompt = `What is the weather like in ${city}?`;
  console.log(`User: ${userPrompt}`);

  const result = await agent.generate({
    prompt: userPrompt,
  });

  // 3. Output the result
  console.log(`\nAgent: ${result.text}`);
}

main().catch(console.error);
