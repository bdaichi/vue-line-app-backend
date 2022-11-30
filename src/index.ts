import express from "express";
import cors from "cors";

export const app: express.Express = express();
app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, "../../line-app-front")));
app.use(cors());

//CROS対応（というか完全無防備：本番環境ではだめ絶対）
// app.use(
//   (req: express.Request, res: express.Response, next: express.NextFunction) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "*");
//     res.header("Access-Control-Allow-Headers", "*");
//     next();
//   }
// );

app.listen(3000, () => {
  console.log(`Start on port 3000`);
});
