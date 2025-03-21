Automated Compliance Management System (ACMS)

## 📌 Overview
The **Automated Compliance Management System (ACMS)** is a web-based application designed to help financial institutions and fintech companies automatically monitor and verify compliance with financial regulations. The system allows an admin or company role to input transaction reports, which are then verified for compliance in real-time. It provides instant alerts for non-compliant transactions and maintains audit logs.

## 🚀 Features
- **Automated Transaction Compliance Checking**
- **Real-time Alerts for Non-Compliant Transactions**
- **Admin Dashboard for Monitoring Transactions**
- **Audit Logs for Compliance Tracking**
- **Financial & Tax Regulation Integration**
- **Machine Learning-based Risk Assessment (Future Enhancement)**
- **Blockchain for Transparent Auditing (Future Enhancement)**

---

## 🏗️ Tech Stack
### **Frontend:**
- **React.js** (Vite setup)
- **React Router** (Navigation)
- **Tailwind CSS** (Styling)

### **Backend:**
- **Flask (Python)** (REST API)
- **PostgreSQL** (Database)
- **smtplib / socket.io** (Real-time notifications)

### **APIs & External Services:**
- **Tax & Financial Compliance APIs**

---

## 📂 Project Structure
```
ACMS/
│── frontend/            # React Frontend
│   ├── src/
│   │   ├── components/  # UI Components (Navbar, Sidebar, Tables, etc.)
│   │   ├── pages/       # Pages (Dashboard, Transactions, Audit Logs, Login)
│   │   ├── App.jsx      # Main React Component
│   │   ├── index.jsx    # React Entry Point
│── backend/             # Flask Backend
│   ├── app.py           # Main Flask App
│   ├── models.py        # Database Models
│   ├── routes.py        # API Routes
│   ├── config.py        # Configuration (DB Connection, API Keys)
│   ├── utils.py         # Helper Functions
│── README.md
│── requirements.txt     # Backend Dependencies
│── package.json         # Frontend Dependencies
```

---

## 🔧 Setup Instructions
### **1️⃣ Backend Setup** (Flask + PostgreSQL)
```sh
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
flask run
```
Make sure PostgreSQL is running, and update `config.py` with your database credentials.

---

### **2️⃣ Frontend Setup** (React + Vite)
```sh
cd frontend
npm install
npm run dev
```
If using Tailwind, initialize it:
```sh
npx tailwindcss init -p
```

---

## 📌 Usage
1. **Admin logs in** and accesses the dashboard.
2. **Transaction reports are automatically verified** against regulations.
3. **Real-time alerts notify admin** if a transaction is non-compliant.
4. **Audit logs are stored** for future reference.




