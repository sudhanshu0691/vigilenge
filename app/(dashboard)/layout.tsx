import type React from "react"
import { MainNav } from "@/components/main-nav"
import { ChatProvider } from "@/components/chat-provider"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ChatProvider>
      <div className="flex min-h-screen flex-col">
        <MainNav />
        <main className="flex-1">{children}</main>
      </div>
    </ChatProvider>
  )
}

