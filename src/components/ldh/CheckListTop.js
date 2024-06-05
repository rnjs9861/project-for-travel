import "../../css/ldh/checklist/main-top.css";

const CheckListTop = () => {
  return (
    <div className="main-top">
      <div className="main-top-wrap">
        <div className="main-top-title">title</div>
        <form name="list-form" className="list-form">
          <input className="main-top-list"></input>
        </form>
      </div>
    </div>
  );
};

export default CheckListTop;
