import { UserModel } from "../models/user_model";

export function createUserJSON(
  emailAddress: string,
  userBio: string,
  userIcon: string,
  userId: string,
  userName: string
) {
  const userJSON: UserModel = {
    emailAddress: emailAddress,
    userBio: userBio,
    userIcon: userIcon,
    userId: userId,
    userName: userName,
  };
  return userJSON;
}
