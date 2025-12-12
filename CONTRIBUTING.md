# Contributing to AI Weather Assistant

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## Development Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with your Groq API key (see `.env.example`)
4. Build the project: `npm run build`

## Making Changes

1. Create a new branch for your feature/fix
2. Make your changes in the TypeScript source files (`*.ts`)
3. Build and test your changes: `npm run build`
4. Test the CLI functionality with different inputs
5. Update documentation if needed

## Code Style

- Follow existing TypeScript conventions
- Use meaningful variable and function names
- Add JSDoc comments for public functions
- Keep functions focused and modular
- Maintain type safety - avoid using `any`

## Testing Your Changes

Test the CLI with various inputs:

```bash
# Test with command-line argument
npm start -- "Paris"

# Test with multi-word city
npm start -- "San Francisco"

# Test interactive mode
npm start
```

## Commit Guidelines

- Use clear, descriptive commit messages
- Keep commits focused on a single change
- Reference issues in commit messages when applicable

## Pull Request Process

1. Ensure your code builds without errors
2. Update the README.md if you're adding new features
3. Provide a clear description of your changes
4. Link to any relevant issues

## Questions?

Feel free to open an issue for questions or discussions.
