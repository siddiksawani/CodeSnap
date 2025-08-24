# 🪄 CodeSnap AI

> Transform ideas into fully functional websites with the power of AI

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 🎯 What is CodeSnap AI?

CodeSnap AI is a revolutionary web development tool that bridges the gap between ideas and implementation. Simply describe your website in natural language, and watch as AI generates a complete, production-ready project that runs instantly in your browser.

### ✨ Key Features

- **🤖 AI-Powered Generation**: Natural language → Working websites
- **⚡ Instant Preview**: See your website live immediately using WebContainer
- **📁 Smart File Management**: Interactive file explorer with Monaco editor
- **🎨 Modern UI/UX**: Clean, professional dark theme interface
- **📱 Responsive Design**: Works seamlessly across all devices
- **💾 Project Export**: Download complete projects as ZIP files
- **🔧 Zero Setup**: No local development environment needed

## 🚀 Live Demo

![CodeSnap AI Demo](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=CodeSnap+AI+Demo)

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript for type safety
- **Vite** for lightning-fast development
- **Tailwind CSS** for modern styling
- **Monaco Editor** for professional code editing
- **WebContainer API** for browser-based Node.js runtime
- **JSZip** for client-side project downloads

### Backend
- **Node.js** with Express.js
- **TypeScript** for enhanced development experience
- **Anthropic Claude AI** for intelligent code generation
- **CORS** configured for cross-origin requests

### Key Integrations
- **🧠 Anthropic Claude AI**: Powers intelligent code generation
- **🌐 WebContainer**: Enables browser-based Node.js execution
- **💻 Monaco Editor**: Provides VSCode-powered editing experience
- **📦 JSZip**: Handles client-side ZIP file creation

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- Anthropic API key ([Get one here](https://console.anthropic.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/siddiksawani/CodeSnap.git
   cd CodeSnap
   ```

2. **Backend Setup**
   ```bash
   cd be
   npm install
   echo "ANTHROPIC_API_KEY=your_api_key_here" > .env
   npm run dev
   ```

3. **Frontend Setup** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Open your browser**
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:3000`

## 🎨 How to Use

### 1. Describe Your Vision
```
"Create a modern portfolio website with dark theme, hero section, about me, projects showcase, and contact form"
```

### 2. Watch the Magic
- AI analyzes your requirements
- Determines the best technology stack
- Generates complete project structure
- Creates all necessary files and dependencies

### 3. Instant Preview
- Files are mounted in WebContainer
- Dependencies install automatically
- Development server starts instantly
- Live preview becomes available

### 4. Edit & Export
- Navigate files with interactive explorer
- Edit code with Monaco editor
- See changes in real-time
- Download complete project as ZIP

## 📁 Project Structure

```
CodeSnap/
├── README.md
├── be/                          # Backend server
│   ├── src/
│   │   ├── index.ts            # Main API server
│   │   ├── prompts.ts          # AI prompt templates
│   │   └── defaults/           # Project boilerplates
│   │       ├── react.ts        # React project template
│   │       └── node.ts         # Node.js project template
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/                    # React application
    ├── src/
    │   ├── components/          # Reusable UI components
    │   │   ├── TabView.tsx      # Code/Preview tabs
    │   │   ├── CodeEditor.tsx   # Monaco editor wrapper
    │   │   ├── FileExplorer.tsx # Interactive file tree
    │   │   ├── PreviewFrame.tsx # WebContainer preview
    │   │   └── FullScreenPreview.tsx # Modal preview
    │   ├── pages/
    │   │   ├── Home.tsx         # Landing page
    │   │   └── Builder.tsx      # Main development interface
    │   ├── hooks/
    │   │   └── useWebContainer.ts # WebContainer management
    │   └── utils/
    │       └── downloadUtils.ts # ZIP download functionality
    ├── package.json
    └── vite.config.ts
```

## 🎯 Example Use Cases

### Portfolio Website
```
Input: "Create a developer portfolio with hero section, skills, projects, and contact"
Output: Modern React app with routing, animations, and responsive design
```

### Business Landing Page
```
Input: "Build a SaaS landing page with pricing, features, and testimonials"
Output: Complete marketing site with modern UI components
```

### Web Application
```
Input: "Make a todo app with drag-and-drop, categories, and local storage"
Output: Full-featured React app with state management
```

## 🔧 API Endpoints

### Generate Website
```http
POST /api/generate
Content-Type: application/json

{
  "prompt": "Your website description here"
}
```

**Response:**
```json
{
  "files": {
    "package.json": "...",
    "src/index.js": "...",
    "src/App.jsx": "..."
  },
  "steps": ["Step 1", "Step 2", "..."]
}
```

## 🌟 Advanced Features

### Smart Framework Detection
- **React**: For interactive UIs, SPAs, complex frontends
- **Node.js**: For APIs, servers, backend services
- **Automatic**: AI chooses the best framework based on requirements

### Multiple Preview Modes
- **In-App Modal**: Full-screen preview within the application
- **Popup Window**: Separate browser window with embedded iframe
- **Live Reloading**: Changes reflect immediately

### Professional Code Editor
- **Syntax Highlighting**: Multi-language support
- **IntelliSense**: Auto-completion and error detection
- **VSCode Experience**: Familiar editing environment

## 🚀 Deployment

### Frontend (Netlify/Vercel)
```bash
cd frontend
npm run build
# Deploy dist/ folder
```

### Backend (Railway/Heroku)
```bash
cd be
npm install
npm run dev
# Set ANTHROPIC_API_KEY environment variable
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 What Makes CodeSnap Special?

### Zero Setup Required
- No local development environment needed
- No dependencies to install
- Works entirely in your browser

### AI-First Approach
- Natural language → Working code
- Intelligent technology choices
- Best practices built-in

### Instant Gratification
- See results immediately
- Real-time preview
- No waiting for builds

### Professional Output
- Production-ready code
- Modern best practices
- Deployment-ready projects

## 🚀 Future Enhancements

- [ ] Multiple Framework Support (Vue.js, Angular, Svelte)
- [ ] Database Integration (Automatic backend with database)
- [ ] Deployment Integration (One-click deploy to Vercel/Netlify)
- [ ] Template Marketplace (Community-contributed templates)
- [ ] Collaboration Features (Share and remix projects)
- [ ] Version Control Integration
- [ ] Advanced AI Models Support

## 🐛 Issues & Support

Found a bug or have a suggestion? Please [open an issue](https://github.com/siddiksawani/CodeSnap/issues) on GitHub.

## 📧 Contact

**Siddik Sawani** - [@siddiksawani](https://github.com/siddiksawani) - siddikhacker@gmail.com

Project Link: [https://github.com/siddiksawani/CodeSnap](https://github.com/siddiksawani/CodeSnap)

---

<div align="center">

**CodeSnap AI** - Where ideas become reality at the speed of thought ⚡

Made with ❤️ by [Siddik Sawani](https://github.com/siddiksawani)

[⭐ Star this repo](https://github.com/siddiksawani/CodeSnap) | [🐛 Report Bug](https://github.com/siddiksawani/CodeSnap/issues) | [✨ Request Feature](https://github.com/siddiksawani/CodeSnap/issues)

</div>
