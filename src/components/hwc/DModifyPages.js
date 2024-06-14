import React from "react";

const DModifyPages = ({ schedule, onChange, isEditing }) => (
  <div className="index-left-selection">
    <div className="index-travel-schedule">
      <h3 className="index-travelday-input">
        <div className="index-p-note">
          <span className="span-p-note1">제목</span>
          <br />
          <span className="span-p-note2">위치</span>
          <br />
          <span className="span-p-note3">시작일</span>
          <br />
          <span className="span-p-note4">종료일</span>
          <br />
          <span className="span-p-note5">예산</span>
          <br />
          <label className="color-label">
            일정표 색상
            <input
              type="color"
              name="tourColor"
              value={schedule.tourColor}
              onChange={onChange}
              disabled={!isEditing}
            />
          </label>
        </div>
      </h3>
      <div className="index-text-box">
        <h3 className="index-input-text">
          <ul className="index-detail">
            <>
              <li>
                <input
                  type="text"
                  name="title"
                  value={schedule.title}
                  placeholder="제목을 입력하십시오"
                  onChange={onChange}
                  readOnly={!isEditing}
                />
              </li>
              <li>
                <input
                  type="text"
                  name="tourLocation"
                  value={schedule.tourLocation}
                  placeholder="위치를 입력하십시오"
                  onChange={onChange}
                  readOnly={!isEditing}
                />
              </li>
              <li>
                <input
                  type="date"
                  name="tourStartDay"
                  value={schedule.tourStartDay}
                  onChange={onChange}
                  readOnly={!isEditing}
                />
              </li>
              <li>
                <input
                  type="date"
                  name="tourFinishDay"
                  value={schedule.tourFinishDay}
                  onChange={onChange}
                  readOnly={!isEditing}
                />
              </li>
              <li>
                <input
                  type="number"
                  name="tourBudget"
                  value={schedule.tourBudget}
                  placeholder="예산을 입력하십시오"
                  onChange={onChange}
                  readOnly={!isEditing}
                />
              </li>
              <li>
                <input
                  type="color"
                  name="tourColor"
                  value={schedule.tourColor}
                  onChange={onChange}
                  readOnly={!isEditing}
                />
              </li>
            </>
          </ul>
        </h3>
      </div>
    </div>
  </div>
);

export default DModifyPages;
