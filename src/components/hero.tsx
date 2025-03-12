import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs"

export function Hero() {
  return (
    <div className="bg-muted py-16">
      <div className="container mx-auto px-4">
        <SignedOut>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl">
            Find your next career today within minutes.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Explore job titles and discover related career paths to help plan your professional journey.
          </p>
          <div className="mt-8">
            <SignUpButton mode="modal">
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-base font-medium">
                Get Started
              </button>
            </SignUpButton>
          </div>
        </SignedOut>

        <SignedIn>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl">Welcome back!</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Continue exploring job titles and discover new career opportunities.
          </p>
        </SignedIn>
      </div>
    </div>
  )
}

