import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">RexFinance</h1>
      <p className="text-xl mb-8">Gamified Learning Platform for Investment Banking & Consulting Careers</p>
      <div className="flex gap-4">
        <Button>Get Started</Button>
        <Button variant="outline">Login</Button>
        <Button variant="ghost" asChild>
          <a href="/design-system">Design System</a>
        </Button>
      </div>
    </div>
  );
}
