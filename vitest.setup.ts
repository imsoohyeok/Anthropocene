import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// vitest.config.mts에서 test.globals를 켜지 않아서 RTL의 자동 cleanup 감지가
// 동작하지 않는다. 테스트마다 렌더링된 DOM이 남아 다음 테스트에 영향을 주지
// 않도록 명시적으로 cleanup을 등록한다.
afterEach(() => {
  cleanup();
});
