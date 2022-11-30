import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { UserModel } from "../models/user_model";
import { auth } from "./firebase_service";
import { createUserJSON } from "./user_service";

export async function SignIn(email: string, password: string) {
  let currentUser: UserModel | null = null;
  let errorCode: string = "";
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    if (result.user.email) {
      //TODO: Userテーブルからユーザーのデータを取得してcreateUserJSONに渡す
      currentUser = createUserJSON(result.user.email, "", "", "", "");
    } else {
      //TODO: emialが空なのはfirebase側のエラーなのでどうしようもないので
      //入力されたemailを使用してDBからユーザーデータを取得する
    }
  } catch (error) {
    const firebaseError = error as FirebaseError;
    function FirebaseErrorCode() {
      switch (firebaseError.code) {
        case "auth/invalid-email":
          return "メールアドレスが無効です";
        case "auth/user-disabled":
          return "このメールアドレスのアカウントは無効になっております"; //こんな事言われてもユーザーどうしようもなくね？？
        case "auth/user-not-found":
          return "メールアドレスが違います";
        case "auth/wrong-password":
          return "パスワードが違います";
        default:
          return "";
      }
    }
    currentUser = null;
    errorCode = FirebaseErrorCode();
  }
  return { user: currentUser, errorCode: errorCode };
}

export async function SignUp(email: string, password: string) {
  let newUser: UserModel | null = null;
  let errorCode: string = "";
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    if (result.user.email) {
      newUser = createUserJSON(result.user.email, "", "", "", "");
      //TODO:ユーザーDBに新しくデータを追加する
    } else {
      //TODO: emialが空なのはfirebase側のエラーなのでどうしようもないので
      //入力されたemailを使用してユーザーDBに新しくデータを追加する
    }
  } catch (error) {
    const firebaseError = error as FirebaseError;
    function FirebaseErrorCode() {
      switch (firebaseError.code) {
        case "auth/email-already-in-use":
          return "このメールアドレスは登録済みです";
        case "auth/invalid-email":
          return "メールアドレスが無効です";
        //下記のケースはエラーを返したところでユーザーが対処できないのでコメントアウトしておく
        // case "auth/operation-not-allowed":
        // return "";
        case "auth/weak-password":
          return "パスワードが脆弱です";
        default:
          return "";
      }
    }
    errorCode = FirebaseErrorCode();
  }
  return { user: newUser, errorCode: errorCode };
}
