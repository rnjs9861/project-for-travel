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
  const [showDetail, setShowDetail] = useState(true);

  const handleChange = e => {
    const { name, value } = e.target;
    setSchedule(prevState => ({
      ...prevState,
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

  const handleDelete = () => {
    setSchedule({
      date: "",
      title: "",
      amount: "",
      startTime: "",
      endTime: "",
      details: "",
    });
    setShowDetail(false);
    console.log("삭제된 일정");
  };

  const style = {
    background: "linear-gradient(to right, #2bc0e4, #eaecc6)",
    minHeight: "100vh",
  };

  return (
    <div style={style}>
      {showDetail && (
        <DetilePages schedule={schedule} onDelete={handleDelete} />
      )}
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
      <SchedulePages schedule={schedule} />
    </div>
  );
};

export default Test;
