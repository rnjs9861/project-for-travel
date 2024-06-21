const Item = ({ item, onRemove, onCheck }) => {
  const checkBox = item.checked
    ? "/ldh/images/326563_box_check_icon.svg"
    : "/ldh/images/326558_blank_check_box_icon.svg";
  const lineDeco = {
    color: item.checked ? "gray" : "black",
    textDecoration: item.checked ? "line-through" : "none",
  };
  return (
    <div className="main-bottom-check-list br-10">
      <img src={checkBox} className="boxico" onClick={onCheck} />
      <p className="check-item" style={lineDeco} onClick={onCheck}>
        {item.title}
      </p>
      <img
        src="/ldh/images/10758948_x_circle_icon.svg"
        className="x-ico"
        onClick={onRemove}
      />
    </div>
  );
};

export default Item;
