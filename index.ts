import express from "express";
import { userRouter } from "./src/api/routes/users";

const app = express();

const port: string = process.env.port || "4200";

app.use(express.json());

app.use("/api/v1/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
