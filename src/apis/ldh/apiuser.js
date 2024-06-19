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

export const getUserInfo = async isUser => {
  try {
    const respon = await axios.get(`/api/user?signed_user_id=${isUser}`);
    return respon;
  } catch (error) {
    console.log(error);
  }
};

export const putUserPass = async data => {
  console.log(data);
  try {
    const response = await axios.put(
      `/api/user/password?uid=${data.uid}&upw=${data.upw}&newPw=${data.newPw}`,
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
