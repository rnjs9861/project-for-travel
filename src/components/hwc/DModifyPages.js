import React from "react";

const DModifyPages = ({ schedule, onChange, isEditing }) => (
  <div className="index-left-selection">
    <div className="index-travel-schedule">
      <h3 className="index-travelday-input">
        <div className="index-p-note">
          <span className="span-p-note">여행 일자</span>
          <br />
          <span className="span-p-note">시작 시간</span>
          <br />
          <span className="span-p-note">마감 시간</span>
          <br />
          <span className="span-p-note">제목</span>
          <br />
          <span className="span-p-note">예산(소비금)</span>
        </div>
      </h3>
      <div className="index-text-box">
        <h3 className="index-input-text">
          <ul className="index-detail">
            {isEditing ? (
              <>
                <li>
                  <input
                    type="date"
                    name="date"
                    value={schedule.date}
                    onChange={onChange}
                  />
                </li>
                <li>
                  <input
                    type="time"
                    name="startTime"
                    value={schedule.startTime}
                    onChange={onChange}
                  />
                </li>
                <li>
                  <input
                    type="time"
                    name="endTime"
                    value={schedule.endTime}
                    onChange={onChange}
                  />
                </li>
                <li>
                  <input
                    type="text"
                    name="title"
                    value={schedule.title}
                    placeholder="제목을 입력하십시오"
                    onChange={onChange}
                  />
                </li>
                <li>
                  <select
                    name="amount"
                    value={schedule.amount}
                    onChange={onChange}
                  >
                    <option value="">예산을 선택하십시오</option>
                    <option value="10000">10,000원 내외</option>
                    <option value="10000">30,000원 내외</option>
                    <option value="50000">50,000원 내외</option>
                    <option value="100000">100,000원 이상</option>
                  </select>
                </li>
              </>
            ) : (
              <>
                <li>
                  <span>{schedule.date}</span>
                </li>
                <li>
                  <span>{schedule.startTime}</span>
                </li>
                <li>
                  <span>{schedule.endTime}</span>
                </li>
                <li>
                  <span>{schedule.title}</span>
                </li>
                <li>
                  <span>{schedule.details}</span>
                </li>
                <li>
                  <span>{schedule.amount}</span>
                </li>
              </>
            )}
          </ul>
        </h3>
      </div>
    </div>
  </div>
);

export default DModifyPages;
