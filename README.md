# AI Document Chat System 🚀

A high-performance, full-stack application designed for seamless interaction with PDF documents using advanced AI. Upload, view, and chat with your files through a sophisticated Retrieval Augmented Generation (RAG) pipeline.

---

## 🌟 Project Overview

This platform transforms static PDFs into interactive intelligence. By combining a premium user interface with a robust backend, users can upload multiple documents, visualize them with high precision, and engage in meaningful conversations with an AI that understands the local context of their files.

---

## ✨ Core Features

### 🔐 Authentication & Session Lifecycle
- **Secure Auth**: Robust JWT-based authentication system.
- **Silent Refresh**: Automated session extension using refresh tokens for a seamless user experience.
- **Protected Routes**: Middleware and custom hooks (`useAuthGuard`) to secure sensitive data.
- **Premium UI**: Sleek Login and Signup flows with framer-motion animations.

### 📄 PDF Upload & Processing
- **GridFS Integration**: Large files are handled efficiently using MongoDB's GridFS.
- **Immediate Extraction**: Real-time text extraction using synchronized PDF.js workers.
- **Stateful Processing**: Visual indicators for `processing`, `processed`, and `error` states.
- **Intelligent Chunking**: Automated document splitting for optimized AI context.

### 🖼️ High-Performance PDF Viewer
- **Virtual Rendering**: Uses `react-window` to render only visible pages, allowing for massive documents without lag.
- **Interactive Controls**: Deep zoom (50% - 300%), direct page jumping, and a dynamic thumbnail sidebar.
- **Brand Consistency**: Premium dark-mode aesthetics with custom glassmorphism effects.

### 🤖 AI Document Chat System
- **RAG Architecture**: Semantic search using OpenAI's `text-embedding-3-small` for relevant context retrieval.
- **OpenRouter Integration**: Access to state-of-the-art LLMs (GPT-3.5-Turbo/GPT-4) with reliable fallback mechanisms.
- **Conversational Memory**: Full chat history persistence linked to specific document contexts.

---

## 🛠️ Tech Stack & Architectural Decisions

### Application Architecture
Built on **Next.js 16** with the **App Router**, following a strict separation of concerns:
- **`src/app`**: API routes and page layouts.
- **`src/models`**: Mongoose schemas for Users, Documents, Chunks, and Chats.
- **`src/shared`**: Reusable hooks and UI components.
- **`src/lib`**: Core utilities for Auth, Database, and JWT.

### PDF Processing Strategy
We utilize a **version-synchronized worker strategy** to prevent API mismatches common in modern Node environments. By locking `pdfjs-dist` to the exact version required by our parser (`5.4.296`), we ensure 100% reliable text extraction on both local and production environments.

### AI Chat System Design
The system uses **Cosine Similarity** for vector matching. Even if embeddings fail to generate, a robust **keyword-search fallback** ensures the assistant always has context to provide answers.

### State Management Strategy
We chose **TanStack Query** (React Query) over Redux for state management due to the following architectural advantages:
- **Server State vs. Client State**: Redux is designed for global client state, but 90% of this application's state (documents, chats, session data) is **Server State**. TanStack Query is purpose-built to handle caching, background refetching, and synchronization with the backend.
- **Boilerplate Elimination**: TanStack Query removes the need for complex actions, reducers, and thunks, allowing us to keep the codebase clean and focused on feature logic.
- **Built-in Async Lifecycle**: Features like `isLoading`, `isError`, and `status` are provided natively, ensuring consistent UI states without manual state tracking.
- **Optimistic UI Engine**: Our chat interface relies on TanStack Query's mutation API to provide instant feedback while handling server confirmation in the background.

---

## 📈 Error Handling & Resilience

- **Atomic Uploads**: If one file in a batch fails, the others continue processing.
- **Database Safety**: Mongoose validation and error-aware service layers prevent data corruption.
- **Client Resilience**: Global error boundaries and toast notifications (Sonner) provide clear user feedback.

---

## 🚀 Setup & Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd ai-documents-chat-system
```

### 2. Install dependencies
```bash
npm install --legacy-peer-deps
```

### 3. Environment Variables
Create a `.env.local` file in the root directory and add the following:

| Variable | Description |
| :--- | :--- |
| `MONGODB_URI` | Your MongoDB connection string |
| `JWT_SECRET` | Secret key for access tokens |
| `JWT_REFRESH_SECRET` | Secret key for refresh tokens |
| `OPENROUTER_AI_SECRET_KEY` | Your OpenRouter/OpenAI API key |
| `NEXT_PUBLIC_APP_URL` | http://localhost:3000 |

### 4. Run Development Server
```bash
npm run dev
```

---

## 🔮 Future Improvements
- [ ] Multi-document cross-referencing in a single chat session.
- [ ] Support for OCR on scanned PDFs.
- [ ] Collaborative document workspaces for teams.
- [ ] Exportable AI summaries and citations.

---

