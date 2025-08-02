# Baze Pay: Your Seamless Peer-to-Peer Payment Solution

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)

## Project Overview

In today's fast-paced world, traditional money transfers can often be slow, complex, and lack a modern user experience. Baze Pay addresses this by providing a streamlined, secure, and intuitive platform for users to send and receive money instantly with just a few clicks. It's designed for anyone who needs a fast and reliable way to manage personal digital transactions, offering a smooth and secure financial interaction experience.

## Features

### Secure User Authentication
- Seamless signup and sign-in processes.
- Utilizes JSON Web Tokens (JWT) for secure, stateless authentication, ensuring user sessions are protected.

### Comprehensive User Management
- Users can update their personal details (first name, last name, password) securely.
- Efficient search functionality allows users to easily find and connect with other registered users by first or last name.

### Real-time Account Balance
- Users can view their current account balance instantly on the dashboard, providing immediate financial oversight.

### Atomic Money Transfers
- Implements a robust transaction mechanism ensuring that money transfers are either fully completed or entirely rolled back, guaranteeing data integrity and preventing partial transactions.
- Includes checks for insufficient balance and invalid recipient accounts to enhance security and reliability.

### Responsive User Interface
- Built with React and styled using Tailwind CSS for a modern, mobile-friendly experience that adapts to various screen sizes.

### Payment Status Notifications
- Provides immediate feedback on transfer success or failure, guiding the user through the transaction process.

## Tech Stack

### Frontend
- **React:** A declarative, component-based JavaScript library for building user interfaces. Chosen for its efficiency, reusability, and large ecosystem.
- **Vite:** A next-generation frontend tooling that provides an extremely fast development experience and optimized build performance.
- **React Router DOM:** Standard library for declarative routing in React applications, enabling seamless navigation between pages.
- **Axios:** A promise-based HTTP client for making API requests from the browser, simplifying data fetching and interaction with the backend.
- **Tailwind CSS:** A utility-first CSS framework that allows for rapid UI development by composing classes directly in markup, leading to highly customizable and responsive designs.

### Backend
- **Node.js & Express.js:** A powerful JavaScript runtime and a minimalist web framework, respectively, chosen for building scalable and efficient server-side applications and RESTful APIs.
- **Mongoose:** An elegant MongoDB object modeling tool for Node.js, providing a schema-based solution to model application data and interact with MongoDB.
- **JSON Web Token (JWT):** A compact, URL-safe means of representing claims to be transferred between two parties, used here for secure user authentication and authorization.
- **Zod:** A TypeScript-first schema declaration and validation library, used for robust input validation on API endpoints, ensuring data integrity and security.
- **CORS:** Middleware to enable Cross-Origin Resource Sharing, allowing the frontend to safely communicate with the backend.

### Database
- **MongoDB:** A NoSQL, document-oriented database. Chosen for its flexibility, scalability, and ability to handle large volumes of unstructured data, which is well-suited for rapid application development and evolving data models.
