import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickNumberInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe("숫자 야구 게임", () => {
  test("게임 종료 후 재시작", async () => {
    // given
    const randoms = [1, 3, 5, 5, 8, 9];
    const answers = ["246", "135", "1", "597","569" ,"598" ,"589", "2"];
    const logSpy = getLogSpy();
    const messages = ["낫싱", "3스트라이크","3개의 숫자를 모두 맞히셨습니다! 게임 종료","게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.", "1볼 1스트라이크","2스트라이크","2볼 1스트라이크", "3스트라이크", "게임 종료"];

    mockRandoms(randoms);
    mockQuestions(answers);

    // when
    const app = new App();
    await expect(app.play()).resolves.not.toThrow();

    // then
    messages.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test("예외 테스트:3자리 숫자", async () => {
    // given
    const randoms = [1, 3, 5];
    const answers = ["1234" ,"111", "12가" ,"012"];

    mockRandoms(randoms);
    mockQuestions(answers);

    // when & then
    const app = new App();

    await expect(app.play()).rejects.toThrow("[ERROR]");
  });
  test("예외 테스트:1 또는 2", async () => {
    // given
    const randoms = [1, 3, 5];
    const answers = ["135","3"];
    const messages = [ "3스트라이크","3개의 숫자를 모두 맞히셨습니다! 게임 종료","게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요."];
    mockRandoms(randoms);
    mockQuestions(answers);

    // when & then
    const app = new App();

    await expect(app.play()).rejects.toThrow("[ERROR]");
  });
});
