# ArkSphere Website - Project Context

## Project Overview

ArkSphere is an open-source hub for AI Native Engineering that promotes clear frameworks and systematic engineering to standardize how the industry builds, deploys, and scales AI applications. The website serves as the frontend interface for the ArkSphere platform, showcasing the methodology and tools for building AI-native applications.

This is a modern React TypeScript application built with Vite, featuring:

- A responsive design with light/dark theme support
- Interactive animations using GSAP and ScrollTrigger
- TailwindCSS for styling with custom configurations
- Integration with Google's GenAI for AI-powered features
- An OSS Hub showcasing open-source AI tools and frameworks
- Detailed documentation and examples sections

## Project Structure

```text
arksphere-website/
├── App.tsx                 # Main application component with routing
├── index.tsx              # React app entry point
├── index.html             # HTML template with TailwindCSS and PrismJS
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite build configuration
├── constants.ts           # Application constants and data
├── types.ts               # TypeScript type definitions
├── components/            # Reusable UI components (Navbar, Footer, etc.)
├── views/                 # Main page views (Overview, Architecture, etc.)
└── services/              # (Empty directory for service implementations)
```

## Key Technologies

- **React 18.2.0**: Modern UI library with hooks and functional components
- **TypeScript 5.8.2**: Type-safe development
- **Vite 6.2.0**: Fast build tool and development server
- **TailwindCSS**: Utility-first CSS framework
- **GSAP**: Advanced animations and scroll-triggered effects
- **PrismJS**: Code syntax highlighting
- **Google GenAI**: AI integration capabilities
- **Node.js**: Runtime environment

## Building and Running

### Prerequisites

- Node.js installed on your system

### Setup Instructions

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env.local` file and set `GEMINI_API_KEY` environment variable:

   ```bash
   GEMINI_API_KEY=your_api_key_here
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. The application will be available at `http://localhost:3000`

### Production Build

To build for production:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Application Features

### Application Views

The application has multiple views accessible through the navigation:

- **Overview**: Main landing page with animated sections
- **AI OSS Hub**: Showcases open-source AI projects and tools
- **Architecture**: Technical architecture diagrams and explanations
- **Stack**: Interactive visualization of the technology stack
- **Examples**: Code examples and implementation guides
- **Docs**: Comprehensive documentation sections

### Themes

The application supports both light and dark themes with automatic detection of system preference.

### Animations

The site uses GSAP for:

- Scroll-triggered animations
- Hero section animations
- Story card transitions
- Stack sequence animations

## Key Components

### Navigation

- Responsive Navbar with theme toggle
- View switching functionality

### Views

- **Overview**: The main landing page with animated sections showing the four pillars of AI Native Engineering
- **Architecture**: Technical diagrams and explanations
- **Stack**: Interactive visualization of the technology stack
- **OSS Hub**: Curated list of open-source AI projects with categories
- **Examples**: Code examples and implementation guides
- **Docs**: Comprehensive documentation with markdown content

### Constants and Data

The `constants.ts` file contains:

- Navigation labels and items
- OSS project data with categories (Runtime, Orchestration, Infrastructure, Platform, Evaluation)
- Documentation content with markdown formatting
- System information about ArkSphere

### Types

The `types.ts` file defines:

- View enum for navigation
- Interfaces for navigation items, features, documentation sections, examples, and OSS projects

## Development Conventions

- Components are organized by type (components, views)
- CSS styling uses Tailwind with custom configurations in index.html
- Animations are handled with GSAP and ScrollTrigger
- TypeScript is used throughout for type safety
- Environment variables are loaded via Vite's loadEnv function
- Code follows React best practices with hooks and functional components

## Language Standards

This is an English-language project. All development must follow these language requirements:

- **Code Comments**: All inline comments, JSDoc comments, and code documentation must be written in English
- **Documentation**: All README files, guides, API documentation, and markdown files must be in English
- **Git Commits**: All commit messages must be in English. Use clear, imperative tense (e.g., "Add feature", "Fix bug", "Update styles")
- **Variable/Function Names**: Use English identifiers throughout the codebase
- **String Content**: User-facing text should be managed through the constants/localization system, English is the default language

Examples of proper commit messages:

- `Add dark theme support to navbar`
- `Fix scroll animation timing in stack section`
- `Update documentation for API integration`
- `Refactor component structure for better maintainability`

## API Integration

The application integrates with Google's GenAI service, requiring the GEMINI_API_KEY environment variable to be set. The API key is made available to the application via Vite's define configuration in vite.config.ts.

## Special Features

- Interactive 3D-like visualizations in the Overview section
- Scroll-triggered animations that reveal content progressively
- Pinned scrolling animations in the Stack section
- Responsive design that works on mobile and desktop
- Code syntax highlighting for documentation and examples
- Theme-aware styling that adapts to light/dark mode preferences

## Deployment

The application can be built for production using `npm run build`. The resulting files can be served from any static hosting service. The Vite configuration sets the server port to 3000 by default and allows external access with host '0.0.0.0'.
