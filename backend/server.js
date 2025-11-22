// @ts-nocheck

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Route imports
const userRoutes = require("./routes/user");
const contractorRoutes = require("./routes/Contractor");
const serviceRoutes = require("./routes/service");

// Route middleware
app.use("/api/user", userRoutes);
app.use("/api/contractor", contractorRoutes);
app.use("/api/service", serviceRoutes);

// DB + Server
mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(config.port, () =>
      console.log(`Server running on port ${config.port}`)
    );
  })
  .catch((err) => console.error(err));
