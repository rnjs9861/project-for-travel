const Item = ({ item, onRemove, onCheck, isChecked }) => {
  const checkBox = isChecked
    ? "/ldh/images/326563_box_check_icon.svg"
    : "/ldh/images/326558_blank_check_box_icon.svg";
  const lineDeco = {
    color: isChecked ? "gray" : "black",
    textDecoration: isChecked ? "line-through" : "none",
  };
  return (
    <div className="main-bottom-check-list">
      <img src={checkBox} className="boxico" onClick={onCheck} />
      <div className="check-list-contents" style={lineDeco}>
        {item}
      </div>
      <img
        src="/ldh/images/10758948_x_circle_icon.svg"
        className="x-ico"
        onClick={onRemove}
      />
    </div>
  );
};

export default Item;
