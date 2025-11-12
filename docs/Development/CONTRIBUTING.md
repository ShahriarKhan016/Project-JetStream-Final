# Contributing to JetStream

We love your input! We want to make contributing to JetStream as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

### Pull Requests

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

### Git Commit Messages

We follow conventional commits specification:

- `feat:` - A new feature
- `fix:` - A bug fix
- `docs:` - Documentation only changes
- `style:` - Changes that don't affect code meaning (formatting, etc.)
- `refactor:` - Code change that neither fixes a bug nor adds a feature
- `perf:` - Performance improvements
- `test:` - Adding missing tests
- `chore:` - Changes to build process or auxiliary tools

**Example:**
```
feat: add spatial audio support to player
fix: resolve crash on playlist deletion
docs: update API documentation for recommendations
```

## Code Style

### TypeScript
- Use TypeScript for all new code
- Follow existing patterns in the codebase
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

### React/React Native
- Use functional components with hooks
- Follow the component structure in existing code
- Use proper TypeScript typing for props
- Keep components small and focused

### Backend
- Follow RESTful API conventions
- Use async/await for asynchronous code
- Implement proper error handling
- Add input validation

## Testing

- Write unit tests for utility functions
- Add integration tests for API endpoints
- Test UI components with React Testing Library
- Aim for high code coverage

## Documentation

- Update README.md if needed
- Document new features in `/docs`
- Add inline comments for complex logic
- Update API documentation

## Design Guidelines

### UI/UX
- Follow the minimalistic dark theme
- Use colors from the design system
- Maintain consistency across screens
- Ensure accessibility

### Performance
- Optimize images and assets
- Lazy load heavy components
- Profile performance bottlenecks
- Keep bundle size minimal

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to open an issue for discussion or reach out to the maintainers.

Thank you for contributing to JetStream! 🎵
