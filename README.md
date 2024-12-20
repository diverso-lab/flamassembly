# flamassembly

**flamassembly** is a lightweight and efficient interface for running Flamapy using Pyodide and WebAssembly in the browser.

## Prerequisites

Ensure that **npm** is installed on your system. If it is not installed, you can install it using:

```bash
sudo apt install npm
```

## Install dependencies

Run the following command at the project root to install local dependencies:

```bash
npm install
```

## Development mode

To run the development server and test the application, use the following command:

```bash
npm start
```

This will start a local server on port 8080. You can access the application by opening your browser and navigating to:

```
http://localhost:8080
```

## Usage

1. Upload your UVL file in the text area.
2. Select an operation from the available buttons.
3. The result of the operation will be displayed in the results section.

## Available scripts

- **`npm start`**: Starts a local development server.
- **`npm run build`**: Placeholder command (no build step required in this project).
- **`npm test`**: Runs tests (to be implemented).

## Project structure

```plaintext
flamassembly/
│
├── package.json          # Project configuration
├── package-lock.json     # Dependency lockfile
├── index.html            # Basic user interface
├── index.js              # Application initialization
├── ui.js                 # User interface logic
├── src/                  # Main source code
│   ├── js/               # Main JavaScript files
│   │   ├── flamapy.js    # Pyodide and Flamapy handler
│   │   └── pyodideWorker.js  # Pyodide worker script
│   └── py/               # Python scripts executed by Pyodide
│       ├── packages.py   # Python dependency installation
│       ├── flamapy_methods.py  # Main Flamapy logic
├── dist/                 # Compiled assets
└── node_modules/         # Node.js dependencies

```

## Contribution

Contributions are welcome! If you find any issues or want to propose improvements, feel free to open an *issue* or a *pull request*.

## License

This project is licensed under the **MIT** license.

---

**Developed with ❤️ by Diverso Lab 🚀**
