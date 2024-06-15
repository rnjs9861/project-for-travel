const ListInput = ({ value, onChange }) => {
  return (
    <input
      className="main-top-list"
      type="text"
      placeholder="물품을 입력하세요"
      value={value}
      onChange={e => onChange(e.target.value)}
    ></input>
  );
};

export default ListInput;
