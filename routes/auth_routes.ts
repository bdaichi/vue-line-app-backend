import { SignIn, SignUp } from "../services/auth_service";
import { app } from "../src/index";

app.post("/signIn", async (req, res) => {
  const signInData = await SignIn(req.body.email, req.body.password);
  res.status(200).send(signInData);
});

app.post("/signUp", async (req, res) => {
  //TODO:newUserの変数名を変更
  const signUpData = await SignUp(req.body.email, req.body.password);
  res.status(201).send(signUpData);
});
