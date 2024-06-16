import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { SERVER } from "../../apis/config";

const Detail = () => {
  const { tourScheduleId } = useParams();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(
          `${SERVER}/api/tour/schedule/${tourScheduleId}`,
        );
        console.log("API Response:", response.data); // 응답 데이터 확인
        setDetail(response.data.resultData || response.data); // 응답 구조에 따라 처리
      } catch (error) {
        console.error("Error fetching detail:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [tourScheduleId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading detail: {error.message}</p>;

  if (!detail) return <p>No details found for ID: {tourScheduleId}</p>;

  return (
    <DetailContainer>
      <h1>Detail for {tourScheduleId}</h1>
      <p>
        <strong>Title:</strong> {detail.title || "N/A"}
      </p>
      <p>
        <strong>Description:</strong> {detail.contents || "N/A"}
      </p>
      <p>
        <strong>Start Time:</strong> {detail.tourScheduleStart || "N/A"}
      </p>
      <p>
        <strong>End Time:</strong> {detail.tourScheduleEnd || "N/A"}
      </p>
      <p>
        <strong>Cost:</strong> {detail.cost || "N/A"}
      </p>
    </DetailContainer>
  );
};

export default Detail;

const DetailContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
