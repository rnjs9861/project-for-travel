import axios from "axios";

export const postLogin = async data => {
  try {
    const res = await axios.post("/api/user/sign-in", data);
    if (res.statusCode === 1) {
      return;
    } else {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};
