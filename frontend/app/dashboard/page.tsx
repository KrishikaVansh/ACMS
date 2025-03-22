import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, BarChart3, FileText, Users, FileUp } from "lucide-react"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="grid gap-4 md:gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Company Dashboard</h1>
          <p className="text-muted-foreground">Overview of your company metrics and activity</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+3 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 new since yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,458</div>
              <p className="text-xs text-muted-foreground">From 3 uploaded documents</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Documents</CardTitle>
              <FileUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">3 uploaded this month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Transaction Overview</CardTitle>
              <CardDescription>Monthly transaction volume from uploaded documents</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="text-muted-foreground flex flex-col items-center">
                <BarChart3 className="h-16 w-16 mb-2" />
                <p>Transaction chart visualization</p>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Recent Document Uploads</CardTitle>
              <CardDescription>Latest documents uploaded to the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Q1_Transactions.csv",
                    description: "CSV file with 458 transactions",
                    time: "2 hours ago",
                    type: "csv",
                  },
                  {
                    title: "February_Report.pdf",
                    description: "Monthly financial report",
                    time: "5 hours ago",
                    type: "pdf",
                  },
                  {
                    title: "Client_Invoices.docx",
                    description: "Invoice template document",
                    time: "1 day ago",
                    type: "doc",
                  },
                ].map((doc, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div
                      className={`mt-0.5 p-2 rounded-full ${
                        doc.type === "csv"
                          ? "bg-green-500/10 text-green-500"
                          : doc.type === "pdf"
                            ? "bg-yellow-500/10 text-yellow-500"
                            : "bg-blue-500/10 text-blue-500"
                      }`}
                    >
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">{doc.title}</p>
                      <p className="text-sm text-muted-foreground">{doc.description}</p>
                      <p className="text-xs text-muted-foreground">{doc.time}</p>
                    </div>
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

