import { render, fireEvent, screen } from "@testing-library/react";
import HeadingEdit from "../headingEdit.js";

test("heading edit", () =>{
  render(<HeadingEdit/>)

  const firstname = screen.getByTestId('firstname-input')
  const lastname = screen.getByTestId('lastname-input')
  const title = screen.getByTestId('title-input')
  const city = screen.getByTestId('city-input')
  const country = screen.getByTestId('lastname-input')
  const zipcode = screen.getByTestId('zipcode-input')
  const mobile = screen.getByTestId('mobile-input')
  const email = screen.getByTestId('email-input')
  const linkedin = screen.getByTestId('linkedin-input')

  fireEvent.change(firstname , {target: { value: 'Mohamed Infas'}});
  expect(firstname.value).toBe('Mohamed Infas');

  fireEvent.change(lastname , {target: { value: 'Hamdullah'}});
  expect(lastname.value).toBe('Hamdullah');

  fireEvent.change(title , {target: { value: 'Full Stack Developer'}});
  expect(title.value).toBe('Full Stack Developer');

  fireEvent.change(city , {target: { value: 'Colombo'}});
  expect(city.value).toBe('Colombo');

  fireEvent.change(country , {target: { value: 'Sri Lanka'}});
  expect(country.value).toBe('Sri Lanka');

  fireEvent.change(zipcode , {target: { value: '00600'}});
  expect(zipcode.value).toBe('00600');

  fireEvent.change(mobile , {target: { value: '+94777348425'}});
  expect(mobile.value).toBe('+94777348425');

  fireEvent.change(email , {target: { value: 'infasmax03@gmail.com'}});
  expect(email.value).toBe('infasmax03@gmail.com');

  fireEvent.change(linkedin , {target: { value: 'https://www.linkedin.com/in/hminfas'}});
  expect(linkedin.value).toBe('https://www.linkedin.com/in/hminfas');

  const saveBtn = screen.getByTestId('saveBtn');

  const backBtn = screen.getByTestId('backBtn');
})