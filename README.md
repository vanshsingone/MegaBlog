MegaBlog – Full-Stack Blogging Platform

![Status](https://img.shields.io/badge/Status-Completed-success?style=flat-square)
![Frontend](https://img.shields.io/badge/Frontend-React_+_Vite-blue?style=flat-square)
![Backend](https://img.shields.io/badge/Backend-Appwrite-red?style=flat-square)

MegaBlog is a modern, responsive Single Page Application (SPA) designed to let users read, create, edit, and manage blog posts seamlessly. The project leverages Appwrite as a Backend-as-a-Service (BaaS) to handle robust databases, secure media storage, and user authentication, delivering a highly performant and dynamic frontend experience.

---

## 🚀 Features

* **Robust Authentication:** Secure user registration, login, and logout flows completely powered by Appwrite Auth.
* **Global State Management:** Configured a Redux Toolkit store to track the user's authentication status and data globally across the application, entirely eliminating prop-drilling.
* **Protected Routes:** Uses a custom `AuthLayout` wrapper component to ensure that only authenticated users can access restricted pages (like Add Post or Edit Post), automatically redirecting guests to the Login page.
* **Rich Text Publishing:** Seamless integration with TinyMCE allows users to format their blog posts with rich text (bold, italics, headers, lists) rather than plain text.
* **Full CRUD Functionality:** Users have complete control to Create, Read, Update, and Delete their own published content.
* **Image Uploads:** Users can upload featured images for their blog posts, which are stored and served securely from an Appwrite Storage Bucket.

---

## 💻 Tech Stack

**Frontend**
* **React.js** (Bootstrapped with Vite for HMR and fast builds)
* **React Router v7** (For seamless SPA routing)
* **Tailwind CSS v4** (For responsive, utility-first styling)
* **Redux Toolkit & React-Redux** (For global state management)
* **React Hook Form** (For highly performant form handling)
* **TinyMCE & HTML React Parser** (For rich text editing and safely rendering database HTML content)

**Backend / BaaS**
* **Appwrite Auth** (User authentication and session management)
* **Appwrite Databases** (Document database for storing post metadata and content)
* **Appwrite Storage** (Buckets for managing image uploads)

---

## 🛠️ Installation & Setup

**Prerequisites**
Make sure you have Node.js installed. You also need an active [Appwrite](https://appwrite.io/) account and a configured project (with a Database, Collection, and Storage Bucket).

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/megablog.git](https://github.com/your-username/megablog.git)
cd megablog

 2. Environment Setup
Create a .env file in the root directory and add your specific Appwrite configuration variables:
Code snippet
VITE_APPWRITE_URL="YOUR_APPWRITE_API_ENDPOINT"
VITE_APPWRITE_PROJECT_ID="YOUR_APPWRITE_PROJECT_ID"
VITE_APPWRITE_DATABASE_ID="YOUR_APPWRITE_DATABASE_ID"
VITE_APPWRITE_COLLECTION_ID="YOUR_APPWRITE_COLLECTION_ID"
VITE_APPWRITE_BUCKET_ID="YOUR_APPWRITE_STORAGE_BUCKET_ID"


3. Frontend Setup
Bash
# Install all required dependencies
npm install

# Start the Vite React development server
npm run dev


4. Open in Browser
Open your browser and navigate to http://localhost:5173.

📁 Project Structure
src/appwrite/: Contains the core logic and classes for communicating with the Appwrite backend (auth.js for authentication, and config.js for DB/storage services).

src/components/: Contains all reusable UI components (Buttons, Inputs, Header, Footer, PostCards), dedicated form components, and the Rich Text Editor (RTE.jsx).

src/pages/: Contains the top-level views mapped to React Router routes (Home, Login, Signup, AllPosts, AddPost, EditPost, and the individual Post view).

src/store/: Contains the Redux setup (store.js) and the core authentication slice (authSlice.js).

src/conf/: Contains conf.js, a utility configuration file that safely parses and exports all environment variables as strings to prevent runtime type errors.

🤝 Contribution
Contributions, issues, and feature requests are welcome!

📝 License
This project is MIT licensed.
