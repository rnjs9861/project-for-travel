eslint
ruls  
 "react/react-in-jsx-scope": "off",
"@typescript-eslint/no-unused-vars" : "off",
"react/prop-types" : "off"
마이그레이션 중 테스트용으로 기입, 제거 필요

# GMU

# 6.09

- plan 페이지 입력 정보 post 성공

- calendar 페이지 plan에서 입력한 정보 get 성공, events post 성공

- allSchedule 페이지 plan에서 입력한 모든 정보 get 성공, events post 성공

- events get도 성공

# 6.10

- postman 자체 DB로 수정 작동 확인
- 계획 수정하기 및 삭제하기 만듦
- 마이페이지 만듦- 다만 로그인 기능 미구현으로 테스트 불가

# 6.12

- 아이디, 비밀번호, 이메일 정규표현식 성공

- user 테이블에서 만든 uid가 계획 페이지의 tour 테이블로 가는 것 확인. 다만 user테이블의 pk가 넘어가진 않음.

- tour테이블의 pk인 tour_id 가 tour_schedule(세부일정) 테이블로 가는건 확인.

- tour_schedule에 date 따로 뺌

- plan/:id 의 경우 새로고침시 캘린더에 나오지 않음

# 6.14

- Swagger에 plan post, get, put ,delete 성공

- Calendar에 날짜 정보와 제목 불러와짐.

- Calendar에 일정 추가 가능

- 다만 새로고침을 해야 반영, Swagger로 DB까지 가는거 확인

# 6.14

- full-calendar 라이브러리의 문제점: 날짜를 설정할때 마지막 날짜를 미포함 한 형태로 표시한다.
  -> 설정시 날짜를 그 다음날로 설정해야 달력 표시에 문제가 없음.

- 계획 수정, 삭제 기능 추가

# 6.15

- 계획 startDay에 plan에서 작성한 title만 나오게 수정

# 6.16

- 캘린더에 입력한 정보 뜨는데 문제 없음. AllSchedule에도 동일하게 동작 확인.

# 남은 할 일

- 메인 페이지에서 계획 누를시 /plan/:id 페이지로 이동
  "proxy": "http://192.168.0.53:8080"
  "proxy": "http://112.222.157.156:5114/swagger-ui/index.html#/"
