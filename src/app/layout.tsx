import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { Metadata } from 'next'

import { TRPCReactProvider } from "~/trpc/react";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedOut,
  SignedIn,
  UserButton
} from "@clerk/nextjs";

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
        <html lang="en" className={`${GeistSans.variable}`}>
          <body>
            <header className="flex justify-end items-center p-4 gap-4 h-16">
              <SignedOut>
                <SignInButton />
                <SignUpButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </header>

            {children}
          </body>
        </html>
      </TRPCReactProvider>
    </ClerkProvider>
  );
}
