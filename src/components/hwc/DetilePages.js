import React from "react";

const DetilePages = ({ schedule }) => (
  <div className="index-container-wrap">
    <div className="index-schedule-input">일정 입력</div>
    <div className="index-detail-input">입력된 내용</div>
    <h1 className="index-c-title">
      <p className="index-c-text__box">
        <strong className="index-text-strong">상세 일정 페이지</strong>
      </p>
    </h1>
    <div className="index-schedule-details">
      <ul>
        <li>여행 일자: {schedule.date}</li>
        <li>시작 시간: {schedule.startTime}</li>
        <li>마감 시간: {schedule.endTime}</li>
        <li>제목: {schedule.title}</li>
        <li>예산: {schedule.amount}</li>
        <li>상세 내용: {schedule.details}</li>
      </ul>
    </div>
  </div>
);

export default DetilePages;
