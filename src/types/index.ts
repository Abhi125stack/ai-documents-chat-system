import { ReactNode } from "react";

// --- User Types ---
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  message: string;
  success: boolean;
  user: User;
  token: string;
  refreshToken?: string;
}

// --- Document Types ---
export type DocumentStatus = 'processed' | 'processing' | 'error';

export interface DocumentMetadata {
  _id: string;
  name: string;
  size: number;
  fileId: string;
  userId: string;
  pages?: number;
  status: DocumentStatus;
  isStarred?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface UploadResponse {
  message: string;
  success: boolean;
  documents: DocumentMetadata[];
}

// --- Chat Types ---
export interface Message {
  id?: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: string;
}

export interface ChatMetadata {
  _id: string;
  userId: string;
  documentId?: string;
  documentIds?: string[];
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export interface PopulatedChatMetadata extends Omit<ChatMetadata, 'documentId'> {
  documentId: DocumentMetadata;
}

export interface ChatHistoryResponse {
  message: string;
  success: boolean;
  chats: PopulatedChatMetadata[];
}

// --- Component Prop Types ---
export interface DocumentListProps {
  title?: string | null;
  showCount?: boolean;
  search?: string;
}

export interface LayoutProps {
  children: ReactNode;
}

// --- API Request Types ---
export interface LoginCredentials {
  email?: string;
  password?: string;
}

export interface SignupData extends LoginCredentials {
  name?: string;
}
