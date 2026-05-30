# Smart-Hospital-Management-System
A full-stack Hospital Management System built using React, Node.js, Express.js, MySQL, Railway, Render, and Vercel. The platform enables hospitals to manage patients, doctors, appointments, medical records, reports, laboratory tests, and payments through role-based dashboards.

Live Demo
Frontend

https://smart-hospital-management-system-nu.vercel.app/

Backend API

https://smart-hospital-management-system-bqw6.onrender.com/
_________________________________________________________________________________________________________________________________________________________________________________________________________

Features
Admin Module
Admin Login
Dashboard Analytics
Manage Doctors
Manage Patients
Manage Users
View Reports
Manage Laboratory Tests
Appointment Monitoring
Doctor Module
Doctor Login
View Appointments
Add Medical History
Create Medical Records
View Patient Details
Upload Reports
Patient Module
Register & Login
Book Appointments
View Medical History
Download Reports
View Test Results
Online Payments
Laboratory Module
Manage Test Requests
Upload Test Results
Generate Patient Reports
AI Integration
AI-powered report generation support
Medical data processing
Future-ready AI healthcare enhancements
Tech Stack
Frontend
React.js
React Router
Axios
Tailwind CSS
Vite
Backend
Node.js
Express.js
JWT Authentication
Multer File Upload
REST APIs
Database
MySQL
Deployment
Railway (Database)
Render (Backend)
Vercel (Frontend)

________________________________________________________________________________________________________________________________________________________________________________________________________________________
Project Structure:

AI-HOSPITAL-DASHBOARD
│
├── client
│   ├── public
│   ├── src
│   │   ├── api
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   ├── layouts
│   │   ├── pages
│   │   └── App.jsx
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── uploads
│   ├── server.js
│   └── package.json
│
└── README.md

_________________________________________________________________________________________________________________________________________________________________________________________________________________


Database Tables
users
doctors
patients
appointments
medical_records
medical_history
patient_reports
hospital_tests
test_requests
ai_reports

_______________________________________________________________________________________________________________________________________________________________________________________________________________


Installation:

Clone Repository
git clone https://github.com/yourusername/Smart-Hospital-Management-System.git

cd Smart-Hospital-Management-System
Backend Setup
cd server

npm install

npm start
Backend Environment Variables

Create .env

DB_HOST=your_host
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=railway
DB_PORT=3306

JWT_SECRET=your_secret

RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
Frontend Setup
cd client

npm install

npm run dev

_______________________________________________________________________________________________________________________________________________________________________________________________________
API Endpoints:

Authentication:
POST /api/auth/register
POST /api/auth/login

Doctors:
GET /api/doctor
POST /api/doctor
PUT /api/doctor/:id
DELETE /api/doctor/:id

Patients:
GET /api/patients
POST /api/patients

Appointments:
GET /api/appointments
POST /api/appointments

Reports:
GET /api/reports
POST /api/reports

Medical Records:
GET /api/medical
POST /api/medical

Tests:
GET /api/tests
POST /api/tests

Payments:
POST /api/payment/create-order
POST /api/payment/verify

_____________________________________________________________________________________________________________________________________________________________________________________________________

Deployment:

Backend (Render):

Build Command:
npm install

Start Command:
node server.js

Database (Railway):

MYSQLHOST=
MYSQLUSER=
MYSQLPASSWORD=
MYSQLDATABASE=
MYSQLPORT=

Frontend (Vercel):

Framework : Vite
Root Directory : client

Build Command :
npm run build

Output Directory :
dist
Screenshots

_____________________________________________________________________________________________________________________________________________________________________________________________

Add screenshots here:

Login Page
Admin Dashboard
Doctor Dashboard
Patient Dashboard
Appointment Management
Reports Management

__________________________________________________________________________________________________________________________________________________________________________________________________
Future Enhancements:

AI Disease Prediction
AI Chat Assistant
Email Notifications
SMS Notifications
Video Consultation
Prescription Generator
Cloud Storage Integration

_______________________________________________________________________________________________________________________________________________________________________________________________________

Author:

Thanuj Chaduvu

GitHub: https://github.com/Thanujchaduvu
LinkedIn: Add your LinkedIn URL
License

This project is licensed under the MIT License
