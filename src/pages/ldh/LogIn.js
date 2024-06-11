import { useEffect, useRef, useState } from "react";
import "../../css/ldh/login/header.css";
import "../../css/ldh/login/main.css";

const LogIn = () => {
  const [isId, setIsId] = useState("");
  const [isPass, setIsPass] = useState("");
  const noneId = useRef(null);
  const nonePass = useRef(null);
  const noneUser = useRef(null);
  const cleanPass = useRef(null);
  const cleanId = useRef(null);

  const userInfo = [
    {
      userid: "dlehgus",
      userpass: "1",
    },
    {
      userid: "ehgus",
      userpass: "2",
    },
  ];
  const cleanUpId = () => {
    setIsId("");
  };
  const cleanUpPass = () => {
    setIsPass("");
  };
  const handleOnSubmit = e => {
    e.preventDefault();
    if (!isId) {
      noneId.current.style.display = "block";
      return false;
    } else {
      noneId.current.style.display = "none";
    }
    if (!isPass) {
      nonePass.current.style.display = "block";
      return false;
    } else {
      nonePass.current.style.display = "none";
    }
    const user = userInfo.find(
      item => item.userid === isId && item.userpass === isPass,
    );
    if (!user) {
      noneUser.current.style.display = "block";
    } else {
      noneUser.current.style.display = "none";
      // alert("로그인되었습니다");
      // console.log(user);
      // 화면전환하며 값 넘길코드 작성, 작업하며 윗 코드 삭제
    }
  };

  useEffect(() => {
    isId
      ? (cleanId.current.style.display = "block")
      : (cleanId.current.style.display = "none");
    isPass
      ? (cleanPass.current.style.display = "block")
      : (cleanPass.current.style.display = "none");
    return () => {};
  }, [isId, isPass]);

  return (
    <div className="wrap">
      <header className="header">
        <div className="header-inner">
          <div className="header-inner-home">
            <span>홈으로</span>
          </div>
        </div>
      </header>
      <main className="login-main">
        <div className="main-inner">
          <div className="main-content">
            <div className="main-content-login">
              <form className="idform" onSubmit={e => handleOnSubmit(e)}>
                <div className="input-id">
                  <img
                    src="/ldh/images/1564534_customer_man_user_account_profile_icon.svg"
                    className="profileico"
                  />
                  <div className="id-inner">
                    <input
                      type="text"
                      placeholder="아이디"
                      className="uid"
                      value={isId}
                      onChange={event => {
                        setIsId(event.target.value);
                      }}
                    />
                  </div>
                  <img
                    src="/ldh/images/10758948_x_circle_icon.svg"
                    className="cleanupico-id"
                    ref={cleanId}
                    onClick={() => {
                      cleanUpId();
                    }}
                  />
                </div>
                <div className="input-pass">
                  <img
                    src="/ldh/images/3643767_key_keys_main_password_privilege_icon.svg"
                    className="keyico"
                  />
                  <div className="pass-inner">
                    <input
                      type="password"
                      placeholder="비밀번호"
                      className="password"
                      value={isPass}
                      onChange={e => {
                        setIsPass(e.target.value);
                      }}
                    />
                  </div>
                  <img
                    src="/ldh/images/10758948_x_circle_icon.svg"
                    className="cleanupico-pass"
                    ref={cleanPass}
                    onClick={() => {
                      cleanUpPass();
                    }}
                  />
                </div>
                <div className="message-inner">
                  <span className="none-id" ref={noneId}>
                    아이디를 입력해 주세요
                  </span>
                  <span className="none-password" ref={nonePass}>
                    비밀번호를 입력해 주세요
                  </span>
                  <span className="none-user" ref={noneUser}>
                    아이디 또는 비밀번호를 잘못 입력하셨습니다
                  </span>
                </div>
                <button className="button">로그인</button>
              </form>
            </div>
            <div className="user-login-menu">
              <a href="#">
                <span>회원가입</span>
              </a>
              <a href="#">
                <span>아이디 찾기</span>
              </a>
              <a href="#">
                <span>비밀번호 찾기</span>
              </a>
            </div>
          </div>
        </div>
      </main>
      <footer></footer>
    </div>
  );
};

export default LogIn;
