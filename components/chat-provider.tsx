"use client"

import { createContext, useContext, useState, useCallback } from "react"
import { Chat } from "./chat"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

interface ChatContextType {
  openChat: () => void
  closeChat: () => void
  isOpen: boolean
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openChat = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeChat = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <ChatContext.Provider value={{ openChat, closeChat, isOpen }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogTitle>Landslide Disaster Management Assistant</DialogTitle>
          <Chat />
        </DialogContent>
      </Dialog>
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}

