import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { saveEvent } from "../../apis/gmu/planApi";
import useFetchEvents from "../../apis/gmu/useFetchEvent";

const EventModal = ({ date, onSubmit, event, tourId }) => {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [expense, setExpense] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const isReadOnly = !!event;

  // API로부터 데이터를 가져옵니다
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
    <Form>
      <h2>
        {date} 일정 {isReadOnly ? "읽기" : "추가"}
      </h2>
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
      <Else>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          readOnly={isReadOnly}
          placeholder="제목을 입력해 주세요"
          required
        />
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
      </Else>
      {!isReadOnly && <Button onClick={handleSubmit}>저장</Button>}

      {/* API 데이터 표시 */}
      <div>
        {loading ? (
          <p>데이터 로딩 중...</p>
        ) : error ? (
          <p>에러 발생: {error}</p>
        ) : (
          <EventList>
            {events.map(ev => (
              <EventItem
                key={ev.tourScheduleId}
                onClick={() => handleEventClick(ev)}
              >
                <p>{ev.title}</p>
                <p>
                  {ev.tourScheduleStart} ~ {ev.tourScheduleEnd}
                </p>
              </EventItem>
            ))}
          </EventList>
        )}
      </div>
    </Form>
  );
};

export default EventModal;

const Form = styled.div`
  border: solid;
  border-radius: 10px;
  margin-top: 10px;
  padding: 10px 5px 5px 5px;
  background-color: white;
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

const EventItem = styled.li`
  border: 1px solid #ccc;
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
