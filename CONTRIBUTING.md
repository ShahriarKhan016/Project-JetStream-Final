# Contributing to JetStream Music Player

Thank you for your interest in contributing! This guide will help you get started.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
3. **Create a branch** for your feature/fix
4. **Make your changes**
5. **Test thoroughly**
6. **Submit a pull request**

## 📋 Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/jetstream.git
cd jetstream

# Install dependencies
cd web
npm install

# Start development server
npm run dev
```

## 🌿 Branch Naming

Use descriptive branch names:
- `feature/add-equalizer` - New features
- `fix/player-volume-bug` - Bug fixes
- `docs/update-readme` - Documentation
- `refactor/audio-service` - Code refactoring
- `test/playlist-unit-tests` - Tests

## 💻 Code Style

### TypeScript
- Use TypeScript for all new code
- Define interfaces for all props
- Avoid `any` type
- Use meaningful variable names

### React Components
- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use CSS Modules for styling

### Example Component Structure
```typescript
import React from 'react'
import styles from './Component.module.css'

interface ComponentProps {
  title: string
  onClick: () => void
}

export const Component: React.FC<ComponentProps> = ({ title, onClick }) => {
  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <button onClick={onClick}>Click me</button>
    </div>
  )
}
```

### CSS Modules
- One CSS Module per component
- Use camelCase for class names
- Keep selectors simple
- Use CSS variables for theme values

```css
.container {
  display: flex;
  flex-direction: column;
  background: var(--glass-bg);
  border-radius: var(--radius-lg);
}

.title {
  font-size: 1.5rem;
  color: var(--text-primary);
}
```

## 🧪 Testing

### Before Submitting PR
- [ ] Test in Chrome
- [ ] Test in Firefox  
- [ ] Test on mobile view (400px)
- [ ] Test on tablet view (768px)
- [ ] Test all user interactions
- [ ] Check browser console for errors
- [ ] Verify no TypeScript errors
- [ ] Check responsive design

### Manual Testing
```bash
# Build production version
npm run build

# Preview production build
npm run preview
```

## 📝 Commit Messages

Use clear, descriptive commit messages:

```
Add: New feature description
Fix: Bug description
Update: Change description
Remove: What was removed
Refactor: What was refactored
Docs: Documentation changes
Style: CSS/styling changes
Test: Test additions or changes
```

Examples:
```
Add: Audio equalizer component with 10-band control
Fix: Volume slider not updating when muted
Update: Improve playlist loading performance
Refactor: Extract audio service into separate module
Docs: Add API documentation for music service
```

## 🐛 Bug Reports

When reporting bugs, include:

1. **Description**: What's wrong?
2. **Steps to Reproduce**: How to trigger the bug?
3. **Expected Behavior**: What should happen?
4. **Actual Behavior**: What actually happens?
5. **Screenshots**: Visual evidence if applicable
6. **Environment**:
   - Browser & version
   - OS & version
   - Screen size
7. **Console Errors**: Any errors in browser console

### Bug Report Template
```markdown
## Description
Brief description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots
[Add screenshots]

## Environment
- Browser: Chrome 120
- OS: Windows 11
- Screen: 1920x1080

## Console Errors
```
Error messages here
```
```

## 💡 Feature Requests

When requesting features, include:

1. **Problem**: What problem does this solve?
2. **Solution**: How would this feature work?
3. **Alternatives**: What alternatives did you consider?
4. **Examples**: Examples from other apps

### Feature Request Template
```markdown
## Problem
Describe the problem this feature would solve

## Proposed Solution
Describe how the feature would work

## Alternatives Considered
Other ways to solve this problem

## Examples
Examples from other applications

## Additional Context
Any other relevant information
```

## 🎨 UI/UX Guidelines

### Design Principles
- **Consistency**: Follow existing design patterns
- **Clarity**: Make UI elements clear and obvious
- **Feedback**: Provide visual feedback for interactions
- **Simplicity**: Keep interfaces simple and uncluttered
- **Accessibility**: Consider color contrast and screen readers

### Glassmorphism Theme
- Use `backdrop-filter: blur()` for glass effect
- Keep backgrounds semi-transparent
- Use subtle shadows
- Maintain consistent border-radius
- Follow color palette

### Responsive Breakpoints
```css
/* Mobile: < 768px */
@media (max-width: 767px) { }

/* Tablet: 768px - 1023px */
@media (min-width: 768px) and (max-width: 1023px) { }

/* Desktop: >= 1024px */
@media (min-width: 1024px) { }
```

## 📚 Documentation

### Code Comments
- Comment complex logic
- Explain "why" not "what"
- Keep comments updated
- Use JSDoc for functions

```typescript
/**
 * Calculates the audio frequency data for visualization
 * @param analyser - Web Audio API analyzer node
 * @param dataArray - Uint8Array to store frequency data
 * @returns Normalized frequency values (0-1)
 */
function getFrequencyData(analyser: AnalyserNode, dataArray: Uint8Array): number[] {
  // Implementation
}
```

### README Updates
- Update README for new features
- Add setup instructions for new dependencies
- Update screenshots if UI changes
- Keep feature list current

## 🔍 Code Review Process

### For Reviewers
- Check code quality and style
- Test functionality locally
- Verify no breaking changes
- Suggest improvements
- Be constructive and friendly

### For Contributors
- Respond to feedback promptly
- Make requested changes
- Update tests if needed
- Be open to suggestions

## ⚡ Performance Guidelines

- Minimize re-renders with `React.memo`
- Debounce expensive operations
- Lazy load heavy components
- Optimize images
- Cache API responses
- Avoid memory leaks

## 🔒 Security

- Never commit API keys or secrets
- Sanitize user inputs
- Validate data from APIs
- Use HTTPS in production
- Follow secure coding practices

## 📦 Pull Request Process

1. **Create PR** with descriptive title
2. **Fill out PR template** completely
3. **Link related issues**
4. **Request reviews** from team members
5. **Address feedback** promptly
6. **Merge** after approval

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Fixes #123

## Testing
- [ ] Tested locally
- [ ] Tested in multiple browsers
- [ ] Tested responsive design

## Screenshots
[Add screenshots if UI changes]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added where needed
- [ ] Documentation updated
- [ ] No new warnings generated
```

## 🎯 Priority Labels

- `P0: Critical` - Blocks functionality, needs immediate fix
- `P1: High` - Important feature or serious bug
- `P2: Medium` - Should be done soon
- `P3: Low` - Nice to have

## 📅 Release Process

### Version 1.x (Current)
- Bug fixes
- Minor improvements
- No breaking changes

### Version 2.x (Future)
- Mobile apps
- Backend integration
- Major new features
- Possible breaking changes

## 💬 Communication

- Be respectful and professional
- Ask questions if unclear
- Provide context in discussions
- Use GitHub Issues for tracking
- Tag team members when needed

## 🙏 Thank You!

Your contributions make JetStream better for everyone. We appreciate your time and effort!

---

For questions, contact the development team or create a discussion on GitHub.
