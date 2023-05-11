import {
    Container,
    FormLabel,
    VStack,
    FormControl,
    Button,
    Select,
    SimpleGrid,
    Box,
    Input,
    FormErrorMessage,
    useToast,
    HStack,
    Text,
} from "@chakra-ui/react";
import { useState,  } from "react";
import { address } from './address';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import DatePicker from 'react-datepicker';
import { REGISTER_USER } from "../../graphqlOperation/mutation";
import { useMutation } from "@apollo/client";

import 'react-datepicker/dist/react-datepicker.css';

const signUpSchema = Yup.object().shape({
    firstName: Yup.string().required("Enter FirstName"),
    lastName: Yup.string().required("Enter LastName"),
    gender: Yup.string().required("Select Gender"),
    email: Yup.string().required("Enter Email"),
    password: Yup.string().required("Enter Password").min(8, 'Must be exactly 8 digits'),
    mobileNumber: Yup.string().notRequired(),
    type: Yup.string().required(),
    dob:Yup.string().when("type", {
            is: (type : string) => type === 'PARTNER', 
            then: () => Yup.string()
              .required("Required")
          }),
    lisenceNumber:Yup.string().when("type", {
            is: (type : string) => type === 'PARTNER', 
            then: () => Yup.string()
            .required("Enter valid Lisence Number").min(5, 'Must be exactly 5 digits')
          }),
    vehicleNum:Yup.string().when("type", {
            is: (type : string) => type === 'PARTNER', 
            then: () => Yup.string()
            .required("Enter valid Vehicle Registration Number").min(5, 'Must be exactly 5 digits')
          }),
    state: Yup.string().notRequired(),
    city: Yup.string().notRequired(),
    addressLine:Yup.string().notRequired(),
    addressLine2:Yup.string().notRequired(),
    pinCode: Yup.string().notRequired(),
});

