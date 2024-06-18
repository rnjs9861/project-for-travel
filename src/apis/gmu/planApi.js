import axios from "axios";
import { SERVER } from "../config";

// 이벤트 저장
export const saveEvent = async event => {
  try {
    const response = await axios.post(`${SERVER}/api/tour/schedule`, event);
    return response.data;
  } catch (error) {
    console.error("Error saving event:", error);
    throw error;
  }
};

// 모든 이벤트 가져오기
export const getAllEvents = async (tourId, tourScheduleDay) => {
  try {
    const response = await axios.get(
      `${SERVER}/api/tour/schedule/tourScheduleList?tour_id=${tourId}&tour_schedule_day=${tourScheduleDay}`,
    );
    if (response.data && typeof response.data === "object") {
      return response.data;
    } else {
      console.error("Invalid response data:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching all events:", error);
  }
};

// 특정 계획 가져오기
export const getOnePlan = async id => {
  try {
    const response = await axios.get(`${SERVER}/api/tour/detail?tour_id=${id}`);
    console.log(response.data); // 응답 데이터 출력
    if (response.data && typeof response.data === "object") {
      if (Array.isArray(response.data)) {
        return response.data.map(tour => ({
          title: tour.tourTitle,
          start: tour.tourStartDay,
          end: tour.tourFinishDay,
        }));
      } else {
        return [response.data].map(tour => ({
          title: tour.tourTitle,
          start: tour.tourStartDay,
          end: tour.tourFinishDay,
        }));
      }
    } else {
      console.error("Invalid response data:", response.data);
      return []; // 빈 배열 반환
    }
  } catch (error) {
    console.error("Error fetching tours:", error);
    throw error;
  }
};

// 계획 생성
export const postPlan = async newPlan => {
  try {
    const response = await axios.post(`${SERVER}/api/tour`, newPlan);
    return response.data; // 서버의 전체 응답 데이터
  } catch (error) {
    console.log(error);
    throw error; // 오류를 던져 상위 함수에서 처리하도록
  }
};
// export const getPlan = async tourId => {
//   try {
//     const response = await axios.get(
//       `${SERVER}/api/tour/detail?tour_id=${tourId}`,
//     );
//     // 서버 응답이 예상과 다를 수 있으므로 확인
//     if (response.data && response.data.resultData) {
//       return response.data.resultData;
//     } else {
//       throw new Error("Invalid response structure");
//     }
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

export const getPlan = async tourId => {
  const response = await axios.get(
    `${SERVER}/api/tour/detail?tour_id=${tourId}`,
  );
  return response.data; // 서버가 반환하는 데이터 구조에 맞춰야 함
};

// 계획 업데이트
export const updatePlan = async (tourId, updatedPlan) => {
  try {
    const response = await axios.put(
      `${SERVER}/api/tour?tour_id=${tourId}`,
      updatedPlan,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error updating plan:", error);
  }
};

// 계획 삭제
export const deletePlan = async (userId, tour_id) => {
  try {
    const response = await axios.delete(
      `${SERVER}/api/tour?tour_id=${tour_id}&signed_user_id=${userId}`,
      {
        params: {
          tour_id: tour_id,
          signed_user_id: userId,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting plan:", error);
  }
};

export const getOneEvent = async (tourId, tourScheduleDay) => {
  try {
    const response = await axios.get(
      `${SERVER}/api/tour/schedule/tourScheduleList?tour_id=${tourId}&tour_schedule_day=${tourScheduleDay}`,
    );
  } catch (error) {
    console.error("Error getting one Event:", error);
  }
};
