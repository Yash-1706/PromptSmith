# PromptSmith Frontend# React + Vite



The frontend client for PromptSmith, a modern React application built with Vite, featuring a dark-themed UI using Tailwind CSS and shadcn/ui components.This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.



## Tech StackCurrently, two official plugins are available:



- **React 18** - UI library- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh

- **Vite** - Build tool and dev server- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

- **Tailwind CSS** - Utility-first CSS framework

- **shadcn/ui** - Component library built on Radix UI## React Compiler

- **React Router** - Client-side routing

- **Zustand** - State managementThe React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

- **TanStack Query** - Data fetching and caching

- **Axios** - HTTP client## Expanding the ESLint configuration

- **Lucide React** - Icon library

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Backend server running (see backend README)

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

#### Development
```bash
npm run dev
```

The development server will start on `http://localhost:5173`

#### Build for Production
```bash
npm run build
```

#### Preview Production Build
```bash
npm run preview
```

## Project Structure

```
frontend/
├── public/               # Static assets
├── src/
│   ├── api/             # API service functions
│   │   ├── authAPI.js   # Authentication API calls
│   │   ├── promptAPI.js # Prompt API calls
│   │   └── aiAPI.js     # AI API calls
│   ├── components/      # Reusable UI components
│   │   ├── ui/          # shadcn/ui components
│   │   ├── Navbar.jsx   # Navigation bar
│   │   ├── PromptCard.jsx # Prompt display card
│   │   ├── PromptEditor.jsx # Prompt editing form
│   │   ├── PromptDetails.jsx # Prompt details view
│   │   ├── AIOutput.jsx # AI response display
│   │   ├── VersionHistory.jsx # Version tracking
│   │   ├── Login.jsx    # Login form
│   │   └── Register.jsx # Registration form
│   ├── pages/           # Page components
│   │   ├── Dashboard.jsx # Main dashboard
│   │   └── ...          # Other pages
│   ├── store/           # State management
│   │   └── useAuthStore.js # Authentication state
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # App entry point
│   ├── index.css        # Global styles and Tailwind
│   └── ...              # Other config files
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
└── package.json         # Dependencies and scripts
```

## Key Components

### UI Components (shadcn/ui)
- **Button** - Consistent button styles
- **Card** - Content containers
- **Input/Textarea** - Form inputs
- **Dialog** - Modal dialogs
- **Label** - Form labels
- **Badge** - Status indicators

### Page Components
- **Dashboard** - Main prompt management interface
- **Login/Register** - Authentication forms
- **PromptDetails** - Individual prompt view with AI testing

### API Integration
- **authAPI** - Login, register, get user
- **promptAPI** - CRUD operations for prompts
- **aiAPI** - Test, refine, evaluate prompts

## State Management

### Zustand Store
- **useAuthStore** - Manages authentication state
  - `user` - Current user object
  - `token` - JWT token
  - `login/logout` - Auth actions

### TanStack Query
- Caches API responses
- Handles loading/error states
- Optimistic updates for better UX

## Routing

Uses React Router with protected routes:

- `/` - Dashboard (protected)
- `/login` - Login page
- `/register` - Registration page
- `/prompt/:id` - Prompt details (protected)

## Styling

### Tailwind CSS
- Utility-first approach
- Custom dark theme colors
- Responsive design utilities

### shadcn/ui Theme
- Consistent component styling
- Dark mode support
- Accessible components

### Custom CSS
- Global styles in `index.css`
- Tailwind imports and custom variables

## Features

### Authentication
- JWT-based login/registration
- Protected routes
- Persistent login state

### Prompt Management
- Create, read, update, delete prompts
- Category and tag organization
- Rich text editing

### AI Integration
- Real-time prompt testing with Gemini
- Response history tracking
- Prompt refinement suggestions
- Quality evaluation

### Version Control
- Track prompt changes
- View AI response history
- Compare versions

## Development

### Code Style
- ES6+ JavaScript
- JSX for components
- Consistent naming conventions
- Component composition

### Best Practices
- Functional components with hooks
- Custom hooks for reusable logic
- Error boundaries for error handling
- Loading states for better UX

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint (if configured)

## Environment

The frontend communicates with the backend API at `http://localhost:5000`. Make sure the backend is running before starting the frontend.

## Contributing

1. Follow React best practices
2. Use shadcn/ui components for consistency
3. Test components thoroughly
4. Maintain dark theme compatibility
5. Update component documentation