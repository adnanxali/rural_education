jest.mock('axios');
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Signup from "../component/Signup";
import "@testing-library/jest-dom";

describe("Signup Component Tests", () => {

  test("renders signup fields", () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument();
  });

  test("allows input", () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    const username = screen.getByPlaceholderText(/enter your name/i);
    const email = screen.getByPlaceholderText(/enter your email/i);
    const password = screen.getByPlaceholderText(/enter your password/i);

    fireEvent.change(username, { target: { value: "teacher1" } });
    fireEvent.change(email, { target: { value: "teacher@gmail.com" } });
    fireEvent.change(password, { target: { value: "123456" } });

    expect(username.value).toBe("teacher1");
    expect(email.value).toBe("teacher@gmail.com");
    expect(password.value).toBe("123456");
  });

});
