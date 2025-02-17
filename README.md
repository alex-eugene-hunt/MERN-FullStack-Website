# Personal Portfolio Website - MERN Stack

A modern, interactive personal portfolio website built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. This portfolio showcases my projects, skills, and experience in a dynamic and engaging way.

## 🚀 Tech Stack

### Frontend
- **React.js** - Frontend framework
- **React Router DOM** - Client-side routing
- **Three.js** & **Vanta.js** - 3D graphics and animations
- **React Icons** - Icon components
- **React PDF** - PDF rendering for resume
- **Typewriter Effect** - Text animation effects
- **Custom Fonts** - Using @fontsource packages for Faster One, Press Start 2P, Lobster, Monoton, and Montserrat

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** with **Mongoose** - Database and ODM
- **Nodemailer** - Email functionality
- **@xenova/transformers** - AI/ML integration
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment variable management

### Development & Build Tools
- **concurrently** - Run multiple npm scripts simultaneously
- **React Scripts** - Create React App configuration and build tools
- **ESLint** - Code linting and style enforcement

## 🏗️ Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   └── ...
│   └── package.json       # Frontend dependencies
├── server/                # Backend Node.js server
│   ├── routes/           # API routes
│   ├── index.js         # Server entry point
│   └── package.json     # Backend dependencies
└── package.json          # Root project configuration
```

## ⚙️ Key Features

- **Modern UI/UX** - Responsive design with smooth animations and transitions
- **Interactive Components** - Dynamic sections for projects, experience, and skills
- **Contact Form** - Email functionality using Nodemailer
- **PDF Resume View** - Integrated PDF viewer for resume display
- **3D Graphics** - Enhanced visual experience using Three.js and Vanta.js
- **Custom Styling** - Carefully crafted CSS with custom fonts and animations

## 🛠️ Implementation Details

### Frontend Architecture
- Implemented using React.js with functional components and hooks
- State management using React's Context API
- Responsive design using modern CSS features
- Component-based architecture for maintainability
- Custom animations and transitions for enhanced UX

### Backend Architecture
- RESTful API design using Express.js
- MongoDB integration for data persistence
- Email service implementation using Nodemailer
- Environment variable management for secure configuration
- CORS configuration for secure client-server communication

### Performance Optimizations
- Lazy loading of components
- Optimized asset loading
- Efficient state management
- Responsive image handling

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   cd client && npm install
   cd ../server && npm install
   ```
3. Create a `.env` file in the server directory with necessary environment variables
4. Run the development server:
   ```bash
   npm run dev
   ```

## 📝 Environment Variables

The following environment variables are required in the server's `.env` file:
- `MONGODB_URI` - MongoDB connection string
- `EMAIL_USER` - Email service username
- `EMAIL_PASS` - Email service password
- `PORT` - Server port (default: 3000)

## 🌟 Future Enhancements

- Add authentication system
- Implement blog section
- Add more interactive 3D elements
- Enhance mobile responsiveness
- Add more animation effects
- Implement dark/light theme toggle

## 📄 License

This project is licensed under the ISC License.
