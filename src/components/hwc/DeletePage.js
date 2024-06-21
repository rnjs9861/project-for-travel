import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Modal from "react-modal";
import { SERVER } from "../../apis/config";
import { useNavigate, useParams } from "react-router-dom";

// react-modal을 사용할 때, 애플리케이션의 루트 요소를 설정합니다.
Modal.setAppElement("#root");

const DeletePage = ({ tourId, tourScheduleId, onDeleteSuccess }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState(false); // 삭제 완료 상태
  const navigate = useNavigate();

  // 모달 열기
  const openModal = () => {
    setModalIsOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setModalIsOpen(false);
    setErrorMessage("");
    setDeleteSuccess(false); // 모달 닫을 때 삭제 완료 상태 초기화
  };

  // 삭제 처리
  const handleDelete = async () => {
    try {
      // Validate tourId and tourScheduleId before proceeding
      if (
        !tourId ||
        !tourScheduleId ||
        isNaN(tourId) ||
        isNaN(tourScheduleId)
      ) {
        setErrorMessage("유효하지 않은 값입니다. 다시 시도해주세요.");
        return;
      }
      const response = await axios.delete(
        `${SERVER}/api/tour/schedule?tour_id=${tourId}&tour_schedule_id=${tourScheduleId}`,
      );

      // Check for different status codes and handle accordingly
      if (response.status === 200 || response.status === 204) {
        setDeleteSuccess(true); // 삭제 성공 상태 설정
        onDeleteSuccess(); // 부모 컴포넌트에 삭제 성공 알림
      } else {
        setErrorMessage("삭제에 실패하였습니다. 다시 시도해 주세요.");
      }
    } catch (error) {
      console.error("Error deleting tour:", error);
      setErrorMessage("삭제에 실패하였습니다. 다시 시도해 주세요.");
    }
  };

  // 삭제 완료 메시지와 돌아가기 버튼
  const SuccessMessage = (
    <SuccessContent>
      <h2>삭제 완료되었습니다. 이용해주셔서 감사합니다.</h2>
      <Button onClick={() => navigate("/")}>돌아가기</Button>
    </SuccessContent>
  );

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
        {deleteSuccess ? (
          SuccessMessage
        ) : (
          <ModalContent>
            <h2>정말 이 일정을 삭제하시겠습니까?</h2>
            {errorMessage && <Error>{errorMessage}</Error>}
            <ButtonGroup>
              <ConfirmButton onClick={handleDelete}>삭제</ConfirmButton>
              <CancelButton onClick={closeModal}>취소</CancelButton>
            </ButtonGroup>
          </ModalContent>
        )}
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

const SuccessContent = styled.div`
  text-align: center;
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

const Error = styled.div`
  color: red;
  margin-top: 10px;
`;
