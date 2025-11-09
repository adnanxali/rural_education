jest.mock('axios');
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import FoundationForm from "../pages/foundationform";
import axios from "axios";

test("FoundationForm submits form and shows success message", async () => {
  
  axios.post.mockResolvedValue({ data: { message: "ok" } });

  render(
    <MemoryRouter initialEntries={["/form/101"]}>
      <Routes>
        <Route path="/form/:id" element={<FoundationForm />} />
      </Routes>
    </MemoryRouter>
  );

  fireEvent.click(screen.getAllByRole("radio")[0]);

  fireEvent.click(screen.getByText(/submit/i));

  expect(await screen.findByText(/successfully submitted/i)).toBeInTheDocument();
});
