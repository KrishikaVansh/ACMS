import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Bell, CheckCircle, Clock, XCircle } from "lucide-react"

export default function AlertsPage() {
  const alerts = [
    {
      id: 1,
      title: "System Update Required",
      description: "Security patch available for installation",
      time: "2 hours ago",
      status: "critical",
      icon: AlertCircle,
    },
    {
      id: 2,
      title: "Unusual Login Activity",
      description: "Multiple failed login attempts detected",
      time: "5 hours ago",
      status: "warning",
      icon: Bell,
    },
    {
      id: 3,
      title: "Disk Space Warning",
      description: "Server storage approaching capacity",
      time: "1 day ago",
      status: "info",
      icon: Clock,
    },
    {
      id: 4,
      title: "Backup Completed",
      description: "Weekly system backup completed successfully",
      time: "2 days ago",
      status: "success",
      icon: CheckCircle,
    },
    {
      id: 5,
      title: "API Integration Failed",
      description: "Connection to third-party service failed",
      time: "3 days ago",
      status: "critical",
      icon: XCircle,
    },
  ]

  return (
    <DashboardLayout>
      <div className="grid gap-4 md:gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Alerts</h1>
          <p className="text-muted-foreground">View and manage system alerts and notifications</p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                All
              </Button>
              <Button variant="outline" size="sm">
                Critical
              </Button>
              <Button variant="outline" size="sm">
                Warning
              </Button>
              <Button variant="outline" size="sm">
                Info
              </Button>
            </div>
            <Button size="sm">Mark All as Read</Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Active Alerts</CardTitle>
              <CardDescription>You have {alerts.length} unread alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-accent">
                    <div
                      className={`mt-0.5 p-2 rounded-full ${
                        alert.status === "critical"
                          ? "bg-destructive/10 text-destructive"
                          : alert.status === "warning"
                            ? "bg-yellow-500/10 text-yellow-500"
                            : alert.status === "success"
                              ? "bg-green-500/10 text-green-500"
                              : "bg-blue-500/10 text-blue-500"
                      }`}
                    >
                      <alert.icon className="h-5 w-5" />
                    </div>
                    <div className="grid gap-1 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium leading-none">{alert.title}</p>
                        <p className="text-xs text-muted-foreground">{alert.time}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <XCircle className="h-4 w-4" />
                      <span className="sr-only">Dismiss</span>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

