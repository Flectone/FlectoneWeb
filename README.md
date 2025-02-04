<div align="center">
  <img src="assets/favicons/favicon.ico" alt="Flectone Logo" width="120" />

# ⚡️ Flectone Web

🚀 Modern web solution for Flectone Network

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/tiny.svg)](https://astro.build)
[![Powered by Bun](https://img.shields.io/badge/Powered%20by-Bun-orange)](https://bun.sh)
[![Website Status](https://img.shields.io/website?url=https%3A%2F%2Fflectone.net)](https://flectone.net)
[![License](https://img.shields.io/badge/license-GPLv3-blue)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/Flectone/FlectoneWeb?style=social)](https://github.com/Flectone/FlectoneWeb/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/Flectone/FlectoneWeb?style=social)](https://github.com/Flectone/FlectoneWeb/network/members)

</div>

## 🧱 Project Structure

Here’s a quick overview of the project structure:

```bash
FlectoneWeb/
├── src/                  # Astro project source files
│   ├── assets/           # Static assets (images, fonts, etc.)
│   ├── components/       # Reusable UI components
│   ├── layouts/          # Layout templates
│   ├── pages/            # Application pages and routes
│   └── styles/           # Global styles and CSS
│
├── pulse/                # VitePress documentation
│   ├── en/               # (EN)
│   └── ru/               # (RU)
│
├── dist/                 # Production build output
├── public/               # Public static files
└── package.json          # Project dependencies and scripts
```

## 🎯 Overview

Flectone Web is a modern, fast, and responsive web solution built for **Flectone Network**. It combines the power of **Astro** for the main frontend and **VitePress** for documentation, providing an excellent developer and user experience.

## ✨ Key Features

- **🌍 Multi-language Support**: Fully localized for RU and EN audiences.
- **⚡️ Blazing Fast Performance**: Optimized for speed with Astro and Vite.
- **🎨 Modern UI**: Clean, responsive design with dark/light themes.
- **📚 Comprehensive Documentation**: Built with VitePress for easy maintenance.
- **🚀 Easy Deployment**: Pre-configured build scripts for seamless deployment.

## 🛠️ Tech Stack

| Category       | Technologies                                                                 |
|----------------|-----------------------------------------------------------------------------|
| **Core**       | ![Astro](https://img.shields.io/badge/Astro-BC52EE?logo=astro&logoColor=white) ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black) |
| **Styling**    | ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwind-css&logoColor=white) |
| **Runtime**    | ![Bun](https://img.shields.io/badge/Bun-000000?logo=bun&logoColor=white)    |
| **Docs**       | ![VitePress](https://img.shields.io/badge/VitePress-646CFF?logo=vite&logoColor=white) |

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **Bun** (v1.0 or higher)

### Installation

1. Clone the repository:
```bash
   git clone https://github.com/Flectone/FlectoneWeb.git
   cd FlectoneWeb
```

2. Install dependencies:
```bash
   bun install && bun install:pulse-ru && bun install:pulse-en
```
### Development

- **Start Astro development server**:
```bash
  bun run dev
```

- **Start VitePress development server (RU docs)**:
```bash
  bun run dev:pulse-ru
```

- **Start VitePress development server (EN docs)**:
```bash
  bun run dev:pulse-en
```

### Build

- **Build Astro project**:
```bash
  bun run build
```

- **Build VitePress docs (RU)**:
```bash
  bun run build:pulse-ru
```

- **Build VitePress docs (EN)**:
```bash
  bun run build:pulse-en
```

- **Copy built docs to Astro dist folder**:
```bash
  bun run copy:pulse
```

- **Build everything (Astro + VitePress docs)**:
```bash
  bun run build:all
```

### Preview

- **Preview Astro build**:
```bash
  bun run preview
```

- **Preview VitePress docs (RU)**:
```bash
  bun run preview:pulse-ru
```

- **Preview VitePress docs (EN)**:
```bash
  bun run preview:pulse-en
```

## 📜 Scripts Reference

| Script             | Description                                    |
|--------------------|------------------------------------------------|
| `dev`              | Start Astro development server                 |
| `dev:pulse-ru`     | Start VitePress dev server for RU docs         |
| `dev:pulse-en`     | Start VitePress dev server for EN docs         |
| `build`            | Build Astro project                            |
| `build:pulse-ru`   | Build RU VitePress docs                        |
| `build:pulse-en`   | Build EN VitePress docs                        |
| `build:all`        | Build everything (Astro + VitePress docs)      |
| `copy:pulse`       | Copy built VitePress docs to Astro dist folder |
| `preview`          | Preview Astro build                            |
| `preview:pulse-ru` | Preview RU VitePress docs                      |
| `preview:pulse-en` | Preview EN VitePress docs                      |


## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) to get started.

## 📄 License

This project is licensed under the **GPLv3 License**. See the [LICENSE](LICENSE) file for details.

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/Flectone">Flectone Team</a>
</div>