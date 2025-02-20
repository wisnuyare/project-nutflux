# Nutflux

This is a Nuxt-based movie app that fetches movie data from an API. To run the project locally, follow the setup instructions below.

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/wisnuyare/project-nutflux.git
   cd movie-app
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

## Environment Variables

To run this project, you need to create an `.env` file in the root directory and define your API key.

1. Create a `.env` file in the root directory.
2. Add the following environment variable:
   ```sh
   NUXT_PUBLIC_API_KEY=your_api_key_here
   ```
   Replace `your_api_key_here` with your actual API key.

> **Important:** Do NOT share your API key publicly or commit it to version control.

## Running the Project

To start the development server, run:

```sh
npm run dev
```

The application will be available at `http://localhost:3000/`.

## Building for Production

To build and serve the application in production mode:

```sh
npm run build
npm run start
```

## License

This project is licensed under the MIT License.
