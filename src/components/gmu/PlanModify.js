import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Map from "./Map";
import MapMobile from "./MapMobile";
import { deletePlan, getPlan, updatePlan } from "../../apis/gmu/planApi";

const PlanModify = () => {
  const { id: tourId } = useParams();
  const navigate = useNavigate();

  const [tourTitle, setTourTitle] = useState("");
  const [tourStartDay, setTourStartDay] = useState("");
  const [tourFinishDay, setTourFinishDay] = useState("");
  const [tourLocation, setTourLocation] = useState("");
  const [tourBudget, setTourBudget] = useState("");
  const [mapCenter, setMapCenter] = useState([37.5665, 126.978]);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await getPlan(tourId);
        const planData = response.resultData;

        if (planData) {
          setTourTitle(planData.title || "");
          setTourStartDay(planData.tourStartDay || "");
          setTourFinishDay(planData.tourFinishDay || "");
          setTourLocation(planData.tourLocation || "");
          setTourBudget(planData.tourBudget || "");
        } else {
          console.error("Plan data is invalid:", planData);
        }
      } catch (error) {
        console.error("Error loading plan:", error);
      }
    };

    fetchPlan();
  }, [tourId]);

  useEffect(() => {
    if (tourLocation) {
      const timerId = setTimeout(() => {
        axios
          .get(
            `https://nominatim.openstreetmap.org/search?format=json&q=${tourLocation}`,
          )
          .then(response => {
            const data = response.data;
            if (data && data.length > 0) {
              const { lat, lon } = data[0];
              setMapCenter([lat, lon]);
            }
          })
          .catch(error => console.log("Error fetching map data:", error));
      }, 500);

      return () => clearTimeout(timerId);
    }
  }, [tourLocation]);

  const handleSubmit = async e => {
    e.preventDefault();

    const updatedPlan = {
      title: tourTitle,
      tourStartDay,
      tourFinishDay,
      tourLocation,
      tourBudget,
    };

    try {
      await updatePlan(tourId, updatedPlan);
      navigate(`/plan/${tourId}`); // 데이터 저장 후 캘린더 페이지로 리다이렉트
    } catch (error) {
      console.log("Error updating plan:", error);
    }
  };
  const handleDelete = async () => {
    try {
      const userId = localStorage.getItem("user");
      if (!userId) {
        alert("로그인 정보가 없습니다. 다시 로그인 해주세요.");
        return;
      }

      await deletePlan(userId, tourId);
      navigate("/");
    } catch (error) {
      console.log("Error deleting plan:", error);
    }
  };

  return (
    <Wrapper>
      <main>
        <Content>
          <LeftSection>
            <Map center={mapCenter} destination={tourLocation} />
          </LeftSection>
          <RightSection>
            <Form onSubmit={handleSubmit}>
              <FormFactor>
                <Label htmlFor="tourTitle">제목</Label>
                <Input
                  type="text"
                  id="tourTitle"
                  name="tourTitle"
                  placeholder="여행 계획 제목을 입력하세요"
                  value={tourTitle}
                  onChange={e => setTourTitle(e.target.value)}
                  required
                />
              </FormFactor>
              <FormFactor>
                <Label htmlFor="destination">목적지</Label>
                <Input
                  type="text"
                  id="tourLocation"
                  name="tourLocation"
                  placeholder="목적지를 입력하세요"
                  value={tourLocation}
                  onChange={e => setTourLocation(e.target.value)}
                  required
                />
              </FormFactor>
              <MapForMobile>
                <MapMobile center={mapCenter} destination={tourLocation} />
              </MapForMobile>
              <FormFactor>
                <Label htmlFor="start-date">시작일</Label>
                <Input
                  type="date"
                  id="tourStartDay"
                  name="tourStartDay"
                  value={tourStartDay}
                  onChange={e => setTourStartDay(e.target.value)}
                  required
                />
              </FormFactor>
              <FormFactor>
                <Label htmlFor="end-date">끝나는 날</Label>
                <Input
                  type="date"
                  id="tourFinishDay"
                  name="tourFinishDay"
                  value={tourFinishDay}
                  onChange={e => setTourFinishDay(e.target.value)}
                  required
                />
              </FormFactor>
              <FormFactor>
                <Label htmlFor="budget">예산</Label>
                <Input
                  type="number"
                  id="tourBudget"
                  name="tourBudget"
                  placeholder="예산을 입력하세요"
                  value={tourBudget}
                  onChange={e => setTourBudget(e.target.value)}
                  required
                />
              </FormFactor>
              <ButtonWrapper>
                <Button type="submit">저장</Button>
                <DeleteButton type="button" onClick={handleDelete}>
                  삭제
                </DeleteButton>
              </ButtonWrapper>
            </Form>
          </RightSection>
        </Content>
      </main>
      <Footer>
        <p>푸터</p>
      </Footer>
    </Wrapper>
  );
};

export default PlanModify;

// Styled-components

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  overflow-x: hidden;
`;

const LeftSection = styled.div`
  position: relative;
  height: 80vh;

  @media (max-width: 760px) {
    display: none;
  }
`;

const MapForMobile = styled.div`
  display: none;
  @media (max-width: 760px) {
    display: block;
  }
`;

const RightSection = styled.div`
  position: absolute;
  right: 20px;
  width: 300px;
  height: 80vh;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 100000;
  transform: translateX(100%);
  opacity: 0;
  transition:
    transform 0.5s ease-in-out,
    opacity 0.5s ease-in-out;
  animation: slideIn 0.5s ease-in-out 0.1s forwards;

  @keyframes slideIn {
    to {
      transform: translateX(0);
      opacity: 1;
      right: 0;
    }
  }

  @media (max-width: 760px) {
    position: relative;
    margin: 0 auto;
  }
`;

const Form = styled.form`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormFactor = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  width: calc(100% - 12px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between; /* 버튼 사이의 간격 조정 */
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

const DeleteButton = styled.button`
  padding: 10px 20px;
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #c9302c;
  }
`;

const Footer = styled.div`
  z-index: 999999;
  background-color: blue;
  margin: 0;
  padding: 10px;
  text-align: center;
  color: white;
`;
