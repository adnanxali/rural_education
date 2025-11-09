jest.mock('axios');
import { render } from "@testing-library/react";
import ChartF from "../pages/ChartF";

test("renders Foundation chart without crashing", () => {
  render(<ChartF />);
});
