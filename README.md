# 🧰 Sam's Toolbox

A collection of simple, self-hosted tools for everyday tasks.

Becuase I'm tired of wasting time watching ads or seeing corporations charge you for simple stuff, so I decided to make my own.

Built as a personal project and with open-source in mind. Contributions are welcome.

## Features

* 🔗 URL Shortener
* 📄 PDF Merger *(Coming soon)*
* *More tools to come*

## Framework

* Next.js
* TypeScript
* PostgreSQL
* Drizzle ORM
* Vitest
* Docker + Docker Compose

## Contributing

Contributions, suggestions, and improvements are welcome!

Feel free to open an issue or pull request if you have an idea, find a bug, or want to improve something.

## Building

### Prerequisites

For local development:

* Node.js 22+
* npm
* PostgreSQL

For the containerized setup:

* Docker
* Docker Compose

## Installation

Clone the repository:

```bash
git clone https://github.com/Lesam24/sams-toolbox.git
cd sams-toolbox
```

### Local development

Install dependencies:

```bash
npm install
```

Create your environment file:

```bash
cp .env.example .env
```

Set your PostgreSQL connection string in `.env`:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/database
```

Run the database migrations:

```bash
npm run db:migrate
```

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Production build

To build and run the production version locally:

```bash
npm run build
npm start
```

### Testing

Run the test suite:

```bash
npm test
```

### 🐳 Docker

To run the application with Docker Compose:

```bash
docker compose up --build
```

The application will be available at `http://localhost:3000`.

To stop the containers:

```bash
docker compose down
```
