import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventModal from "./EventModal";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { getAllEvents, getPlan } from "../../apis/gmu/planApi";
import axios from "axios";
import { SERVER } from "../../apis/config";

const Calendars = () => {
  const { id: tourId } = useParams();
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);

  // 일정 데이터 로드
  useEffect(() => {
    const loadTours = async () => {
      try {
        const tours = await getPlan(tourId);
        console.log("Tours data:", tours);
        if (tours) {
          const formattedEvents = transformTourDataToEvents([tours.resultData]);
          setEvents(formattedEvents);
        } else {
          console.error("Invalid tours data", tours);
        }
      } catch (error) {
        console.error("Error loading tours:", error);
      }
    };

    loadTours();
  }, [tourId]);

  // 모든 이벤트 데이터 로드
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const events = await getAllEvents(tourId);
        console.log("All events data:", events);
        if (Array.isArray(events.resultData)) {
          setEvents(prevEvents => [
            ...prevEvents,
            ...transformTourDataToEvents(events.resultData),
          ]);
        } else {
          console.error("Invalid events data", events);
        }
      } catch (error) {
        console.error("Error loading events:", error);
      }
    };
    loadEvents();
  }, [tourId]);

  // 선택한 날짜의 이벤트 필터링
  useEffect(() => {
    if (selectedDate) {
      const filteredEvents = events.filter(
        event => event.start && event.start.split("T")[0] === selectedDate,
      );
      const sortedEvents = filteredEvents.sort((a, b) => {
        const aTime = new Date(a.start).getTime();
        const bTime = new Date(b.start).getTime();
        return aTime - bTime;
      });
      setSelectedEvents(sortedEvents);
    }
  }, [selectedDate, events]);

  const handleDateClick = async info => {
    setSelectedDate(info.dateStr);
    try {
      const response = await axios.get(
        `${SERVER}/api/tour/schedule/tourScheduleList?tour_id=${tourId}&tour_schedule_day=${info.dateStr}`,
      );
      const eventsForDate = transformTourDataToEvents(response.data.resultData);
      setEvents(prevEvents => [...prevEvents, ...eventsForDate]);
    } catch (error) {
      console.error("Error loading events for selected date:", error);
    }
  };

  const handleEventSubmit = event => {
    const newEvent = {
      title: event.title,
      start: event.start,
      end: event.end,
      id: event.id,
    };
    setEvents(prevEvents => [...prevEvents, newEvent]);
  };

  return (
    <>
      <Body>
        <Link to={`/planModify/${tourId}`}>
          <Button>계획 수정하기</Button>
        </Link>
        <CalendarContainer>
          <Calendar>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              dateClick={handleDateClick}
              events={events}
              eventContent={renderEventContent} // 이벤트 콘텐츠 렌더링을 위한 함수
            />
          </Calendar>

          <EventModalWrap>
            {selectedDate && (
              <>
                <SelectedDate>{selectedDate} 일정 </SelectedDate>
                <EventModal
                  date={selectedDate}
                  onSubmit={handleEventSubmit}
                  tourId={tourId}
                  event={null}
                />
                {selectedEvents.map((event, index) => (
                  <EventModal
                    key={index}
                    date={event.start.split("T")[0]}
                    event={event}
                    tourId={tourId}
                  />
                ))}
              </>
            )}
          </EventModalWrap>
        </CalendarContainer>
      </Body>
    </>
  );
};

export default Calendars;

// Styled-components

const Body = styled.div``;

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

const Button = styled.button`
  padding: 10px 20px;
  background-color: #1e88e5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #005cb2;
  }
`;

// 데이터 변환 함수
const transformTourDataToEvents = tours => {
  return tours.map(tour => ({
    title: tour.title || "No Title",
    start: tour.tourStartDay ? `${tour.tourStartDay}T00:00:00` : undefined,
    end: tour.tourFinishDay ? `${tour.tourFinishDay}T23:59:59` : undefined,
    id: tour.tourId,
    backgroundColor: tour.tourColor || "1e88e5", // 배경색 추가
  }));
};

// 이벤트 콘텐츠 렌더링 함수
const renderEventContent = eventInfo => (
  <div style={{ backgroundColor: eventInfo.event.backgroundColor }}>
    <i>{eventInfo.event.title}</i>
  </div>
);
