# 구현할 기능 목록

<details>
<summary>📝 순서도 보기</summary>
<div markdown="1">
  <img src="./숫자야구.png" alt="숫자야구_순서도" height="400px">

</div>
</details>

## 상태 초기화

- 컴퓨터가 제시하는 랜덤 숫자 3개 생성
  - @woowacourse/mission-utils의 Random 을 사용해 1~9까지의 서로 다른 숫자로 만듦
- strike =0, ball=0
- input, 입력 버튼 활성화
- game start 버튼 감추기
- "playing" 화면에 나타내기

## input 입력

- input의 입력 시, XSS 공격을 막고 숫자만 입력할 수 있도록 input 의 type를 "number"로 특정
- @woowacourse/mission-utils 의 " Console.readLineAsync"를 사용해 사용자의 값을 입력 받음

## 입력값 유효성 검사

사용자가 입력한 값이 각 상황에 맞는 입력값의 형태인지 검사

### 1) 3 스트라이크 이전 유효성 검사

- 3자리의 숫자만 가능

### 2) 3 스트라이크 이후 유효성 검사

- 1 또는 2만 가능

### 3) 유효성 통과 시 판정 단계 진행, 유효성 검사 통과 하지 못하면 throw 문 출력 후 종료

## 숫자 판정

- 숫자 & 자리가 일치 할 경우 strike 값 +1,
- 숫자만 일치할 경우 ball 값 +1

## 문구 출력

- 게임 시작 시 : "숫자 야구 게임을 시작합니다."
- 숫자 입력 안내 문구 : "숫자를 입력해주세요"
- 판정 문구 : "n볼" || "n볼 n스트라이크" || "n스트라이크" || "낫싱"
- 3스트라이크 일 경우 추가 문구 : "3개의 숫자를 모두 맞히셨습니다! 게임 종료
  게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요."
- 유효성 검사 통과 실패 : "[ERROR] 숫자가 잘못된 형식입니다."
- - @woowacourse/mission-utils 의 " Console.print"를 사용해 출력

## 게임 재시작 및 종료

- 게임 재시작 시, 상태 초기화
- 게임 종료 시
  - "playing"화면에서 감추기
  - game start 버튼 화면에 나타내고 활성화
  - input, 입력 버튼 비활성화