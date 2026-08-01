const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const aiRoutes = require("./routes/aiRoutes");

app.use("/api/ai", aiRoutes);

const patientRoutes = require("./routes/patientRoutes");

app.use("/api/patient", patientRoutes);

// Database
const db = require("./config/db");

db.query("SELECT NOW()")
  .then(() => console.log("✅ PostgreSQL Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/patients", require("./routes/patientRoutes"));
app.use("/api/doctors", require("./routes/doctorRoutes"));
app.use(
  "/api/appointments",
  require("./routes/appointmentRoutes")
);
app.use(
  "/api/patient/appointments",
  require("./routes/patientAppointmentRoutes")
);
app.use(
  "/api/doctor/appointments",
  require("./routes/doctorAppointmentRoutes")
);
app.use("/api/departments", require("./routes/departmentRoutes"));

app.use("/api/reports", require("./routes/reportRoutes"));

app.use("/api/billing", require("./routes/billingRoutes"));

app.use(
  "/api/laboratory-staff",
  require("./routes/laboratoryStaffRoutes")
);

app.use(
  "/api/pharmacy-staff",
  require("./routes/pharmacyStaffRoutes")
);

// Static files
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI Hospital Backend Running 🚀",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
