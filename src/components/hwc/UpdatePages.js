import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVER } from "../../apis/config";
import styled from "styled-components";
import Modal from "react-modal";

// Modal을 사용할 때, 애플리케이션의 루트 요소를 설정합니다.
Modal.setAppElement("#root");

const UpdatePage = ({ tourData, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    tourScheduleDay: "",
    tourScheduleStart: "",
    tourScheduleEnd: "",
    title: "",
    contents: "",
    cost: "",
    tourColor: "#007bff",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false); // Modal 상태
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태

  useEffect(() => {
    if (tourData) {
      setFormData({
        tourScheduleDay: tourData.tourScheduleDay || "",
        tourScheduleStart: tourData.tourScheduleStart || "",
        tourScheduleEnd: tourData.tourScheduleEnd || "",
        title: tourData.title || "",
        contents: tourData.contents || "",
        cost: tourData.cost || "",
      });
    }
  }, [tourData]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // 필수값 검증
    const { tourScheduleDay, tourScheduleStart, tourScheduleEnd, title, cost } =
      formData;
    if (
      !tourScheduleDay ||
      !tourScheduleStart ||
      !tourScheduleEnd ||
      !title ||
      !cost
    ) {
      setErrorMessage("모든 필수값을 입력해 주세요.");
      return;
    }

    if (cost < 0) {
      setErrorMessage("예산에 음수를 입력할 수 없습니다.");
      return;
    }

    try {
      const response = await axios.put(
        `${SERVER}/api/tour/schedule?tour_schedule_id=${tourData?.tourScheduleId || ""}`,
        {
          tourScheduleId: tourData?.tourScheduleId || "",
          tourScheduleDay,
          tourScheduleStart,
          tourScheduleEnd,
          tourScheduleTitle: title,
          contents: formData.contents,
          cost: parseInt(cost, 10),
        },
      );
      console.log("Successfully updated:", response.data);
      onUpdate();
      closeModal(); // 수정 완료 후 Modal 닫기
    } catch (error) {
      console.error("Error updating schedule:", error);
      setErrorMessage("수정에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  const handleCancel = () => {
    setFormData({
      tourScheduleDay: tourData.tourScheduleDay || "",
      tourScheduleStart: tourData.tourScheduleStart || "",
      tourScheduleEnd: tourData.tourScheduleEnd || "",
      title: tourData.title || "",
      contents: tourData.contents || "",
      cost: tourData.cost || "",
    });
    onCancel();
    closeModal(); // 취소 후 Modal 닫기
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setErrorMessage(""); // Modal 닫을 때 에러 메시지 초기화
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      {errorMessage && <Error>{errorMessage}</Error>}
      <Input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="제목"
      />
      <Input
        type="date"
        name="tourScheduleDay"
        value={formData.tourScheduleDay}
        onChange={handleChange}
        placeholder="작성 일자"
      />
      <Input
        type="time"
        name="tourScheduleStart"
        value={formData.tourScheduleStart}
        onChange={handleChange}
        placeholder="시작 시간"
      />
      <Input
        type="time"
        name="tourScheduleEnd"
        value={formData.tourScheduleEnd}
        onChange={handleChange}
        placeholder="종료 시간"
      />
      <Input
        type="number"
        name="cost"
        value={formData.cost}
        onChange={handleChange}
        placeholder="비용"
      />
      <Input
        type="text"
        name="contents"
        value={formData.contents}
        onChange={handleChange}
        placeholder="내용"
      />
      <Button type="button" onClick={openModal}>
        수정 완료
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="수정 확인"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            margin: "10px",
            width: "200px",
            height: "150px",
            border: "20px",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
            alignItems: "center",
          },
        }}
      >
        <h2>수정을 완료하시겠습니까?</h2>
        <Button onClick={handleSubmit}>확인</Button>
        <CancelButton onClick={closeModal}>취소</CancelButton>
      </Modal>
      <CancelButton type="button" onClick={handleCancel}>
        취소
      </CancelButton>
    </FormContainer>
  );
};

export default UpdatePage;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 8px 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const CancelButton = styled.button`
  padding: 8px 12px;
  background-color: #6c757d;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #5a6268;
  }
`;

const Error = styled.div`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;
