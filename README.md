<div align="center">
  <img src="public/logo.png" alt="Flectone Logo" width="120" />

# ⚡️ Flectone Web

🚀 Modern web solution for Flectone Network built with Next.js

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?logo=next.js)](https://nextjs.org)
[![Website Status](https://img.shields.io/website?url=https%3A%2F%2Fflectone.net)](https://flectone.net)
[![License](https://img.shields.io/badge/license-GPLv3-blue)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/Flectone/FlectoneWeb?style=social)](https://github.com/Flectone/FlectoneWeb/stargazers)

</div>

## 🧱 Project Structure

Here’s a quick overview of the project structure:

```bash
FlectoneWeb/
├── src/
│   ├── app/                # Next.js App Router (Pages, API, Layouts)
│   │   ├── (main)/         # Main website routes (about, chat, mix)
│   │   └── pulse/          # Documentation routes
│   ├── components/         # Reusable React components
│   ├── i18n/               # Internationalization configuration
│   ├── lib/                # Shared utilities and hooks
│   ├── messages/           # Localization files (JSON)
│   ├── pulse/              # Documentation content (MDX)
│   └── styles/             # Global styles and Tailwind CSS
│
├── public/                 # Static assets
├── source.config.ts        # Fumadocs configuration
└── package.json            # Project dependencies and scripts
```

## 🎯 Overview

Flectone Web is a high-performance web solution for **Flectone Network**. It utilizes **Next.js 16+** with App Router for the core site and **Fumadocs** for a seamless, searchable documentation experience (Pulse).

## ✨ Key Features

- **🌍 Multi-language Support**: Full i18n support for global reach.
- **⚡️ Next.js 16 Power**: Server Components, Streaming, and Optimized Caching.
- **📚 Integrated Docs**: "Pulse" documentation built directly into the app.
- **🎨 Modern UI**: Responsive design with Tailwind CSS.
- **🚀 Fast Performance**: Optimized for Core Web Vitals.

## 🛠️ Tech Stack

| Category       | Technologies                                                                 |
|----------------|------------------------------------------------|
| **Core**       | ![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white) ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black) |
| **Styling**    | ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwind-css&logoColor=white) |
| **Language**   | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) |
| **Docs**       | ![Fumadocs](https://img.shields.io/badge/Fumadocs-blue?style=flat) |

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18.17 or higher)
- **npm** or **yarn**

### Installation

1. Clone the repository:
```bash
   git clone https://github.com/Flectone/FlectoneWeb.git
   cd FlectoneWeb
```

2. Install dependencies:
```bash
   npm install
```

### Development

Start the development server:
```bash
  npm run dev
```

### Build

Build for production:
```bash
  npm run build
```

Preview production build:
```bash
  npm run start
```

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) to get started.

## 📄 License

This project is licensed under the **GPLv3 License**. See the [LICENSE](LICENSE) file for details.

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/Flectone">Flectone Team</a>
</div>
```