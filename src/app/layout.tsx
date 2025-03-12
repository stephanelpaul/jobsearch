import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from 'next'

import { TRPCReactProvider } from "~/trpc/react";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedOut,
  SignedIn,
  UserButton
} from "@clerk/nextjs";
import { ThemeProvider } from "~/providers/theme-provider";
import { ThemeToggle } from "~/components/theme-toggle";
import { MainNav } from "~/components/main-nav";

export const metadata: Metadata = {
  title: 'JobSearch',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
    other: [
      { url: '/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png' }
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <TRPCReactProvider>
        <html lang="en" className={`${GeistSans.variable}`} suppressHydrationWarning>
          <body>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>

            <div className="min-h-screen flex flex-col pt-16">
                <header className="flex justify-between items-center px-4 h-16 fixed top-0 left-0 right-0 bg-background border-b shadow-sm z-10">
                  <div className="flex items-center gap-6">
                    <div className="font-semibold text-lg">Job Titles Explorer</div>
                    <MainNav />
                  </div>
                  <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <SignedOut>
                      <SignInButton mode="modal">
                        <button className="text-sm font-medium hover:underline">Sign In</button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium">
                          Sign Up
                        </button>
                      </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                      <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                  </div>
                </header>
                <main className="flex-1">{children}</main>
              </div>

            {/* <header className="flex justify-end items-center p-4 gap-4 h-16 fixed top-0 left-0 right-0 bg-white shadow-md z-10">
              <SignedOut>
              <SignInButton />
              <SignUpButton />
              </SignedOut>
              <SignedIn>
              <UserButton />
              </SignedIn>
            </header> */}

            {children}
            </ThemeProvider>
          </body>
        </html>
      </TRPCReactProvider>
    </ClerkProvider>
  );
}
