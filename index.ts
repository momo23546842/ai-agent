import 'dotenv/config';
import { ToolLoopAgent } from 'ai';
import { groq } from '@ai-sdk/groq';
import { weatherTools } from './tools';

async function main() {
  // 1. Define the Agent
  const agent = new ToolLoopAgent({
    // Use the Groq provider with Llama 3 model
    model: groq('llama-3.3-70b-versatile'),

    // System instructions define behavior
    instructions: `You are a helpful weather assistant. 
    - Always provide temperature in Celsius.
    - Include the chance of rain in your response.
    - If the user does not specify a location, ask them for their location before fetching weather.
    - Be friendly and informative.`,

    // Define tools the agent can use (imported from separate file)
    tools: weatherTools,
  });

  // 2. Run the Agent
  // The agent will automatically loop:
  // Call LLM -> Call Tool -> Feed Result to LLM -> Final Answer
  console.log('User: What is the weather like today?');

  const result = await agent.generate({
    prompt: 'What is the weather like today?',
  });

  // 3. Output the result
  console.log(`Agent: ${result.text}`);
}

main().catch(console.error);
