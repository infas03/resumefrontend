import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../login.js";

const dummyUser = [
  {
    email: 'infasmax03@gmail.com',
    password: '12345'
  },
  {
    email: 'theepthi03@gmail.com',
    password: '12345'
  }
]
test("login user", () =>{
  render(<Login/>)

  const email = screen.getByTestId('email-input')
  const password = screen.getByTestId('password-input')

  fireEvent.change(email , {target: { value: 'infasmax03@gmail.com'}});
  expect(email.value).toBe('infasmax03@gmail.com');

  fireEvent.change(password , {target: { value: '12345'}});
  expect(password.value).toBe('12345');

  const registerBtn = screen.getByTestId('loginBtn');
})