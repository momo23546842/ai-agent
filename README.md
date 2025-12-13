# AI Weather Assistant

A command-line AI agent that provides weather information for any city using the Groq AI API with Llama 3.3 model.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Code Structure](#code-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Project Architecture](#project-architecture)
- [Configuration](#configuration)
- [Development](#development)
- [License](#license)

## Overview

This project is an AI-powered weather assistant that demonstrates the use of AI agents with tool calling capabilities. The assistant can fetch weather information for any city through a simple command-line interface.

## Features

- ✨ **Continuous Interactive Mode**: Continuously query weather for multiple cities in one session
- 🤖 **AI-Powered**: Uses Groq's Llama 3.3-70b-versatile model for natural language understanding
- 🌡️ **Weather Information**: Provides temperature (in Celsius), conditions, and chance of rain
- 🛠️ **Tool Integration**: Demonstrates AI tool calling with structured outputs
- 📦 **TypeScript**: Written in TypeScript for type safety and better developer experience

## Code Structure

```
ai-agent/
├── index.ts          # Main application entry point with CLI logic
├── tools.ts          # Weather tools definition (AI tool functions)
├── package.json      # Project dependencies and scripts
├── tsconfig.json     # TypeScript configuration
├── .env              # Environment variables (not committed)
├── .gitignore        # Git ignore rules
└── README.md         # This file
```

### File Descriptions

- **index.ts**: Main application file that:
  - Provides continuous interactive mode for querying multiple cities
  - Initializes the AI agent with Groq model
  - Processes user requests and displays weather information
  - Allows graceful exit with commands like "exit", "quit", or "q"

- **tools.ts**: Defines AI tools that the agent can use:
  - `weather`: Fetches weather data for a given location
  - `askLocation`: Helper tool for requesting location information (currently demonstrative)

- **package.json**: Contains project metadata, dependencies, and npm scripts

- **tsconfig.json**: TypeScript compiler configuration

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)
- **Groq API Key**: Sign up at [https://console.groq.com](https://console.groq.com) to get your API key

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ai-agent
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
touch .env
```

Add your Groq API key to the `.env` file:

```env
GROQ_API_KEY=your_groq_api_key_here
```

**Important**: Never commit your `.env` file to version control. It's already included in `.gitignore`.

### 4. Build the Project

```bash
npm run build
```

This compiles the TypeScript files to JavaScript in the `dist/` directory.

## Usage

### Interactive Mode with Continuous Input

Run the application to enter interactive mode, where you can continuously query weather for different cities:

```bash
npm start
```

The application will continuously prompt you for city names. You can:
- Enter any city name to get weather information
- Type `exit`, `quit`, or `q` to exit the program
- Press `Ctrl+C` to force quit at any time

Example session:

```
=== Weather Assistant CLI ===

Enter city names to get weather information.
Type "exit", "quit", or "q" to quit the program.

Please enter a city name (or type "exit" to quit): London

Fetching weather information for: London

User: What is the weather like in London?
[Tool] Fetching weather for London...

Agent: The weather in London is currently Cloudy with a temperature of 18°C. There's a 45% chance of rain today.

Please enter a city name (or type "exit" to quit): Tokyo

Fetching weather information for: Tokyo

User: What is the weather like in Tokyo?
[Tool] Fetching weather for Tokyo...

Agent: The weather in Tokyo is currently Sunny with a temperature of 28°C. There's a 15% chance of rain today. It's a beautiful day!

Please enter a city name (or type "exit" to quit): exit

Thank you for using Weather Assistant! Goodbye! 👋
```



## Project Architecture

### AI Agent Flow

1. **User Input**: City name is captured via CLI (command-line argument or interactive prompt)
2. **Agent Initialization**: The ToolLoopAgent is configured with:
   - Groq's Llama 3.3-70b-versatile model
   - System instructions for weather assistance
   - Available tools (weather fetching)
3. **Tool Loop**: The agent automatically:
   - Understands the user's request
   - Calls appropriate tools (weather API)
   - Processes tool results
   - Generates natural language response
4. **Output**: Formatted weather information is displayed to the user

### Technology Stack

- **AI Framework**: Vercel AI SDK
- **LLM Provider**: Groq (Llama 3.3-70b-versatile)
- **Language**: TypeScript
- **Runtime**: Node.js
- **Schema Validation**: Zod
- **Environment Management**: dotenv

## Configuration

### TypeScript Configuration

The project uses modern TypeScript settings (`tsconfig.json`):
- Target: ES2022
- Module: NodeNext
- Strict mode enabled
- Output directory: `dist/`

### Environment Variables

Required environment variables (in `.env`):

| Variable | Description | Required |
|----------|-------------|----------|
| `GROQ_API_KEY` | Your Groq API key for LLM access | Yes |

## Development

### Available Scripts

```bash
# Build the project (compile TypeScript)
npm run build

# Build and run the application
npm start

# Build and run in development mode
npm run dev

# Run tests (not yet implemented)
npm test
```

### Adding New Features

1. **Add new tools**: Modify `tools.ts` to add new capabilities
2. **Update agent instructions**: Modify the system instructions in `index.ts`
3. **Add dependencies**: Use `npm install <package>` to add new packages
4. **Rebuild**: Run `npm run build` after making changes

### Code Style

- Use TypeScript for type safety
- Follow existing code conventions
- Add JSDoc comments for public functions
- Keep functions focused and modular

## Purpose

This project serves as:

- 🎓 **Educational Example**: Demonstrates AI agent implementation with tool calling
- 🚀 **Starter Template**: Can be extended for more complex AI applications
- 🔧 **CLI Tool**: Practical command-line utility for weather information
- 📚 **Learning Resource**: Shows integration of AI SDK, LLM providers, and TypeScript

## License

ISC

---

**Note**: This is a demonstration project. The weather data is currently simulated (random values). To use real weather data, integrate with actual weather APIs like OpenWeatherMap, WeatherAPI, or similar services.
