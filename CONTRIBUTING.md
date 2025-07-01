# Contributing to K-Beauty Hub

Thank you for your interest in contributing to K-Beauty Hub! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Bugs
- Use the GitHub issue tracker
- Include detailed steps to reproduce the bug
- Provide screenshots if applicable
- Mention your browser and OS version

### Suggesting Features
- Check existing issues first
- Provide a clear description of the feature
- Explain the use case and benefits
- Include mockups or examples if possible

### Code Contributions
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Ensure code quality standards
6. Submit a pull request

## 🛠️ Development Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Local Development
```bash
# Clone your fork
git clone https://github.com/yourusername/k-beauty-hub.git
cd k-beauty-hub

# Install dependencies
npm install

# Start development server
npm start
```

## 📝 Code Style Guidelines

### TypeScript
- Use strict TypeScript configuration
- Define proper types for all functions and components
- Avoid `any` type - use proper typing
- Use interfaces for object shapes

### React Components
- Use functional components with hooks
- Follow naming conventions (PascalCase for components)
- Keep components focused and single-purpose
- Use proper prop types and default values

### CSS/Styling
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing and colors
- Use CSS custom properties for theming

### File Structure
```
src/
├── components/     # Reusable UI components
├── pages/         # Page-level components
├── context/       # React context providers
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
└── data/          # Static data and mock APIs
```

## 🧪 Testing

### Running Tests
```bash
npm test
```

### Writing Tests
- Test component behavior, not implementation
- Use descriptive test names
- Mock external dependencies
- Test error states and edge cases

## 📦 Building and Deployment

### Production Build
```bash
npm run build
```

### Code Quality Checks
```bash
# Lint code
npm run lint

# Type checking
npm run type-check
```

## 🔄 Pull Request Process

1. **Create a descriptive title** - Clear and concise
2. **Write a detailed description** - Explain what and why
3. **Include screenshots** - For UI changes
4. **Add tests** - If applicable
5. **Update documentation** - README, comments, etc.
6. **Follow the template** - Use the provided PR template

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Manual testing completed
- [ ] Cross-browser testing

## Screenshots
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
```

## 🏷️ Commit Message Guidelines

Use conventional commit format:
```
type(scope): description

feat(cart): add persistent cart storage
fix(header): resolve navigation menu alignment
docs(readme): update installation instructions
style(components): improve button styling
refactor(utils): simplify product filtering logic
test(cart): add unit tests for cart operations
```

### Commit Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

## 🚀 Release Process

1. **Version bump** - Update package.json version
2. **Changelog** - Update CHANGELOG.md
3. **Tag release** - Create git tag
4. **Deploy** - Deploy to production
5. **Announce** - Update documentation

## 📞 Getting Help

- **Issues**: Use GitHub issues for bugs and feature requests
- **Discussions**: Use GitHub Discussions for questions
- **Email**: Contact maintainers directly for urgent issues

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to K-Beauty Hub! 🎉 