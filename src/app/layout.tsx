import "../styles/globals.css";

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from "./_components/navbar";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Goalden',
  description: 'An all-in-one app to manage your goals.',
  icons: [{ rel: "icon", url: "/favicon.ico" }]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar></Navbar>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
