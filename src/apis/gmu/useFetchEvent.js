import axios from "axios";
import { useEffect, useState } from "react";
import { SERVER } from "../config";

const useFetchEvents = (tourId, date) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${SERVER}/api/tour/schedule/tourScheduleList`,
          {
            params: {
              tour_id: tourId,
              tour_schedule_day: date,
            },
          },
        );
        setEvents(response.data.resultData);
      } catch (err) {
        console.error("Error:", err.message); // 오류 메시지 로그
        console.error("Error details:", err); // 자세한 오류 로그
        if (err.response) {
          // 서버가 응답한 경우
          setError(`Server responded with status code ${err.response.status}`);
        } else if (err.request) {
          // 요청이 이루어졌으나 응답을 받지 못한 경우
          setError("No response received from server");
        } else {
          // 기타 오류
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [tourId, date]);

  return { events, loading, error };
};

export default useFetchEvents;
