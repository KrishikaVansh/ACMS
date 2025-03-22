import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
          <CardDescription>Access your admin dashboard or login to your account</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex flex-col gap-2">
            <Link href="/dashboard">
              <Button className="w-full">Go to Dashboard</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="w-full">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="ghost" className="w-full">
                Sign Up
              </Button>
            </Link>
          </div>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">© 2025 Admin Dashboard. All rights reserved.</CardFooter>
      </Card>
    </div>
  )
}

