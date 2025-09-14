# HelloWorld - Full Stack Application

A modern full-stack application built with React, Express, TypeScript, and Vite.

## Features

- **Frontend**: React with TypeScript and Vite
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **UI**: Tailwind CSS with Radix UI components
- **Authentication**: Passport.js with local strategy
- **Real-time**: WebSocket support

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- PostgreSQL database (optional for basic functionality)

### Installation

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Set up environment variables** (optional):
   Create a `.env` file in the root directory:

   ```
   DATABASE_URL=your_postgresql_connection_string
   PORT=3000
   ```

3. **Run the development server**:

   ```bash
   npm run dev
   ```

4. **Access the application**:
   Open your browser and go to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Type check TypeScript
- `npm run db:push` - Push database schema changes

## Project Structure

```
├── client/          # React frontend
├── server/          # Express backend
├── shared/          # Shared types and schemas
├── attached_assets/ # Static assets
└── dist/            # Production build output
```

## Database Setup

For full functionality, you'll need a PostgreSQL database. The application will work with a mock database for basic functionality, but features like authentication and data persistence require a real database.

1. Set up a PostgreSQL database
2. Add the connection string to your `.env` file as `DATABASE_URL`
3. Run `npm run db:push` to create the database tables

## Development

The application runs in development mode by default, which includes:

- Hot reloading for the frontend
- TypeScript compilation
- Vite development server
- Express API server

Both frontend and backend are served from the same port (3000) for simplicity.
