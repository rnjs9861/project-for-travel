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
        setDetail(response.data.resultData || response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [tourScheduleId]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>문제가 생겼습니다. {error.message}</p>;

  return (
    <DetailContainer>
      <h1>Detail for {tourScheduleId}</h1>
      <p>
        <strong>제목:</strong> {detail.title}
      </p>
      <p>
        <strong>내용:</strong> {detail.contents}
      </p>
      <p>
        <strong>시작 시간:</strong> {detail.tourScheduleStart}
      </p>
      <p>
        <strong>끝 시간:</strong> {detail.tourScheduleEnd}
      </p>
      <p>
        <strong>비용:</strong> {detail.cost}
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
