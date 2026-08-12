import express from "express";
import helmet from "helmet";
import cors from "cors";
import router from "./routes";
import { errorMiddleware } from "./middleware/error.middleware";
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(errorMiddleware);

app.use('/api', router);

app.get('/health', (req, res) => {
  res.json({status: 'ok'})
})

export default app;
