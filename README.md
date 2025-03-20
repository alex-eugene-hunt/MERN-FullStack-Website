# www.alex-eugene-hunt.rocks

# Personal Portfolio Website - MERN Stack

This is an idividual project I did recently. The site is live at www.alex-eugene-hunt.rocks and is a portfolio website I made from scratch.

It is a personal portfolio website built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. This portfolio showcases my projects, skills, and experience in a dynamic and engaging way.

There are 3 main features I added to the homepage, that being a Fine-Tuned LLM that was trained on my personal information, a email sending box, and a asteroids game with a global leaderboard.

## Tech Stack

### Frontend - Live on Netlify
- **React.js** - Frontend framework
- **React Router DOM** - Client-side routing
- **Three.js** & **Vanta.js** - 3D graphics and animations
- **React Icons** - Icon components
- **React PDF** - PDF rendering for resume
- **Typewriter Effect** - Text animation effects
- **Custom Fonts** - Using @fontsource packages for Faster One, Press Start 2P, Lobster, Monoton, and Montserrat

### Backend - Live on Render
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

## Project Structure

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

## Implementation Details

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

## Environment Variables

The following environment variables are required in the server's `.env` file:
- `MONGODB_URI` - MongoDB connection string
- `EMAIL_USER` - Email service username
- `EMAIL_PASS` - Email service password
- `PORT` - Server port (default: 3000)

## Future Enhancements

- Add authentication system
- Implement blog section
- Add more interactive 3D elements
- Enhance mobile responsiveness
- Add more animation effects
- Implement dark/light theme toggle

## License

This project is licensed under the ISC License.
