# 💱 Currency Converter

A modern currency conversion application built with React, TypeScript, and Vite. This monorepo contains a web application and a reusable UI component library.

## 🌐 Live Demo

**Deployed Application:** [https://ingenico-web-challenge-web.vercel.app/](https://ingenico-web-challenge-web.vercel.app/)

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v8.15.6 or higher)

### Installation

```bash
# Clone the repository
git clone https://github.com/gstcarv/ingenico-web-challenge.git
cd ingenico-web-challenge

# Install dependencies
pnpm install
```

### Environment Variables

Create a `.env` file in the `apps/web` directory:

```env
# Currency API Configuration
CURRENCY_API_URL=https://api.exchangerate-api.com/v4/latest
CURRENCY_API_KEY=your_api_key_here
```

**Note:** You'll need to obtain an API key from a currency exchange service like [ExchangeRate-API](https://exchangerate-api.com/) or similar.

### Development

```bash
# Start development server
pnpm dev

# Run tests
pnpm test

# Run linting
pnpm lint

# Type checking
pnpm type-check

# Format code
pnpm format
```

### Building

```bash
# Build all packages
pnpm build
```

## 📁 Project Structure

```
currency-converter/
├── apps/
│   └── web/                    # Main web application
│       ├── src/
│       │   ├── components/     # App-specific components
│       │   │   ├── currency-converter/  # Currency converter components
│       │   │   ├── app-logo.tsx
│       │   │   └── page-container.tsx
│       │   ├── hooks/          # Custom React hooks
│       │   ├── lib/            # Utilities and configurations
│       │   │   ├── api/        # API client and utilities
│       │   │   ├── env/        # Environment configuration
│       │   │   └── helpers/    # Helper functions
│       │   ├── queries/        # API query functions
│       │   ├── routes/         # Application routes
│       │   ├── stores/         # State management (Zustand)
│       │   └── types/          # TypeScript type definitions
│       ├── public/             # Static assets
│       └── index.html          # Entry HTML file
├── packages/
│   ├── eslint-config/          # Shared ESLint configuration
│   ├── typescript-config/      # Shared TypeScript configuration
│   └── ui/                     # Reusable UI component library
│       ├── src/
│       │   ├── components/     # UI components
│       │   │   ├── button/     # Button component
│       │   │   ├── currency-input/  # Currency input component
│       │   │   ├── date-picker/     # Date picker component
│       │   │   ├── field/      # Form field wrapper
│       │   │   ├── input-base/ # Base input component
│       │   │   └── select/     # Select dropdown component
│       │   ├── hooks/          # UI-specific hooks
│       │   ├── theme/          # Styling and themes
│       │   └── utils/          # Utility functions
│       └── storybook.css       # Storybook styles
├── pnpm-workspace.yaml         # Workspace configuration
└── turbo.json                  # Turbo build configuration
```

## 🛠️ Tech Stack

### Core Technologies
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Turbo** - Monorepo build system
- **pnpm** - Package manager

### State Management & Data Fetching
- **Zustand** - State management
- **TanStack Query** - Server state management
- **TanStack Router** - Routing

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Class Variance Authority (CVA)** - Component variants
- **Lucide React** - Icon library
- **Radix UI** - Accessible UI primitives

### Form Handling
- **React Hook Form** - Form state management
- **Zod** - Schema validation

### Testing
- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing
- **Storybook** - Component documentation

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test:coverage

# Run tests in watch mode
pnpm test:run
```

## 📚 Component Library

The UI package contains reusable components with Storybook documentation:

```bash
# Start Storybook
cd packages/ui
pnpm storybook
```

Visit `http://localhost:6006` to view component documentation.

### Available Components

- **Button** - Flexible button component with multiple variants
- **Currency Input** - Specialized input for currency values
- **Date Picker** - Date selection component
- **Field** - Form field wrapper with label and validation
- **Input Base** - Base input component
- **Select** - Dropdown selection component

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `dev` | Start development server |
| `build` | Build all packages |
| `test` | Run tests |
| `lint` | Run ESLint |
| `type-check` | Run TypeScript type checking |
| `format` | Format code with Prettier |

## 🌐 API Integration

The application integrates with external currency exchange APIs. Configure your API credentials in the environment variables to enable currency conversion functionality.

### Environment Variables Setup

1. **Create `.env` file** in `apps/web/` directory
2. **Add required variables**:
   - `CURRENCY_API_URL`: Your currency API endpoint
   - `CURRENCY_API_KEY`: Your API authentication key
3. **Restart development server** after adding environment variables

### API Configuration

The app uses `@t3-oss/env-core` for type-safe environment variable handling with Zod validation.

## 📝 Contributing

1. Follow the established code style and patterns
2. Write tests for new features
3. Update documentation as needed``
4. Use conventional commit messages

## 📄 License

MIT License - see LICENSE file for details
