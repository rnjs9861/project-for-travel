import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { SERVER } from "../../apis/config";
import styled from "styled-components";
import UpdatePages from "./UpdatePages";
import DeletePage from "./DeletePage";

const DetailModify = () => {
  const { tourId, tourScheduleId } = useParams();
  const [tourData, setTourData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!tourScheduleId) return;

      try {
        setLoading(true);
        const response = await axios.get(
          `${SERVER}/api/tour/schedule/${tourScheduleId}`,
        );

        const { data } = response;

        if (Array.isArray(data.resultData)) {
          setTourData(data.resultData[0]);
        } else {
          setTourData(data.resultData);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching tour data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [tourScheduleId]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    setIsEditing(false);
    try {
      setLoading(true);
      const response = await axios.get(
        `${SERVER}/api/tour/schedule/${tourScheduleId}`,
      );

      const { data } = response;

      if (Array.isArray(data.resultData)) {
        setTourData(data.resultData[0]);
      } else {
        setTourData(data.resultData);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error re-fetching tour data after update:", error);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <Container>
      {loading ? (
        <Loading>Loading...</Loading>
      ) : tourData ? (
        isEditing ? (
          <UpdatePages
            tourData={tourData}
            onUpdate={handleUpdate}
            onCancel={handleCancel}
          />
        ) : (
          <Item>
            <Title>제목(Title): {tourData.tourScheduleTitle}</Title>
            <Detail>작성 일자(Date Created): {tourData.tourScheduleDay}</Detail>
            <Detail>시작 시간(Start Time): {tourData.tourScheduleStart}</Detail>
            <Detail>종료 시간(Finish Time): {tourData.tourScheduleEnd}</Detail>
            <Detail>비용(Cost): {tourData.cost}</Detail>
            <Detail>내용(Contents): {tourData.contents}</Detail>
            <Button onClick={handleEditClick}>수정</Button>
            <DeletePage tourId={tourId} tourScheduleId={tourScheduleId} />
          </Item>
        )
      ) : (
        <Message>No data available</Message>
      )}
    </Container>
  );
};

export default DetailModify;

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Item = styled.div`
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 10px;
  color: #333;
  font-size: 18px;
  font-weight: bold;
`;

const Detail = styled.p`
  margin: 5px 0;
  color: #555;
`;

const Loading = styled.p`
  text-align: center;
  color: #777;
  font-style: italic;
`;

const Message = styled.p`
  text-align: center;
  color: #777;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
