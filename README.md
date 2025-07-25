# Certificate Manager App

A desktop application for generating, managing, and sending certificates, built with React and Electron.

## 🖥️ How to Install & Run (Windows)

1. **Install [Node.js](https://nodejs.org/) if you don’t already have it.**
2. **Download this repository:**
    - Click the green “Code” button and choose “Download ZIP”.
    - Unzip the folder to your computer.

3. **Open a command prompt (Win+R → cmd) and navigate to the folder:**
    ```bash
    cd path\to\certificate-manager-app
    ```

4. **Install dependencies:**
    ```bash
    npm install
    ```

5. **Build the React app:**
    ```bash
    npm run build
    ```

6. **Launch the desktop app:**
    ```bash
    npm run electron
    ```

7. **(Optional) Create a Windows installer (.exe):**
    ```bash
    npm run package
    ```
    - The installer will appear in the `dist` folder.

---

## 📝 Features

- Upload participants via CSV
- Manage certificate templates
- Generate and send certificates
- Configure email settings
- View history of sent certificates
- All runs locally—no internet required

---

## 🔒 Security

Your files and data are processed locally. No information is sent online.

---

## 🛠️ Customization

- Edit certificate templates in the `/templates` folder (if you want to add document templates).
- To add PDF generation or other formats, see the Electron/React documentation.

---

*For any questions or improvements, open an issue on GitHub!*
