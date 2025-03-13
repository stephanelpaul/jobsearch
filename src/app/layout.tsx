import type React from "react"
import "~/styles/globals.css"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { TRPCReactProvider } from "~/trpc/react"
import { ThemeProvider } from "~/providers/theme-provider"
import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { MainNav } from "~/components/main-nav"

export const metadata = {
  title: "Job Titles Explorer",
  description: "Explore job titles and discover related career paths",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.className} ${GeistMono.className}`}>
      <body>
        <ClerkProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <TRPCReactProvider>
              <div className="min-h-screen flex flex-col pt-16">
                <header className="flex justify-between items-center px-4 h-16 fixed top-0 left-0 right-0 bg-background border-b shadow-sm z-10">
                  <div className="flex items-center gap-6">
                    <div className="font-semibold text-lg">Job Titles Explorer</div>
                    <MainNav />
                  </div>
                  <div className="flex items-center gap-4">
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
                      <UserButton />
                    </SignedIn>
                  </div>
                </header>
                <main className="flex-1">{children}</main>
              </div>
            </TRPCReactProvider>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
