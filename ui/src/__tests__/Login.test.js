jest.mock('axios');
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../component/Login";
import "@testing-library/jest-dom";

describe("Login Component Tests", () => {

  test("renders username and password inputs", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument();
  });

  test("accepts user input", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const username = screen.getByPlaceholderText(/enter your name/i);
    const password = screen.getByPlaceholderText(/enter your password/i);

    fireEvent.change(username, { target: { value: "pranshu" } });
    fireEvent.change(password, { target: { value: "123456" } });

    expect(username.value).toBe("pranshu");
    expect(password.value).toBe("123456");
  });

});