export default function SignupForm() {
    const toast = useToast();
    const states = address.states;
    const [state, setState] = useState<string>('');
    const [city, setCity] = useState<any[]>([]);
    const [district, setDistrict] = useState<any[]>([]);
    const [date, setDate] = useState(new Date());
    const [ createNewUser, { loading, error },] = useMutation(REGISTER_USER);

    let cities: any[] = [];
    let districts: any[] = [];

       // Function to handle state change
       const handleStateChange = (event: any) => {
        setState(event.target.value);
        const stateObj = address.states.find(state => state.name === event.target.value);
        cities = stateObj ? stateObj.cities : [];
        setCity(cities);
    };


     // Function to handle city change
     const handleCityChange = (event: any) => {
        // Find the state object with the given name
        const stateObj = address.states.find(states => states.name === state);
        // Find the city object with the given name within the state object
        const cityObject = stateObj ? stateObj.cities.find(city => city.name === event.target.value) : null;
        // Extract the districts from the city object
        districts = cityObject ? cityObject.districts : [];
        setDistrict(districts)
    };




    
  function onRegister(values: { firstName: string; lastName: string; gender: string; email: string; password: string; mobileNumber: string; type: string; age: string; lisenceNumber: string; vehicleNum: string; state: string; city: string; district: string; pinCode: string; }) {
       
    alert('erwrwe')
    createNewUser({
     variables: {
             values,
     },
   });
     console.log(values);

    // throw new Error("Function not implemented.");
 }
    return (
        <>
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    gender: "",
                    email: "",
                    password: "",
                    mobileNumber: "",
                    type: "RIDER",
                    dob: "",
                    lisenceNumber: "",
                    vehicleNum: "",
                    state: "",
                    city: "",
                    district: "",
                    pinCode: "",
                }}
                validationSchema={signUpSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    await onRegister(values)
                        .then(() => {
                            setSubmitting(false);
                            resetForm();
                        })
                        .catch(() => {
                            setSubmitting(false);
                        });
                }}
            >

                {({ isSubmitting }) => (
                    <Form>

                        <SimpleGrid columns={2} spacingX='40px' spacingY='20px' maxW="container.xl" p="4" justifyContent="center">
                            <Box>
                                <Field name="firstName">
                                    {({ field, form }: any) => (
                                        <FormControl
                                            isInvalid={
                                                form.errors.firstName && form.touched.firstName
                                            }
                                        >
                                            <Input
                                                variant="customInput"
                                                data-testid="firstName-input"
                                                {...field}
                                                placeholder="First Name"
                                                type="text"
                                            />
                                            <FormErrorMessage>
                                                {form.errors.firstName}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                            </Box>
                            <Box>
                                <Field name="lastName">
                                    {({ field, form }: any) => (
                                        <FormControl
                                            isInvalid={
                                                form.errors.lastName && form.touched.lastName
                                            }
                                        >
                                            <Input
                                                variant="customInput"
                                                data-testid="lastName-input"
                                                {...field}
                                                placeholder="Last Name"
                                                type="text"
                                            />
                                            <FormErrorMessage>
                                                {form.errors.lastName}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                            </Box>
                            <Box>
                                <Field name="email">
                                    {({ field, form }: any) => (
                                        <FormControl
                                            isInvalid={
                                                form.errors.email && form.touched.email
                                            }
                                        >
                                            <Input
                                                variant="customInput"
                                                data-testid="email-input"
                                                {...field}
                                                placeholder="Email Address"
                                                type="email"
                                            />
                                            <FormErrorMessage>
                                                {form.errors.email}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                            </Box>
                            <Box>
                                <Field name="password">
                                    {({ field, form }: any) => (
                                        <FormControl
                                            isInvalid={
                                                form.errors.password && form.touched.password
                                            }
                                        >
                                            <Input
                                                variant="customInput"
                                                data-testid="password-input"
                                                {...field}
                                                placeholder="Password"
                                                type="password"
                                            />
                                            <FormErrorMessage>
                                                {form.errors.password}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                            </Box>
                            <Box>
                                <Field name="gender">
                                    {({ field, form }: any) => (
                                        <FormControl
                                            isInvalid={
                                                form.errors.gender && form.touched.gender
                                            }
                                        >
                                            <Select
                                                variant="customSelect"
                                                data-testid="gender-input"
                                                {...field}
                                                placeholder="Select Gender"
                                                type="gender"
                                            >
                                                <option value='M'>Male</option>
                                                <option value='F'>Female</option>
                                                <option value='O'>Others</option>
                                            </Select>
                                            <FormErrorMessage>
                                                {form.errors.gender}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                            </Box>
                            <Box>
                                <Field name="type">
                                    {({ field, form }: any) => (
                                        <FormControl
                                            isInvalid={
                                                form.errors.type && form.touched.type
                                            }
                                        >
                                            <Select
                                                variant="customSelect"
                                                data-testid="gender-input"
                                                {...field}
                                                placeholder="Select User Type"
                                            >
                                                <option value='RIDER'>Rider</option>
                                                <option value='PARTNER'>Partner</option>
                                            </Select>
                                            <FormErrorMessage>
                                                {form.errors.gender}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                            </Box>
                            <Box>
                            <Field name="state">
                                    {({ field, form }: any) => (
                                        <FormControl>
                                            <Select
                                             
                                               variant="customSelect"
                                                data-testid="state-selectBox"
                                                {...field}
                                                onChange={handleStateChange}
                                                placeholder="Select State"
                                            >
                                             {states.map((stateObj) => (
                            <option key={stateObj.name} value={stateObj.name}>
                                {stateObj.name}
                            </option>
                        ))}
                                            </Select>
                                        </FormControl>
                                    )}
                                </Field>
                            </Box>
                            

                            <Box>
                            <Field name="city">
                                    {({ field, form }: any) => (
                                        <FormControl>
                                            <Select
                                                variant="customSelect"
                                                data-testid="city-selectBox"
                                                {...field}
                                                placeholder="Select City"
                                                onChange={handleCityChange}

                                            >
                                                {state &&
                            city.map((cityObj: any) => (
                                <option key={cityObj?.name} value={cityObj?.name}>
                                    {cityObj?.name}
                                </option>
                            ))}

                                            </Select>
                                        </FormControl>
                                    )}
                                </Field>
                            </Box>

                            <Box>
                                <Field name="district">
                                    {({ field, form }: any) => (
                                        <FormControl>
                                            <Select
                                                variant="customSelect"
                                                data-testid="district-selectBox"
                                                {...field}
                                                placeholder="Select District">
                                                {state && city && 
                            district.map((distObj: any) => (
                                <option key={distObj?.name} value={distObj?.name}>
                                    {distObj?.name}
                                </option>
                            ))}
                                            </Select>
                                        </FormControl>
                                    )}
                                </Field>
                            </Box>
                            <Box>
                            <Field name="pinCode">
                                    {({ field, form }: any) => (
                                        <FormControl>
                                            <Input
                                                variant="customInput"
                                                data-testid="pinCode-input"
                                                {...field}
                                                placeholder="Pin Code"
                                            />
                                        </FormControl>
                                    )}
                                </Field>
                            </Box>
                            <Box>
                            <Field name="mobileNumber">
                                    {({ field, form }: any) => (
                                        <FormControl
                                            isInvalid={
                                                form.errors.mobileNumber && form.touched.mobileNumber
                                            }
                                        >
                                            <Input
                                                variant="customInput"
                                                data-testid="mobileNumber-input"
                                                {...field}
                                                placeholder="Mobile Number"
                                            />
                                        </FormControl>
                                    )}
                                </Field>
                            </Box>
                            <Box>
                            <Field name="dob">
                                    {({ field, form }: any) => (
                                        <FormControl
                                            isInvalid={
                                                form.errors.pinCode && form.touched.pinCode
                                            }
                                        >
                                            {/* <Input
                                                variant="customInput"
                                                data-testid="dob-input"
                                                {...field}
                                                placeholder="DD/MM/YY"
                                                type="dob"
                                                /> */}

                                                <DatePicker
      wrapperClassName="customInput"
      selected={date}
      dateFormat='dd/MM/yyyy'
      onChange={(date) => setDate(date)}
      maxDate= {new Date()}
      isClearable
      showYEarDropdown
      scrollMonthYearDropDown
    />
                                            <FormErrorMessage>
                                                {form.errors.pinCode}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                            </Box>
                            <Box>
                            <Field name="vehicleNum">
                                    {({ field, form }: any) => (
                                        <FormControl
                                            isInvalid={
                                                form.errors.vehicleNum && form.touched.vehicleNum
                                            }
                                        >
                                            <Input
                                                variant="customInput"
                                                data-testid="vehicleNum-input"
                                                {...field}
                                                placeholder="Vechicle Registration Number"
                                                type="text"
                                            />
                                            <FormErrorMessage>
                                                {form.errors.vehicleNum}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                            </Box>
                            <Box>
                            <Field name="lisenceNumber">
                                    {({ field, form }: any) => (
                                        <FormControl
                                            isInvalid={
                                                form.errors.lisenceNumber && form.touched.lisenceNumber
                                            }
                                        >
                                            <Input
                                                variant="customInput"
                                                data-testid="lisenceNumber-input"
                                                {...field}
                                                placeholder="Valid Lisence Number"
                                                type="text"
                                            />
                                            <FormErrorMessage>
                                                {form.errors.lisenceNumber}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                            </Box>
                        </SimpleGrid>

                        <HStack justifyContent="space-between" w="100%">
              <VStack alignItems="flex-start" spacing="0">
                <Text fontSize="sm" fontWeight="400" color="grey">
                    Already Had account?
                </Text>
                <Link
                  to="/login"
                  style={{ color: "#666", textDecoration: "underline" }}
                >
                  Login
                </Link>
              </VStack>
              <Button
                isLoading={isSubmitting}
                mt={4}
                colorScheme="teal"
                type="submit"
                bgColor="black"
                fontWeight="400"
                _hover={{
                  bgColor: "primary",
                }}
              >
                Sign Up
              </Button>
            </HStack>
                    </Form>

                )}
            </Formik>

        </>
    );
}


