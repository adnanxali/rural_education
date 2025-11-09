jest.mock('axios');
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../pages/Navbar";
import "@testing-library/jest-dom";

test("Navbar renders all links correctly", () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  expect(screen.getByText(/ruraled\./i)).toBeInTheDocument();
  expect(screen.getByText(/home/i)).toBeInTheDocument();
  expect(screen.getByText(/about/i)).toBeInTheDocument();
  expect(screen.getByText(/contact us/i)).toBeInTheDocument();
  expect(screen.getByText(/math test/i)).toBeInTheDocument();
  expect(screen.getByText(/logout/i)).toBeInTheDocument();
});
