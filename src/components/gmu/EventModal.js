import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { saveEvent } from "../../apis/gmu/planApi";
import useFetchEvents from "../../apis/gmu/useFetchEvent";
import { Link } from "react-router-dom"; // Link 추가

const EventModal = ({ date, onSubmit, event, tourId }) => {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [expense, setExpense] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const isReadOnly = !!event;

  const { events, loading, error } = useFetchEvents(tourId, date);

  useEffect(() => {
    if (event) {
      setTitle(event.title || "");
      setStartTime(event.start ? event.start.split("T")[1] : "");
      setEndTime(event.end ? event.end.split("T")[1] : "");
      setDescription(event.description || "");
      setExpense(event.expense || 0);
    }
  }, [event]);

  useEffect(() => {
    if (selectedEvent) {
      setTitle(selectedEvent.title);
      setStartTime(selectedEvent.tourScheduleStart || "");
      setEndTime(selectedEvent.tourScheduleEnd || "");
    }
  }, [selectedEvent]);

  const handleSubmit = async () => {
    const newEvent = {
      tourId: tourId,
      title,
      tourScheduleStart: `${date}T${startTime}`,
      tourScheduleEnd: `${date}T${endTime}`,
      tourScheduleDay: date,
      contents: description,
      cost: expense,
    };

    try {
      const savedEvent = await saveEvent(newEvent);
      console.log("Saved Event:", savedEvent);

      // 부모 컴포넌트로 새로운 이벤트를 전달하여 목록 업데이트
      onSubmit({
        title: savedEvent.title,
        start: savedEvent.tourScheduleStart,
        end: savedEvent.tourScheduleEnd,
        id: savedEvent.tourScheduleId,
        description: savedEvent.contents,
        expense: savedEvent.cost,
      });

      // 폼 초기화
      setTitle("");
      setStartTime("");
      setEndTime("");
      setDescription("");
      setExpense(0);
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const handleEventClick = event => {
    setSelectedEvent(event);
  };

  return (
    <>
      <Form>
        <H2>{isReadOnly ? "여행 제목" : `${date} 일정 추가`}</H2>
        <br />
        {!isReadOnly && (
          <Time>
            <label>시작 시간</label>
            <input
              type="time"
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
              readOnly={isReadOnly}
              required
            />
            <label>끝 시간</label>
            <input
              type="time"
              value={endTime}
              onChange={e => setEndTime(e.target.value)}
              readOnly={isReadOnly}
            />
          </Time>
        )}
        <Else>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            readOnly={isReadOnly}
            placeholder="제목을 입력해 주세요"
            required
          />
          {!isReadOnly && (
            <>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                readOnly={isReadOnly}
                placeholder="내용을 입력해 주세요"
              ></textarea>
              <label>소비금</label>
              <input
                type="number"
                value={expense}
                onChange={e => setExpense(e.target.value)}
                placeholder="소비금"
                readOnly={isReadOnly}
              />
            </>
          )}
        </Else>
        {!isReadOnly && <Button onClick={handleSubmit}>저장</Button>}
      </Form>
      {events && events.length > 0 && (
        <FormSaved>
          {loading ? (
            <p>일정을 불러오는 중 입니다...</p>
          ) : error ? (
            <p>에러 발생: {error}</p>
          ) : (
            <EventList>
              {events.map(ev => (
                <EventCard
                  key={ev.tourScheduleId}
                  onClick={() => handleEventClick(ev)}
                >
                  <p>{ev.title}</p>
                  <p>
                    {ev.tourScheduleStart} ~ {ev.tourScheduleEnd}
                  </p>
                  <br />
                  <DetailButton to={`/detail/${ev.tourScheduleId}`}>
                    상세보기
                  </DetailButton>
                </EventCard>
              ))}
            </EventList>
          )}
        </FormSaved>
      )}
    </>
  );
};

export default EventModal;

// Styled-components

const H2 = styled.h2`
  font-weight: bold;
`;

const Form = styled.div`
  border-radius: 10px;
  margin-top: 10px;
  padding: 10px 5px 5px 5px;
  background-color: white;

  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
`;

const FormSaved = styled.div`
  border-radius: 10px;
  margin-top: 10px;
  padding: 10px 5px 5px 5px;
  background-color: #f9fbf8;

  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    box-shadow:
      0 14px 28px rgba(0, 0, 0, 0.25),
      0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

const Time = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  label {
    margin-bottom: 5px;
  }
  input {
    margin-bottom: 10px;
    padding: 5px;
    font-size: 1rem;
  }
`;

const Else = styled.div`
  margin-bottom: 10px;
  input,
  textarea {
    display: block;
    width: 100%;
    padding: 5px;
    margin-bottom: 10px;
    font-size: 1rem;
    resize: none;
  }
  label {
    display: block;
    margin-bottom: 5px;
  }
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

const EventList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const EventCard = styled.li`
  padding: 10px;
  margin-bottom: 5px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }

  p {
    margin: 0;
  }
`;

const DetailButton = styled(Link)`
  padding: 5px 10px;
  background-color: #1e88e5;
  color: white;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: #005cb2;
  }
`;
