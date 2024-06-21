import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Modal from "react-modal";
import { SERVER } from "../../apis/config";
import { useNavigate } from "react-router-dom";

// react-modal을 사용할 때, 애플리케이션의 루트 요소를 설정합니다.
Modal.setAppElement("#root");

// axios.interceptors 설정: 전역에서 한 번만 설정
axios.interceptors.response.use(
  response => {
    // console.log("Response data:", response.data);
    return response;
  },
  error => {
    console.error("Request failed:", error);
    return Promise.reject(error);
  },
);

const DeletePage = ({ tourId, tourScheduleId, fetchTourData }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setErrorMessage("");
  };

  const handleDelete = async () => {
    try {
      // Validate tourId and tourScheduleId before proceeding
      if (!tourId || !tourScheduleId) {
        setErrorMessage("삭제에 실패하였습니다. 다시 시도해주세요.");
        return;
      }

      const response = await axios.delete(
        `${SERVER}/api/tour/schedule?tour_id=${tourId}&tour_schedule_id=${tourScheduleId}`,
      );

      // Log server response to console
      console.log("Delete response:", response);

      // Check for different status codes and handle accordingly
      if (response.status === 200 || response.status === 204) {
        console.log("성공적으로 삭제하였습니다.", response.data);
        fetchTourData(); // 삭제 후 데이터 다시 불러오기
        closeModal();
        navigate("/"); // 메인 페이지로 리다이렉트
      } else {
        setErrorMessage("삭제에 실패하였습니다. 다시 시도해 주세요.");
      }
    } catch (error) {
      console.error(
        "삭제에 실패하였습니다.",
        error.response?.data || error.message || error,
      );
      setErrorMessage("삭제에 실패하였습니다. 다시 시도해 주세요.");
      console.log(error);
    }
  };

  return (
    <div>
      <DeleteButton onClick={openModal}>삭제</DeleteButton>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="삭제 확인"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "300px",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <ModalContent>
          <h2>정말 이 일정을 삭제하시겠습니까?</h2>
          {errorMessage && <Error>{errorMessage}</Error>}
          <ButtonGroup>
            <ConfirmButton onClick={handleDelete}>삭제</ConfirmButton>
            <CancelButton onClick={closeModal}>취소</CancelButton>
          </ButtonGroup>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DeletePage;

const DeleteButton = styled.button`
  padding: 10px;
  background-color: #ff4d4f;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #d43f3a;
  }
`;

const ModalContent = styled.div`
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const ConfirmButton = styled.button`
  padding: 10px;
  background-color: #ff4d4f;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #d43f3a;
  }
`;

const CancelButton = styled.button`
  padding: 10px;
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
  margin-top: 10px;
`;
