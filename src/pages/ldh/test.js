import axios from "axios";
import { useEffect, useState } from "react";
import Item from "../../components/ldh/Item";
import ListInput from "../../components/ldh/ListInput";
import "../../css/ldh/checklist/main-bottom.css";
import "../../css/ldh/checklist/main-top.css";
import "../../css/ldh/checklist/main.css";

const CheckList = ({ tour_id }) => {
  const [onAdd, setOnAdd] = useState("");
  const [message, setMessage] = useState("");
  const [list, setList] = useState([]);


  const handleOnSubmit = e => {
    e.preventDefault();
    // const reqData = {
    //   resultData: onAdd,
    //   tour_id: 11,
    // };
    if (onAdd === "") {
      return setMessage("추가할 물건을 기입해주세요");
    }
    if (onAdd) {
      setList([...list, onAdd]);
      setOnAdd("");
      setMessage("");
    }
    // postList(reqData);
  };

  // const postList = async () => {
  //   try {
  //     const response = await axios.post(
  //       `/api/tour/checklist?tour_id=${tour_id}&title=${onAdd}`,
  //     );
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleRemove = itemRemove => {
    setList(list.filter(item => item !== itemRemove));
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
                    handleRemove(item);
                  }}
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