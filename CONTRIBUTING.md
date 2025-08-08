# Contributing to JLPT - Adayroi

Thank you for your interest in contributing to the JLPT preparation platform! This document provides guidelines for contributing to the project.

## 🤝 Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please be respectful and constructive in all interactions.

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- pnpm (recommended) or npm
- PostgreSQL database
- Git

### Development Setup

1. **Fork the repository**

   ```bash
   gh repo fork adayroi/jlpt.adayroi.jp
   ```

2. **Clone your fork**

   ```bash
   git clone https://github.com/hungdoba/jlpt.adayroi.jp.git
   cd jlpt.adayroi.jp
   ```

3. **Install dependencies**

   ```bash
   pnpm install
   ```

4. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

5. **Set up the database**

   ```bash
   pnpm db:generate
   pnpm db:push
   ```

6. **Start the development server**
   ```bash
   pnpm dev
   ```

## 📝 Development Guidelines

### Branch Naming Convention

Use descriptive branch names that follow this pattern:

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test improvements

Examples:

- `feature/quiz-timer`
- `fix/bookmark-saving-issue`
- `docs/api-documentation`

### Commit Message Format

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only changes
- `style`: Formatting changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:

```bash
git commit -m "feat(quiz): add timer functionality"
git commit -m "fix(bookmarks): resolve saving issue on mobile"
git commit -m "docs(api): update endpoint documentation"
```

### Code Style

- **TypeScript**: Use TypeScript for all new code
- **ESLint**: Follow the existing ESLint configuration
- **Prettier**: Code is automatically formatted
- **File naming**: Use kebab-case for files and folders
- **Component naming**: Use PascalCase for React components

### Project Structure

Follow the established project structure:

```
src/
├── app/
├── components/
├── lib/
├── hooks/
├── services/
├── constants/
├── types/
└── db/
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Writing Tests

- Write tests for new features and bug fixes
- Use descriptive test names
- Follow the AAA pattern (Arrange, Act, Assert)
- Mock external dependencies
- Aim for good test coverage

Example:

```typescript
describe('formatJlptLevel', () => {
  test('should format JLPT levels correctly', () => {
    // Arrange
    const input = 'n1';

    // Act
    const result = formatJlptLevel(input);

    // Assert
    expect(result).toBe('n1');
  });
});
```

## 📦 Pull Request Process

### Before Submitting

1. **Update your branch**

   ```bash
   git checkout main
   git pull upstream main
   git checkout your-feature-branch
   git rebase main
   ```

2. **Run the full test suite**

   ```bash
   pnpm test
   pnpm lint
   pnpm build
   ```

3. **Update documentation** if necessary

### Pull Request Template

When creating a pull request, use this template:

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] Tests pass locally
- [ ] Added new tests for feature
- [ ] Updated existing tests

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes
```

### Review Process

1. **Automated checks** must pass (CI/CD pipeline)
2. **Code review** by maintainers
3. **Testing** in staging environment
4. **Approval** from at least one maintainer
5. **Merge** to main branch

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Clear title** describing the issue
2. **Steps to reproduce** the problem
3. **Expected behavior**
4. **Actual behavior**
5. **Screenshots** if applicable
6. **Environment details** (browser, OS, etc.)
7. **Console errors** if any

Use our bug report template:

```markdown
## Bug Description

Brief description of the bug

## Steps to Reproduce

1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior

What should happen

## Actual Behavior

What actually happens

## Environment

- OS: [e.g. Windows 11]
- Browser: [e.g. Chrome 91]
- Device: [e.g. iPhone 12]

## Additional Context

Any other context about the problem
```

## 💡 Feature Requests

For feature requests, please:

1. **Check existing issues** first
2. **Provide detailed description** of the feature
3. **Explain the use case** and benefits
4. **Consider implementation** complexity
5. **Add mockups** if applicable

## 📋 Issue Labels

We use these labels to categorize issues:

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements to docs
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `priority: high` - High priority issue
- `priority: low` - Low priority issue
- `status: in progress` - Being worked on
- `status: needs review` - Ready for review

## 🎯 Areas for Contribution

We welcome contributions in these areas:

### 🔧 Technical

- Performance optimizations
- Accessibility improvements
- Mobile responsiveness
- New testing features
- Database optimizations

### 📚 Content

- JLPT question improvements
- Vocabulary expansions
- Translation accuracy
- User interface text

### 🎨 Design

- UI/UX improvements
- Icon designs
- Color scheme enhancements
- Layout optimizations

### 📖 Documentation

- API documentation
- User guides
- Developer tutorials
- Code comments

## 🏆 Recognition

Contributors will be recognized in:

- README.md contributors section
- Release notes
- Project website (if applicable)

## 📞 Getting Help

If you need help:

1. **Check the documentation** first
2. **Search existing issues** for similar problems
3. **Create a new issue** with detailed information
4. **Join our discussions** for general questions

## 🔄 Release Process

1. **Feature freeze** on develop branch
2. **Testing** and bug fixes
3. **Version bump** and changelog update
4. **Release** to main branch
5. **Deploy** to production
6. **Post-release** monitoring

Thank you for contributing to JLPT - Adayroi! 🙏
