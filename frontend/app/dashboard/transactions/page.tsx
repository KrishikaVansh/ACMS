import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, Download, Filter } from "lucide-react"

export default function TransactionsPage() {
  const transactions = [
    {
      id: "TX-1234",
      date: "2025-03-20",
      description: "Payment from Client A",
      amount: 1250.0,
      status: "completed",
      type: "income",
    },
    {
      id: "TX-1235",
      date: "2025-03-19",
      description: "Server Hosting Fees",
      amount: 299.99,
      status: "completed",
      type: "expense",
    },
    {
      id: "TX-1236",
      date: "2025-03-18",
      description: "Software License Renewal",
      amount: 599.0,
      status: "pending",
      type: "expense",
    },
    {
      id: "TX-1237",
      date: "2025-03-17",
      description: "Payment from Client B",
      amount: 3450.0,
      status: "completed",
      type: "income",
    },
    {
      id: "TX-1238",
      date: "2025-03-16",
      description: "Office Supplies",
      amount: 125.75,
      status: "completed",
      type: "expense",
    },
    {
      id: "TX-1239",
      date: "2025-03-15",
      description: "Subscription Refund",
      amount: 49.99,
      status: "completed",
      type: "income",
    },
  ]

  return (
    <DashboardLayout>
      <div className="grid gap-4 md:gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">View and manage your financial transactions</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              <ArrowUpIcon className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$4,749.99</div>
              <p className="text-xs text-muted-foreground">+12.5% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <ArrowDownIcon className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,024.74</div>
              <p className="text-xs text-muted-foreground">-3.2% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Net Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$3,725.25</div>
              <p className="text-xs text-muted-foreground">+18.7% from last month</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>A list of your recent transactions</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline-block">Filter</span>
              </Button>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline-block">Export</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-5 border-b px-4 py-3 text-sm font-medium">
                <div>ID</div>
                <div>Date</div>
                <div className="col-span-2">Description</div>
                <div className="text-right">Amount</div>
              </div>
              <div className="divide-y">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="grid grid-cols-5 px-4 py-3 text-sm">
                    <div className="font-medium">{transaction.id}</div>
                    <div>{transaction.date}</div>
                    <div className="col-span-2">{transaction.description}</div>
                    <div
                      className={`text-right font-medium ${
                        transaction.type === "income" ? "text-green-500" : "text-destructive"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                    </div>
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

