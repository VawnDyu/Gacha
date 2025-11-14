# Contributing to Gacha Simulator

First off, thank you for considering contributing to Gacha System! It's people like you that make this project such a great tool for learning and fun.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** (screenshots, console logs, etc.)
- **Describe the behavior you observed** and what you expected
- **Include your browser version and operating system**

#### Bug Report Template

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
 - Browser: [e.g. Chrome 120]
 - OS: [e.g. Windows 11]
 - Version: [e.g. 1.0.0]
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful**
- **List examples** of how this would work

#### Enhancement Suggestion Template

```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
What you want to happen.

**Describe alternatives you've considered**
Other solutions or features you've thought about.

**Additional context**
Screenshots, mockups, or examples.
```

### Pull Requests

#### Development Process

1. **Fork the repo** and create your branch from `main`
2. **Install dependencies**: `npm install`
3. **Make your changes** following our coding standards
4. **Test your changes** thoroughly
5. **Update documentation** if needed
6. **Commit your changes** with clear commit messages
7. **Push to your fork** and submit a pull request

#### Pull Request Guidelines

- Fill in the required template
- Follow the existing code style
- Include screenshots for UI changes
- Update the README.md if needed
- Add tests if applicable
- Ensure all tests pass
- Keep pull requests focused (one feature/fix per PR)

#### Pull Request Template

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## How Has This Been Tested?
Describe how you tested your changes.

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have tested on multiple browsers (if UI change)

## Screenshots (if applicable)
Add screenshots here.
```

## Style Guidelines

### JavaScript Style Guide

- Use **ES6+ syntax** (arrow functions, destructuring, etc.)
- Use **functional components** and React hooks
- Follow **React best practices** (single responsibility, prop drilling alternatives)
- Use **meaningful variable names** (descriptive, not abbreviated)
- Keep functions **small and focused**
- Add **comments** for complex logic

#### Example

```javascript
// Good
const calculateTotalGems = (baseGems, bonusMultiplier) => {
  return baseGems * bonusMultiplier;
};

// Avoid
const calc = (a, b) => a * b;
```

### Component Structure

```javascript
import { useState, useEffect, useCallback } from 'react';
import { Icon } from 'lucide-react';

function ComponentName({ prop1, prop2 }) {
  // 1. Hooks
  const [state, setState] = useState(initialValue);

  // 2. Effects
  useEffect(() => {
    // effect logic
  }, [dependencies]);

  // 3. Callbacks
  const handleAction = useCallback(() => {
    // handler logic
  }, [dependencies]);

  // 4. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}

export default ComponentName;
```

### CSS Style Guide

- Use **BEM-like naming** for classes (`.component__element--modifier`)
- Keep selectors **specific but not overly nested**
- Use **CSS custom properties** for theming
- Organize by **component** (colocate styles with components when possible)
- Use **rem/em** for spacing, **px** for borders
- Add **comments** for complex layouts or calculations

### Commit Message Guidelines

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation only
- **style**: Code style changes (formatting, semicolons, etc.)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Performance improvement
- **test**: Adding or updating tests
- **chore**: Build process or auxiliary tool changes

#### Examples

```bash
feat(gacha): add new mythical rarity tier

Added a new ultra-rare tier above SSR with 0.1% drop rate.
Includes new visual effects and sound.

Closes #123

fix(storage): prevent data loss on concurrent saves

Previously, rapid successive pulls could overwrite each other's
save data. Now using a queue to ensure sequential saves.

Fixes #456

docs(readme): update installation instructions

Added troubleshooting section for common npm install issues.
```

## Project-Specific Guidelines

### Adding New Items

1. Update `src/constants.js` in the `ITEMS` array
2. Ensure unique `id` values
3. Balance probabilities (total should approach 1.0 per rarity tier)
4. Test pull rates with multiple iterations

### Adding New Banners

1. Add to `BANNERS` array in `constants.js`
2. Define featured items and adjusted rates
3. Update UI to display banner information
4. Test rate-up mechanics work correctly

### Adding New Achievements

1. Add to `ACHIEVEMENTS` array in `constants.js`
2. Implement check logic in `checkAchievements` function
3. Test unlock conditions thoroughly
4. Balance rewards with existing achievements

### Modifying Game Balance

When proposing balance changes:
- Provide **data/reasoning** for the change
- Consider **impact on player experience**
- Test with various scenarios
- Document in PR description

## Testing

While we don't have automated tests yet, please manually test:

- **Pull mechanics** (single, 10-pull, ticket)
- **Pity system** (guarantee at threshold)
- **Spark system** (wishlist selection)
- **Save/load** (refresh page, clear storage)
- **Achievements** (unlock conditions)
- **Daily login** (date changes, streaks)
- **Sell duplicates** (gem calculations)
- **UI responsiveness** (different screen sizes)
- **Browser compatibility** (Chrome, Firefox, Safari, Edge)

## Development Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code (if linter is set up)
npm run lint
```

## Questions?

Feel free to ask questions by:
- Opening an issue with the "question" label
- Reaching out to maintainers
- Checking existing discussions

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Project documentation

Thank you for contributing! 🎉