import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// 날짜 형식 보정 함수
const addOneDay = date => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + 1);
  return newDate.toISOString().split("T")[0];
};

// 랜덤 색상 생성 함수
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// API 호출을 위한 함수
const getAllPlans = async userId => {
  try {
    const response = await axios.get("/api/tour", {
      params: { signed_user_id: userId },
    });
    console.log("API Full Response:", response); // 전체 응답 객체를 출력
    console.log("API Response Data:", response.data); // 데이터를 확인하기 위한 콘솔 로그
    return response.data.resultData; // resultData에서 배열을 반환
  } catch (error) {
    console.error("Failed to fetch plans", error);
    throw error;
  }
};

const CalendarsForAllPlan = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    const loadAllData = async () => {
      try {
        // 로그인된 사용자의 ID를 가져오기
        const userId = localStorage.getItem("user");

        if (!userId) {
          console.error("User ID not found in localStorage");
          return;
        }

        // 모든 여행 계획 가져오기
        const plans = await getAllPlans(userId);

        console.log("Fetched plans:", plans); // 데이터를 확인하기 위한 콘솔 로그

        if (!plans || !Array.isArray(plans)) {
          console.error("Plans data is not an array or is undefined:", plans);
          return;
        }

        // 여행 계획을 events 형식으로 변환
        const planEvents = plans.map(plan => ({
          id: plan.tourId, // 맞춤형 key 사용
          title: plan.title,
          start: plan.tourStartDay,
          end: addOneDay(plan.tourFinishDay), // 끝 날짜를 하루 증가
          backgroundColor: getRandomColor(), // 랜덤 색상 적용
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

  useEffect(() => {
    if (selectedDate) {
      const filteredEvents = events.filter(
        event => event.start.split("T")[0] === selectedDate,
      );
      const sortedEvents = filteredEvents.sort((a, b) => {
        const aTime = new Date(a.start).getTime();
        const bTime = new Date(b.start).getTime();
        return aTime - bTime;
      });
      setSelectedEvents(sortedEvents);
    }
  }, [selectedDate, events]);

  const handleDateClick = info => {
    setSelectedDate(info.dateStr);
  };

  // 이벤트 클릭 핸들러 추가
  const handleEventClick = info => {
    const eventId = info.event.id;
    navigate(`/plan/${eventId}`); // 이벤트 ID를 사용해 이동
  };

  return (
    <>
      {/* <Header>
        <img src={ALOTlogo} alt="로고" />
      </Header> */}
      {/* <Body> */}

      <CalendarContainer>
        <Calendar>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            dateClick={handleDateClick}
            events={events}
            eventClick={handleEventClick} // 이벤트 클릭 핸들러 설정
            eventContent={renderEventContent} // 이벤트 콘텐츠 렌더링을 위한 함수
          />
        </Calendar>

        <EventModalWrap>
          {selectedDate && (
            <>
              <SelectedDate>{selectedDate} 일정</SelectedDate>
              {selectedEvents.map((event, index) => (
                <EventSummary key={index}>
                  <strong>{event.title}</strong>
                  <br />
                  <p>목적지: {event.extendedProps.location}</p>
                  <p>시작: {event.start.split("T")[0]}</p>
                  <p>끝: {event.end.split("T")[0]}</p>
                </EventSummary>
              ))}
            </>
          )}
        </EventModalWrap>
      </CalendarContainer>
      {/* </Body> */}
    </>
  );
};

// 이벤트 콘텐츠 렌더링 함수
const renderEventContent = eventInfo => (
  <div>
    <i>{eventInfo.event.title}</i>
  </div>
);

export default CalendarsForAllPlan;

// Styled-components

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;

  img {
    margin: auto;
    display: block;
    width: 300px;
    padding: 20px;
  }
`;

// const Body = styled.div`
//   padding-top: 180.24px;
// `;

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
