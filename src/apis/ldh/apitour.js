import axios from "axios";

export const postList = async data => {
  try {
    const response = await axios.post("/api/tour/checklist", data);
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
