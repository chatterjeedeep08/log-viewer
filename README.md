# Log Viewer

A simple React application to upload, parse, and visualize log files in a table format.

## Features

- **Drag & Drop Log File Upload:** Easily upload `.log`, `.txt`, or `.csv` files.
- **Automatic Parsing:** Parses log entries with the format:  
  `HH:MM:SS,Job Description,START|END,PID`
- **Tabular Display:** Shows each job's start/end time, duration, and status indicator.
- **Downloadable Report:** Export the processed log data as a CSV file.
- **Material UI Design:** Clean, responsive interface using Material UI components.

## Getting Started

### Prerequisites

- Node.js (v16 or newer recommended)
- npm or yarn

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/log-viewer.git
    cd log-viewer
    ```

2. Install dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```

3. Start the development server:
    ```sh
    npm start
    # or
    yarn start
    ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Upload a Log File:**  
   Drag and drop your log file into the upload area or use the "Browse Files" button.

2. **View Results:**  
   The table will display each job's ID, description, start/end times, duration, and a status indicator.

3. **Download Report:**  
   Click the "Download Report File" button to export the processed data as a CSV.

## Project Structure

- `src/App.jsx` - Main app component, manages state and layout.
- `src/components/Navbar.jsx` - Top navigation bar.
- `src/components/LogImport.jsx` - Handles file upload and parsing.
- `src/components/LogTable.jsx` - Displays parsed log data in a table.

---

**Made with ❤️ using React and Material UI**