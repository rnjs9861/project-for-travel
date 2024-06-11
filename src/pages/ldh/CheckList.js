import axios from "axios";
import { useEffect, useState } from "react";
import Item from "../../components/ldh/Item";
import ListInput from "../../components/ldh/ListInput";
import "../../css/ldh/checklist/main-bottom.css";
import "../../css/ldh/checklist/main-top.css";
import "../../css/ldh/checklist/main.css";

const CheckList = () => {
  const [onAdd, setOnAdd] = useState("");
  const [message, setMessage] = useState("");
  const [list, setList] = useState([]);
  const [isChecked, setIsChecked] = useState([]);

  const handleOnSubmit = e => {
    e.preventDefault();
    if (onAdd === "") {
      return setMessage("추가할 물건을 기입해주세요");
    }
    if (onAdd) {
      setList([...list, onAdd]);
      setIsChecked([...isChecked, false]);
      setOnAdd("");
      setMessage("");
    }
    const reqData = {
      tour_id: 3,
      title: onAdd,
    };
    // console.log(reqData);
    postList(reqData);
  };

  const postList = async data => {
    try {
      const response = await axios.post("/api/tour/checklist", data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemove = itemRemove => {
    setList(list.filter((_, index) => index !== itemRemove));
    setIsChecked(isChecked.filter((_, index) => index !== itemRemove));
  };
  const handleCheck = index => {
    const checked = [...isChecked];
    checked[index] = !checked[index];
    setIsChecked(checked);
  };

  useEffect(() => {
    return () => {};
  }, []);
  return (
    <main className="main">
      <div className="main-wrap">
        <div className="main-top">
          <div className="main-top-wrap">
            <div className="main-top-title">{message}</div>
            <form
              name="list-form"
              className="list-form"
              onSubmit={e => {
                handleOnSubmit(e);
              }}
            >
              <ListInput value={onAdd} onChange={setOnAdd}></ListInput>
            </form>
          </div>
        </div>
        <div className="main-bottom">
          <div className="main-bottom-wrap">
            <div className="main-bottom-check">
              {list.map((item, index) => (
                <Item
                  key={index}
                  item={item}
                  onRemove={() => {
                    handleRemove(index);
                  }}
                  onCheck={() => {
                    handleCheck(index);
                  }}
                  isChecked={isChecked[index]}
                ></Item>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CheckList;
