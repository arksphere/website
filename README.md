# ArkSphere Website

Frontend website for ArkSphere, a platform promoting AI Native Engineering frameworks and systematic engineering practices. Includes methodology overview, architecture documentation, technology stack visualization, code examples, and a curated AI OSS project hub.

## Quick Start

### Prerequisites

- Node.js 18.x
- npm or yarn

### Installation

1. Clone and install:

   ```bash
   git clone https://github.com/arksphere/website.git
   cd website
   npm install
   ```

2. Start development server:

   ```bash
   npm run dev
   ```

Visit `http://localhost:3000`

## Build & Deploy

```bash
npm run build      # Create production build with SSR and prerendering
npm run preview    # Preview production build locally
```

## Tech Stack

- React 18.2.0 + TypeScript 5.8.2
- Vite 6.2.0 for fast development and SSR
- TailwindCSS for styling
- GSAP for animations
- MDX for markdown content
- React Router for navigation

## Project Structure

```text
├── src/              # Source files and server entry
├── components/       # Reusable UI components
├── views/           # Page views
├── public/          # Static assets
├── constants.ts     # App constants and data
├── types.ts         # TypeScript definitions
└── vite.config.ts   # Build configuration
```

## Contributing

- All code comments, documentation, and commits must be in English
- See [AGENTS.md](./AGENTS.md) for development guidelines
- See [OSS Inclusion Criteria](./docs/oss-rule.md) for hub submission rules

## License

MIT License
