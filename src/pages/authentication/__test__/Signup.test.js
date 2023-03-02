import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUp from "../signup.js";

test("register user", () =>{
  render(<SignUp/>)

  const email = screen.getByTestId('email-input')
  const password = screen.getByTestId('password-input')

  fireEvent.change(email , {target: { value: 'infasmax03@gmail.com'}});
  expect(email.value).toBe('infasmax03@gmail.com');

  fireEvent.change(password , {target: { value: '12345'}});
  expect(password.value).toBe('12345');

  const registerBtn = screen.getByTestId('registerBtn');
})