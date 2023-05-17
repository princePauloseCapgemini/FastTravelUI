import { render, screen, fireEvent, waitFor} from "@testing-library/react";
import userEvent from '@testing-library/user-event'

import SignupForm from "../pages/signup/SignUpForm";
import { MockedProvider } from "@apollo/client/testing";
import { REGISTER_USER } from "../graphqlOperation/mutation";
import { act } from 'react-dom/test-utils';
import wait from "waait";
import { BrowserRouter } from 'react-router-dom';
const variable = {
    "bookInput": {
        address: {state: "State 2", city: "City 4", addressLine: "address", addressLine2: "address111"},
        dob:"16/05/2023",
        drivingLicenseNumber:"23421321213",
        emailAddress:"binita.tanisha@gmail.com",
        firstName:"Binita",
        gender:"M",
        lastName:"MAharjan",
        mobileNumber:"987654356345",
        password:"12313213213",
        userType:"PARTNER",
        vehicleRegistrationNumber:"9841432627"
    }
  }

  const outputVariable = {
    "data": {
      "registerUser": {
        "dob":"16/05/2023",
        "createdAt":"1684149064439",
        "userId":"pid_730811",
        "jwt":null,
        "userType":"PARTNER",
        "__typename":"UserDataType"
      }
    }
  }

const mocks = [
    {
      request: {
        query: REGISTER_USER,
        variables: variable,
      },
      result: { data: { outputVariable } },
    },
  ];

  const mockWithError = [
    {
      request: {
        query: REGISTER_USER,
      },
      bookError: new Error("Network Error"),
    },
  ];
describe('TestCase for SignUp Page',()=>{
    it('Check if this is SignUp Page', async() => {
        await act(async () => {
            render(
               <MockedProvider mocks={mocks} addTypename={false}>
                 <BrowserRouter><SignupForm /></BrowserRouter>
               </MockedProvider>,
            );
         });
         await wait(() => expect(screen.getByText(/New Account Sign Up/i)).toBeInTheDocument());
         await wait(()=> expect(screen.getByText(/Already Had account? Login/i)).toBeInTheDocument());
    })

    it('Check for the textBox List', async() => {
        await act(async () => {
            render(
               <MockedProvider mocks={mocks} addTypename={false}>
                 <BrowserRouter><SignupForm /></BrowserRouter>
               </MockedProvider>,
            );
         });
         expect(screen.getByPlaceholderText(/last name/i)).toBeInTheDocument();
         expect(screen.getByPlaceholderText(/first name/i)).toBeInTheDocument();
         expect(screen.getByPlaceholderText(/Email Address/i)).toBeInTheDocument();
         expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
         expect(screen.getByPlaceholderText(/Pin Code/i)).toBeInTheDocument();
         expect(screen.getByPlaceholderText(/Mobile Number/i)).toBeInTheDocument();
         expect(screen.getByPlaceholderText(/Vechicle Registration Number/i)).toBeInTheDocument();
         expect(screen.getByPlaceholderText(/Valid Lisence Number/i)).toBeInTheDocument();
         await wait(() => expect(screen.getByPlaceholderText(/Select Gender/i)).toBeInTheDocument());
         await wait(() => expect(screen.getByPlaceholderText(/Select User Type/i)).toBeInTheDocument());
         await wait(() => expect(screen.getByPlaceholderText(/Select State/i)).toBeInTheDocument());
         await wait(() => expect(screen.getByPlaceholderText(/Select City/i)).toBeInTheDocument());
         await wait(() => expect(screen.getByPlaceholderText(/AddressLine/i)).toBeInTheDocument());
         await wait(() => expect(screen.getByPlaceholderText(/AddressLine2/i)).toBeInTheDocument());
         await wait(() => expect(screen.getByPlaceholderText(/AddressLine/i)).toBeInTheDocument());
         await wait(() => expect(screen.getByPlaceholderText(/Date of Birth/i)).toBeInTheDocument());
         await wait(() => expect(screen.getByText(/Submit/i)).toBeInTheDocument());
    })
    test('should navigate to the Login page when the link is clicked', async() => {
       // const user = userEvent.setup()
        await act(async () => {
            render(
               <MockedProvider mocks={mocks} addTypename={false}>
                 <BrowserRouter><SignupForm /></BrowserRouter>
               </MockedProvider>,
            );
         });
         await wait(()=> expect(fireEvent.click(screen.getByText(/Already Had account? Login/i))));
         await wait(()=>expect(screen.getByText(/Login with Email Address/i)).toBeInTheDocument(),5000);
      });

      it("should mark the required input field as invalid when it is empty", async() => {
        await act(async () => {
          render(
             <MockedProvider mocks={mocks} addTypename={false}>
               <BrowserRouter><SignupForm /></BrowserRouter>
             </MockedProvider>,
          );
       });
        const nameInput =  screen.getByPlaceholderText(/first name/i);
        fireEvent.change(nameInput, { target: { value: "" } });
        await wait(()=>expect(screen.getByText(/Enter FirstName/i)).toBeInTheDocument(),{timeout: 5000})
      });

      it("Error In Registration  Process",async() => {
        await act(async() =>{ render(
        <MockedProvider mocks={mockWithError} addTypename={false}>
          <BrowserRouter><SignupForm /></BrowserRouter>
        </MockedProvider>,
      );
      });
      await act(() =>wait(0));
      await fireEvent.submit(screen.getByTestId('form'));
      await wait(()=>expect(screen.getByText('Error')).toBeInTheDocument(),{timeout: 5000})
      });
})