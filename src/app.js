import express from 'express'
import cors from 'cors'

const app = express()

// basic configurations
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

// cors configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"]
}))

// import the routes

import healthCheckRouter from "./routes/healthcheck.route.js"
import authRouter from "./routes/auth.routes.js"
app.use("/api/v1/healthcheck", healthCheckRouter)
app.use("/api/v1/auth", authRouter)

app.get('/', (req, res) => {
  res.send('hello world')
})

// global error handler
app.use((err, req, res, _next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Something went wrong'
  res.status(statusCode).json({
    statusCode,
    message,
    errors: err.errors || [],
    success: false,
  })
})

export default app
