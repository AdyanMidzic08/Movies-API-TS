# Movie Watchlist API & App

A full-stack TypeScript application for managing your personal movie watchlist. This project demonstrates a RESTful API built with Express.js and a dynamic frontend, both developed using TypeScript.

## Features

- **Manage Watchlist**: Add new movies with title and release year.
- **Track Progress**: Mark movies as "Watched" or "Unwatched".
- **Organized Views**: Automatically separates movies into "Current List" and "Have Watched".
- **Detailed View**: Click on any movie to see details and toggle its status.
- **Data Persistence**: Movies are stored in a local JSON file, ensuring data isn't lost on server restart.
- **Responsive Design**: Clean and modern UI.

## Tech Stack

- **Language**: [TypeScript](https://www.typescriptlang.org/) (Backend & Frontend)
- **Backend Framework**: [Express.js](https://expressjs.com/)
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (compiled from TS)
- **Data Storage**: JSON file-based storage
- **Utilities**: `uuid` for unique IDs.

## Installation

1.  **Clone the repository**

    ```bash
    git clone <https://github.com/AdyanMidzic08/Movies-API-TS>
    cd Movies-API
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Build the project**
    Compiles the TypeScript code for both server and client.
    ```bash
    npm run build
    ```

## Usage

### Development Mode

Run the server with hot-reloading (backend):

```bash
npm run dev
```

_Note: You need to run `npm run build` manually if you make changes to the frontend `script.ts` to update the `dist/script.js`._

### Production Start

Start the compiled server:

```bash
npm run
```

Open your browser and navigate to:
`http://localhost:3000`

## API Endpoints

The application provides a RESTful API at `http://localhost:3000/movies`.

| Method   | Endpoint      | Description           | Body (JSON)                             |
| :------- | :------------ | :-------------------- | :-------------------------------------- |
| `GET`    | `/movies`     | Retrieve all movies   | -                                       |
| `POST`   | `/movies`     | Add a new movie       | `{ "title": "String", "year": Number }` |
| `PUT`    | `/movies/:id` | Update watched status | `{ "watched": Boolean }`                |
| `DELETE` | `/movies/:id` | Delete a movie        | -                                       |

## Project Structure

```
Movies-API/
├── public/             # Frontend assets
│   ├── site/           # HTML pages
│   ├── style.css       # Global styles
│   └── index.html      # Landing page
├── src/                # Source code
│   ├── app.ts          # Express application setup
│   ├── server.ts       # Server entry point
│   ├── script.ts       # Frontend logic (TypeScript)
│   ├── storage.ts      # JSON file handler
│   └── types.ts        # TypeScript interfaces
├── dist/               # Compiled JavaScript (generated)
├── movies.json         # Data store
└── package.json        # Project configuration
```

## License

This project is licensed under the ISC License.
