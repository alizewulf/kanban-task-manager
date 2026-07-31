import express from "express"
import healthRouter from './routes/health.routes'
import { loggerMiddleware } from "./middleware/middleware.logger"
import usersRouter from './routes/users.routes'
const app = express()


const PORT = 3000
app.use(express.json());

app.use((req, _res, next) => {
  console.log("BODY MIDDLEWARE:", req.body);
  next();
});

app.use(loggerMiddleware);

app.use(loggerMiddleware)
app.use("/users", usersRouter)
app.use("/health", healthRouter)
app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
})
