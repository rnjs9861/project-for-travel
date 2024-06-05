import { useRef } from "react";
import CheckListBottom from "../../components/ldh/CheckListBottom";
import CheckListTop from "../../components/ldh/CheckListTop";
import "../../css/ldh/checklist/main.css";

const CheckList = () => {
  const setlistForm = useRef(null);
  const setInputList = useRef(null);
  const listForm = document.querySelector(".list-form");
  const inputList = document.querySelector(".main-top-list");
  const checkList = document.querySelector(".check-list-contents");
  let arrList = [];
  listForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const list = inputList.value;
    if (list !== "") {
      checkList.innerHTML = list;
      inputList.value = "";
      arrList.push(list);
      console.log(arrList);
    }
  });
  return (
    <main className="main">
      <div className="main-wrap">
        <CheckListTop></CheckListTop>
        <CheckListBottom></CheckListBottom>
      </div>
    </main>
  );
};

export default CheckList;
