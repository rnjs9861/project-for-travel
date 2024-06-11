import React, { useState } from "react";
import "../../css/hwc/indexstyle.css";
import "../../css/hwc/mobilestyle.css";
import DetilePages from "./DetilePages";
import DModifyPages from "./DModifyPages";
import ModifyText from "./ModifyText";
import SchedulePages from "./SchedulePages";

const Test = () => {
  const [schedule, setSchedule] = useState({
    date: "",
    title: "",
    amount: "",
    startTime: "",
    endTime: "",
    details: "",
  });

  const [isEditing, setIsEditing] = useState(true);

  const handleChange = e => {
    const { name, value } = e.target;
    setSchedule(prevSttate => ({
      ...prevSttate,
      [name]: value,
    }));
  };

  const handleSave = e => {
    e.preventDefault();
    setIsEditing(false);
    console.log("Saved Schedule:", schedule);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleReset = () => {
    setSchedule({
      date: "",
      title: "",
      amount: "",
      startTime: "",
      endTime: "",
      details: "",
    });
    setIsEditing(true);
  };

  const style = {
    background: "linear-gradient(to right, #2bc0e4, #eaecc6)",
    minHeight: "100vh", // 페이지 전체에 배경을 적용하기 위해 최소 높이 설정
  };

  return (
    <div style={style}>
      <DetilePages />
      <DModifyPages
        schedule={schedule}
        onChange={handleChange}
        isEditing={isEditing}
      />
      <ModifyText
        onSave={handleSave}
        onEdit={handleEdit}
        onReset={handleReset}
        isEditing={isEditing}
      />
      <SchedulePages />
    </div>
  );
};

export default Test;
