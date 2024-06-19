import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import axios from "axios";
import { SERVER } from "../../apis/config";

// react-modal을 사용할 때, 애플리케이션의 루트 요소를 설정합니다.
Modal.setAppElement("#root");

const DeleteModify = ({ tourId, tourScheduleId, onDelete }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태

  // useEffect를 사용하여 props를 출력해 봅니다.
  useEffect(() => {
    console.log("tourId:", tourId);
    console.log("tourScheduleId:", tourScheduleId);
  }, [tourId, tourScheduleId]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setErrorMessage(""); // 모달 닫을 때 에러 메시지 초기화
  };

  const handleDelete = async () => {
    try {
      console.log(
        `${SERVER}/api/tour/schedule?tour_id=${tourId}&tour_schedule_id=${tourScheduleId}`,
      );
      const response = await axios.delete(
        `${SERVER}/api/tour/schedule?tour_id=${tourId}&tour_schedule_id=${tourScheduleId}`,
      );
      console.log("성공적으로 삭제하였습니다.", response.data);
      onDelete();
      closeModal();
    } catch (error) {
      console.error("삭제에 실패하였습니다.", error);
      setErrorMessage("삭제에 실패하였습니다. 다시 시도해 주세요.");
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
          <h2>정말 삭제하시겠습니까?</h2>
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

export default DeleteModify;

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
