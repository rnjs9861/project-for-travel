import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SERVER } from "../../apis/config";
import EventModalForAll from "./EventModalForAll";

// 랜덤 색상 생성 함수
const getRandomColor = () => {
  const colors = [
    "#FF0000",
    "#FFA500",
    "#1e88e5",

    "#008000",
    "#0000FF",
    "#4B0082",
    "#EE82EE",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// API 호출을 위한 함수
const getAllPlans = async userId => {
  try {
    const response = await axios.get("/api/tour", {
      params: { signed_user_id: userId },
    });
    return response.data.resultData; // resultData에서 배열을 반환
  } catch (error) {
    console.error("Failed to fetch plans", error);
    throw error;
  }
};

const getEventsForDate = async (tourId, date) => {
  try {
    const response = await axios.get(
      `${SERVER}/api/tour/schedule/tourScheduleList?tour_id=${tourId}&tour_schedule_day=${date}`,
    );
    return response.data.resultData.map(event => ({
      tourScheduleId: event.tourScheduleId,
      tourScheduleTitle: event.title,
      start: `${event.tourScheduleDay}T${event.tourScheduleStart}`,
      end: `${event.tourScheduleDay}T${event.tourScheduleEnd}`,
      tourScheduleDay: event.tourScheduleDay,
      description: event.contents,
      expense: event.cost,
    }));
  } catch (error) {
    console.error("Error loading events for selected date:", error);
    return [];
  }
};

const CalendarsForAllPlan = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateEvents, setDateEvents] = useState([]);
  const [selectedTourId, setSelectedTourId] = useState(null); // 선택된 투어 ID 상태 추가
  const navigate = useNavigate();

  useEffect(() => {
    const loadAllData = async () => {
      try {
        const userId = localStorage.getItem("user");

        if (!userId) {
          console.error("User ID not found in localStorage");
          return;
        }

        const plans = await getAllPlans(userId);

        if (!plans || !Array.isArray(plans)) {
          console.error("Plans data is not an array or is undefined:", plans);
          return;
        }

        const planEvents = plans.map(plan => ({
          id: plan.tourId,
          title: plan.title,
          start: plan.tourStartDay,
          end: new Date(plan.tourFinishDay).toISOString(),
          backgroundColor: getRandomColor(),
          extendedProps: {
            location: plan.tourLocation,
          },
        }));

        setEvents(planEvents);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadAllData();
  }, []);

  const handleDateClick = async info => {
    setSelectedDate(info.dateStr);

    // 선택된 날짜에 해당하는 투어를 필터링하여 가져옵니다
    const filteredTours = events.filter(event => {
      const eventStart = new Date(event.start).toISOString().split("T")[0];
      const eventEnd = new Date(event.end).toISOString().split("T")[0];
      return eventStart <= info.dateStr && eventEnd >= info.dateStr;
    });

    if (filteredTours.length === 0) {
      console.error("No tours found for the selected date");
      setDateEvents([]);
      return;
    }

    const tourId = filteredTours[0].id; // 필터된 첫 번째 투어의 tourId 사용

    setSelectedTourId(tourId); // 선택된 tourId 상태 업데이트

    try {
      const eventsForDate = await getEventsForDate(tourId, info.dateStr);
      setDateEvents(eventsForDate);
    } catch (error) {
      console.error("Error loading events for selected date:", error);
    }
  };

  const handleEventSubmit = event => {
    setEvents(prevEvents => [...prevEvents, event]);
  };

  const handleEventClick = info => {
    const eventId = info.event.id;
    navigate(`/plan/${eventId}`);
  };

  return (
    <>
      <CalendarContainer>
        <Calendar>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            dateClick={handleDateClick}
            events={events}
            eventClick={handleEventClick}
            eventContent={renderEventContent}
          />
        </Calendar>

        <EventModalWrap>
          {selectedDate && (
            <>
              <SelectedDate>{selectedDate} 일정</SelectedDate>
              <EventModalForAll
                date={selectedDate}
                onSubmit={handleEventSubmit}
                events={dateEvents}
                tourId={selectedTourId}
              />
            </>
          )}
        </EventModalWrap>
      </CalendarContainer>
    </>
  );
};

const renderEventContent = eventInfo => (
  <div>
    <i>{eventInfo.event.title}</i>
  </div>
);

export default CalendarsForAllPlan;

// Styled-components

const CalendarContainer = styled.div`
  display: flex;
`;

const Calendar = styled.div`
  flex: 1;
`;

const EventModalWrap = styled.div`
  width: 300px;
  padding: 20px;
  border-left: 1px solid #ccc;
  background-color: #f9f9f9;
  overflow-y: auto;
`;

const SelectedDate = styled.div`
  font-size: 1.2em;
  margin-bottom: 20px;
  font-weight: bold;
  color: #333;
`;

const EventSummary = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
`;
