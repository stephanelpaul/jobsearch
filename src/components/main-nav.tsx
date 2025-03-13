"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "~/lib/utils"
import { SignedIn } from "@clerk/nextjs"

import { type MainNavRoute } from "~/types"

export function MainNav() {
  const pathname = usePathname()

  const routes: MainNavRoute[] = [
    {
      href: "/",
      label: "Explore",
      active: pathname === "/",
    },
  ]

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {routes.map((route) => {
        if (route?.requiresAuth) {
          return (
            <SignedIn key={route.href}>
              <Link
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  route.active ? "text-primary" : "text-muted-foreground",
                )}
              >
                {route.label}
              </Link>
            </SignedIn>
          )
        }

        return (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              route.active ? "text-primary" : "text-muted-foreground",
            )}
          >
            {route.label}
          </Link>
        )
      })}
    </nav>
  )
}

