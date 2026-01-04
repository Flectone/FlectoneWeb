# 🤝 Contributing to Flectone Web

Thanks for wanting to help! Here’s how to get started with our Next.js & Fumadocs based project.

---

## 🛠️ Getting Started

1. **Fork the repo** on GitHub.
2. **Clone your fork** locally.
3. **Install dependencies** using npm:
   ```bash
   npm install
   ```
4. **Create a branch** for your changes.
5. **Make your changes** and test them.
6. **Commit and push** your changes.
7. **Open a Pull Request** with a clear description.

---

## 🧑‍💻 Guidelines

### Reporting Issues
- Use clear titles and steps to reproduce.
- Include screenshots or logs if needed.

### Code Contributions
- Follow existing code style (we use ESLint).
- Test your changes by running the development server.
- Keep PRs focused on one issue or feature.
- If you are adding documentation for **Pulse**, place it in `src/pulse/` or relevant `[lang]` directories.

### Documentation
- We use **MDX** with **Fumadocs**.
- Use `<include>` tags for reusable parts and localizations where possible, following the pattern in existing `.mdx` files.
- Fix typos, outdated info, or unclear sections in `src/messages/` (JSON) or content files.

---

## 🚀 Development

### Running the Project
- Start the development server:
   ```bash
   npm run dev
   ```
- The site will be available at `http://localhost:3000`.

### Building the Project
- Build the Next.js application:
   ```bash
   npm run build
   ```
- To check for production errors locally:
   ```bash
   npm run start
   ```

---

## 🧐 Code Review

- PRs will be reviewed by maintainers.
- Feedback will be provided if changes are needed.
- Once approved, your changes will be merged into the main branch.

---

## 🙏 Thanks!

Your contributions make Flectone Web better. Happy coding! 🚀