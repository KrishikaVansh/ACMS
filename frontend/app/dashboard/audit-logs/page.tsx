import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function AuditLogsPage() {
  const auditLogs = [
    {
      id: "LOG-1234",
      timestamp: "2025-03-21 14:32:45",
      user: "admin@example.com",
      action: "USER_LOGIN",
      description: "User logged in successfully",
      ip: "192.168.1.1",
    },
    {
      id: "LOG-1235",
      timestamp: "2025-03-21 13:45:12",
      user: "john.doe@example.com",
      action: "SETTINGS_UPDATED",
      description: "User updated account settings",
      ip: "192.168.1.2",
    },
    {
      id: "LOG-1236",
      timestamp: "2025-03-21 12:30:05",
      user: "admin@example.com",
      action: "USER_CREATED",
      description: "New user account created",
      ip: "192.168.1.1",
    },
    {
      id: "LOG-1237",
      timestamp: "2025-03-21 11:22:18",
      user: "jane.smith@example.com",
      action: "PAYMENT_PROCESSED",
      description: "Payment of $299.99 processed",
      ip: "192.168.1.3",
    },
    {
      id: "LOG-1238",
      timestamp: "2025-03-21 10:15:33",
      user: "system",
      action: "BACKUP_COMPLETED",
      description: "System backup completed successfully",
      ip: "192.168.1.4",
    },
    {
      id: "LOG-1239",
      timestamp: "2025-03-21 09:05:27",
      user: "admin@example.com",
      action: "SETTINGS_UPDATED",
      description: "System settings updated",
      ip: "192.168.1.1",
    },
    {
      id: "LOG-1240",
      timestamp: "2025-03-21 08:45:10",
      user: "john.doe@example.com",
      action: "USER_LOGOUT",
      description: "User logged out",
      ip: "192.168.1.2",
    },
  ]

  return (
    <DashboardLayout>
      <div className="grid gap-4 md:gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Audit Logs</h1>
          <p className="text-muted-foreground">View system activity and user actions</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>System Logs</CardTitle>
                <CardDescription>A detailed history of all system activities</CardDescription>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search logs..." className="w-full pl-8 sm:w-[240px]" />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-9 gap-1">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-9 gap-1">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-12 border-b px-4 py-3 text-sm font-medium">
                <div className="col-span-2">ID</div>
                <div className="col-span-2">Timestamp</div>
                <div className="col-span-2">User</div>
                <div className="col-span-2">Action</div>
                <div className="col-span-3">Description</div>
                <div className="col-span-1">IP</div>
              </div>
              <div className="divide-y">
                {auditLogs.map((log) => (
                  <div key={log.id} className="grid grid-cols-12 px-4 py-3 text-sm">
                    <div className="col-span-2 font-medium">{log.id}</div>
                    <div className="col-span-2">{log.timestamp}</div>
                    <div className="col-span-2 truncate">{log.user}</div>
                    <div className="col-span-2">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          log.action.includes("LOGIN")
                            ? "bg-green-500/10 text-green-500"
                            : log.action.includes("LOGOUT")
                              ? "bg-yellow-500/10 text-yellow-500"
                              : log.action.includes("CREATED")
                                ? "bg-blue-500/10 text-blue-500"
                                : "bg-gray-500/10 text-gray-500"
                        }`}
                      >
                        {log.action}
                      </span>
                    </div>
                    <div className="col-span-3 truncate">{log.description}</div>
                    <div className="col-span-1">{log.ip}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

