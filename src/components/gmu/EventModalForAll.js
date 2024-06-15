import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { saveEvent } from "../../apis/gmu/planApi";

const EventModalForAll = ({ date, onSubmit, events, tourId }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isReadOnly, setIsReadOnly] = useState(false);

  useEffect(() => {
    if (events && events.length > 0) {
      setSelectedEvent(events[0]);
      setIsReadOnly(true);
    } else {
      setSelectedEvent(null);
      setIsReadOnly(false);
    }
  }, [events]);

  const handleSubmit = async () => {
    if (!selectedEvent) return;

    const newEvent = {
      tourId,
      title: selectedEvent.title,
      tourScheduleStart: `${date}T${selectedEvent.start.split("T")[1]}`,
      tourScheduleEnd: `${date}T${selectedEvent.end.split("T")[1]}`,
      tourScheduleDay: date,
      contents: selectedEvent.description,
      cost: selectedEvent.expense,
    };

    try {
      const savedEvent = await saveEvent(newEvent);
      console.log("Saved Event:", savedEvent);

      onSubmit({
        title: savedEvent.title,
        start: savedEvent.tourScheduleStart,
        end: savedEvent.tourScheduleEnd,
        id: savedEvent.tourScheduleId,
        description: savedEvent.contents,
        expense: savedEvent.cost,
      });
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const handleEventClick = event => {
    setSelectedEvent(event);
  };

  return (
    <Form>
      <div>
        {events && events.length > 0 ? (
          <EventList>
            {events.map(ev => (
              <EventItem
                key={ev.tourScheduleId}
                onClick={() => handleEventClick(ev)}
              >
                <p>{ev.title}</p>
                <p>
                  {ev.start.split("T")[1]} ~ {ev.end.split("T")[1]}
                </p>
              </EventItem>
            ))}
          </EventList>
        ) : (
          <p>계획 없음</p>
        )}
      </div>
    </Form>
  );
};

export default EventModalForAll;

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
