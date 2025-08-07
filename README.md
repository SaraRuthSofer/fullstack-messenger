# 💬 Fullstack Messenger

A real-time messaging application built with React, Node.js, Express, MongoDB, and WebSockets.

## 🚀 Features

- **Real-time messaging** with WebSocket support
- **User authentication** with JWT tokens
- **Private chats** between users
- **Group chats** with multiple participants
- **User management** - view all users, create chats
- **Leave/Join groups** functionality
- **Responsive design** for desktop and mobile
- **Modern UI** with clean design

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Redux** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Use WebSocket** - WebSocket integration
- **Vite** - Build tool and dev server
- **CSS3** - Custom styling

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** with **Mongoose** - Database
- **WebSocket (ws)** - Real-time communication
- **JWT** - Authentication
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables

## 📁 Project Structure

```
fullstack-messenger/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── auth/       # Login/Register components
│   │   │   ├── chats/      # Chat-related components
│   │   │   ├── groups/     # Group management components
│   │   │   ├── layout/     # Layout components
│   │   │   └── messages/   # Message components
│   │   ├── redux/          # Redux store, actions, reducers
│   │   ├── services/       # API and WebSocket services
│   │   └── styles/         # CSS stylesheets
│   ├── index.html
│   └── package.json
├── server/                 # Backend Node.js application
│   ├── handlers/           # WebSocket and message handlers
│   ├── middleware/         # Express middleware
│   ├── models/             # MongoDB models
│   ├── repositories/       # Data access layer
│   ├── routes/             # Express routes
│   ├── services/           # Business logic
│   ├── configs/            # Database configuration
│   ├── .env                # Environment variables
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SaraRuthSofer/fullstack-messenger.git
   cd fullstack-messenger
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Configuration

1. **Set up environment variables**
   
   In the `server` directory, update the `.env` file:
   ```env
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=24h
   
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/fullstack-messenger
   
   # Server Configuration
   PORT=3000
   ```

2. **Start MongoDB**
   Make sure MongoDB is running on your system:
   ```bash
   # For local MongoDB installation
   mongod
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm start
   # or for development with auto-restart:
   npm run dev
   ```
   The server will run on `http://localhost:3000`

2. **Start the frontend development server**
   ```bash
   cd client
   npm run dev
   ```
   The client will run on `http://localhost:5173`

3. **Open your browser**
   Navigate to `http://localhost:5173` to use the application.

## 📖 Usage

### Getting Started
1. **Register** a new account or **Login** with existing credentials
2. **View all users** to start new conversations
3. **Create private chats** by selecting a user
4. **Create group chats** by selecting multiple users
5. **Send messages** in real-time
6. **Manage groups** - view members, leave groups

### API Endpoints

#### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

#### Users
- `GET /users` - Get all users

#### Chats
- `GET /chats` - Get all chats
- `GET /chats/:memberId` - Get chats by member ID
- `POST /chats` - Create new chat
- `PUT /chats/:chatId/:userId` - Leave chat/group

#### Messages
- `GET /messages` - Get all messages
- `GET /messages/:chatId` - Get messages by chat ID

### WebSocket Events

- `chat_message` - Send/receive chat messages
- `new_chat` - Notify users of new chats
- `new_user` - Notify of new user registrations



#### Server
```bash
npm start          # Start the server
npm test           # Run tests (placeholder)
```

#### Client
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

### Project Commands
```bash
# Install all dependencies (run from project root)
npm run install-all

# Start both server and client concurrently
npm run dev

# Build client for production
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js community
- MongoDB team
- All open source contributors

---

⭐ **Star this repository if you found it helpful!**
