jest.mock('axios');
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ChartF from "../pages/ChartF";

// Mock ResizeObserver for recharts
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserverMock;

test("renders Foundation chart without crashing", () => {
  render(
    <BrowserRouter>
      <ChartF />
    </BrowserRouter>
  );
});
