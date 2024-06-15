import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Item from "../../components/ldh/Item";
import ListInput from "../../components/ldh/ListInput";
import "../../css/ldh/checklist/main-bottom.css";
import "../../css/ldh/checklist/main-top.css";
import "../../css/ldh/checklist/main.css";
import { userInfoContext } from "../../context/UserInfoProvider";
import Tour from "../../components/ldh/Tour";
import { postList } from "../../apis/ldh/apitour";
const CheckList = () => {
  const { isUser } = useContext(userInfoContext);
  const [onAdd, setOnAdd] = useState("");
  const [message, setMessage] = useState("");
  const [list, setList] = useState([]);
  const [isChecked, setIsChecked] = useState([]);
  const [tourId, setTourId] = useState([]);
  const [tourTitle, setTourTitle] = useState([]);
  const [selectedTourId, setSelectedTourId] = useState(null);
  // const [aaa, setAaa] = useState(false);

  const handleOnSubmit = async e => {
    e.preventDefault();
    // const searchList = list.includes(onAdd);
    // if (searchList) {
    //   setMessage("중복된 목록이 존재합니다");
    //   setAaa(false);
    // } else {
    //   setAaa(true);
    // }
    // if (aaa) {    }
    // includes를 사용하지말고 filter 사용하여 직접 비교
    const filteredList = list.filter(item => item === onAdd);
    if (filteredList.length > 0) {
      setMessage("중복된 목록이 존재합니다");
    } else {
      if (onAdd === "") {
        return setMessage("추가할 물건을 기입해주세요");
      }
      if (onAdd) {
        setList([...list, onAdd]);
        setIsChecked([...isChecked, false]);
        setOnAdd("");
        setMessage("");
      }
      // post
      const reqData = {
        tourId: selectedTourId,
        title: onAdd,
      };
      const result = await postList(reqData);
      setMessage(result.data.resultMsg);
    }
  };

  // 삭제, 체크
  const handleRemove = itemRemove => {
    setList(list.filter((_, index) => index !== itemRemove));
    setIsChecked(isChecked.filter((_, index) => index !== itemRemove));
  };
  const handleCheck = index => {
    const checked = [...isChecked];
    checked[index] = !checked[index];
    setIsChecked(checked);
  };

  const handleTourClick = async data => {
    setSelectedTourId(data);
    try {
      const rres = await axios.get(`/api/tour/checklist?tour_id=${data}`);
      const callList = rres.data.resultData.map(item => item.title);
      setList(callList);
    } catch (error) {
      console.log(error);
    }
  };

  const getTourId = async () => {
    if (!isUser) return;
    try {
      const res = await axios.get(`/api/tour?signed_user_id=${isUser}`);
      console.log(res);
      const tourIdList = res.data.resultData.map(item => item.tourId);
      const tourName = res.data.resultData.map(item => item.title);
      console.log(tourIdList);
      console.log(tourName);
      setTourId(tourIdList);
      setTourTitle(tourName);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTourId();
  }, [isUser]);
  return (
    <main className="main">
      <div className="tourwrap">
        <div className="tourlist">
          {tourTitle.map((item, index) => (
            <Tour
              key={index}
              tour={item}
              tourClick={() => handleTourClick(tourId[index])}
            />
          ))}
        </div>
      </div>
      <div className="main-wrap">
        <div className="main-top-title">{message}</div>
        <div className="main-top">
          <div className="main-top-wrap">
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
