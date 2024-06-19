import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { SERVER } from "../../apis/config";
import styled from "styled-components";
import UpdatePages from "./UpdatePages";
import DeleteModify from "./DeletePage";

const DetailModify = () => {
  const { tourScheduleId } = useParams();
  const [tourData, setTourData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const fetchTourData = async () => {
    if (!tourScheduleId) return;

    try {
      const response = await axios.get(
        `${SERVER}/api/tour/schedule/${tourScheduleId}`,
      );

      console.log("tourScheduleId:", tourScheduleId);
      console.log("API Response:", response.data);

      const { data } = response;

      if (Array.isArray(data.resultData)) {
        setTourData(data.resultData[0]); // Assuming you want the first item in the array
      } else {
        setTourData(data.resultData);
      }
    } catch (error) {
      console.error("Error fetching tour data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTourData();
  }, [tourScheduleId]);

  const handleDelete = async () => {
    if (!tourData) return;

    const { tourId, tourScheduleId } = tourData;

    try {
      const response = await axios.delete(
        `${SERVER}/api/tour/schedule?tour_id=${tourId}&tour_schedule_id=${tourScheduleId}`,
      );
      console.log("성공적으로 삭제하였습니다.", response.data);
      fetchTourData(); // 삭제 후 데이터 다시 불러오기
    } catch (error) {
      console.error("삭제에 실패하였습니다.", error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    setIsEditing(false);
    fetchTourData(); // Re-fetch data after update
  };

  const handleCancel = () => {
    setIsEditing(false); // Exit editing mode
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
            <Detail>시작일(Start Day): {tourData.tourScheduleStart}</Detail>
            <Detail>종료일(Finish Day): {tourData.tourScheduleEnd}</Detail>
            <Detail>비용(Cost): {tourData.cost}</Detail>
            <Detail>내용(Contents): {tourData.contents}</Detail>
            <Detail>일정표 색상(Schedule Color): {tourData.tourColor}</Detail>
            <Button onClick={handleEditClick}>수정</Button>
            <DeleteModify
              tourId={tourData.tourId}
              tourScheduleId={tourData.tourScheduleId}
              onDelete={handleDelete}
            />
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
