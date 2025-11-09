jest.mock('axios');
import { render, screen } from "@testing-library/react";
import Home from "../component/Home";
import "@testing-library/jest-dom";

test("Home page renders main heading", () => {
  render(<Home />);
  const text = screen.getByText(/welcome/i);
  expect(text).toBeInTheDocument();
});
