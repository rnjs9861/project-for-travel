import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  allDel,
  checkPatch,
  delList,
  getCheckList,
  postList,
} from "../../apis/ldh/apitour";
import List from "../../components/ldh/List";
import Tour from "../../components/ldh/Tour";
import { userInfoContext } from "../../context/UserInfoProvider";
import "../../css/ldh/checklist/main-bottom.css";
import "../../css/ldh/checklist/main-top.css";
import "../../css/ldh/checklist/main.css";

const CheckList = () => {
  const { isUser } = useContext(userInfoContext);
  const [onAdd, setOnAdd] = useState("");
  const [message, setMessage] = useState("");
  const [list, setList] = useState([]);
  const [tourId, setTourId] = useState([]);
  const [tourTitle, setTourTitle] = useState([]);
  const [selectedTourId, setSelectedTourId] = useState(null);
  const [isTourIdSelected, setIsTourIdSelected] = useState(false);

  const handleOnSubmit = async e => {
    e.preventDefault();
    if (list.some(item => item.title === onAdd)) {
      return setMessage("중복된 목록이 존재합니다");
    }
    if (onAdd === "") {
      return setMessage("추가할 물건을 기입해주세요");
    }
    setOnAdd("");
    console.log("gd");
    const result = await postList({ tourId: selectedTourId, title: onAdd });
    console.log(result);
    setMessage(result.data.resultMsg);
    const newItem = {
      checklistid: result.data.resultData,
      title: onAdd,
      checked: false,
    };
    setList([...list, newItem]);
  };

  const handleRemove = async index => {
    try {
      const selectedCheckListId = list[index].checklistid;
      const res = await delList(selectedCheckListId);
      if (res.status === 200) {
        setList(list.filter((_, i) => i !== index));
        setMessage("삭제되었습니다");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheck = async index => {
    try {
      const updatedList = [...list];
      updatedList[index].checked = !updatedList[index].checked;
      setList(updatedList);
      await checkPatch(list[index].checklistid);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAllDel = async () => {
    setMessage("");
    try {
      await allDel(selectedTourId);
      setList([]);
      setMessage("전체 목록이 삭제되었습니다");
    } catch (error) {
      console.error(error);
    }
  };

  const handleTourClick = async data => {
    setSelectedTourId(data);
    try {
      const resultCheck = await getCheckList(data);
      const fetchedList = resultCheck.data.resultData.map(item => ({
        tour_id: item.checklistId,
        title: item.title,
        checked: item.checked,
      }));
      setOnAdd("");
      setList(fetchedList);
      setIsTourIdSelected(true);
    } catch (error) {
      console.error(error);
    }
  };

  const getTourId = async () => {
    if (!isUser) return;
    try {
      const res = await axios.get(`/api/tour?signed_user_id=${isUser}`);
      setTourId(res.data.resultData.map(item => item.tourId));
      setTourTitle(res.data.resultData.map(item => item.title));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTourId();
  }, [isUser]);

  return (
    <main className="main">
      <div className="tourwrap">
        <ul className="pagination">
          {tourTitle.map((item, index) => (
            <Tour
              key={index}
              tour={item}
              tourClick={() => handleTourClick(tourId[index])}
            />
          ))}
          <div className="btnwrap">
            <button className="btn btn-danger" onClick={handleAllDel}>
              전체삭제
            </button>
          </div>
        </ul>
      </div>
      <List
        isTourIdSelected={isTourIdSelected}
        list={list}
        message={message}
        onAdd={onAdd}
        setOnAdd={setOnAdd}
        handleOnSubmit={handleOnSubmit}
        handleRemove={handleRemove}
        handleCheck={handleCheck}
      />
    </main>
  );
};

export default CheckList;
