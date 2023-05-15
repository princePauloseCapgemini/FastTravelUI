import {
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
import { useState, } from "react";
import { address } from './address';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import DatePicker from 'react-datepicker';
import { REGISTER_USER } from "../../graphqlOperation/mutation";
import { useMutation } from "@apollo/client";
import 'react-datepicker/dist/react-datepicker.css';
import Address from "../../types/User";
import moment from "moment";

const signUpSchema = Yup.object().shape({
    firstName: Yup.string().required("Enter FirstName"),
    lastName: Yup.string().required("Enter LastName"),
    gender: Yup.string().required("Select Gender"),
    emailAddress: Yup.string().required("Enter Email"),
    password: Yup.string().required("Enter Password").min(8, 'Must be exactly 8 digits'),
    mobileNumber: Yup.string().notRequired(),
    userType: Yup.string().required(),
    dob: Yup.string().when("userType", {
        is: (userType: string) => userType === 'PARTNER',
        then: () => Yup.string()
        .required("Select the Date")
    }),
    drivingLicenseNumber: Yup.string().when("userType", {
        is: (userType: string) => userType === 'PARTNER',
        then: () => Yup.string()
            .required("Enter valid Lisence Number").min(5, 'Must be exactly 5 digits')
    }),
    vehicleRegistrationNumber: Yup.string().when("userType", {
        is: (userType: string) => userType === 'PARTNER',
        then: () => Yup.string()
            .required("Enter valid Vehicle Registration Number").min(5, 'Must be exactly 5 digits')
    }),
    state: Yup.string().notRequired(),
    city: Yup.string().notRequired(),
    addressLine: Yup.string().notRequired(),
    addressLine2: Yup.string().notRequired(),
    pinCode: Yup.string().notRequired(),
});

export default function SignupForm() {
    const toast = useToast();
    const states = address.states;
    const [city, setCity] = useState<any[]>([]);
    const [date, setDate] = useState(new Date());
    const [createNewUser, { loading, error },] = useMutation(REGISTER_USER);
    let cities: any[] = [];
    // Function to handle state change
    const handleStateChange = (event: any) => {
        const stateObj = address.states.find(state => state.name === event.target.value);
        cities = stateObj ? stateObj.cities : [];
        setCity(cities);
    };

    function onRegister(payload: { firstName: string; lastName: string; gender: string; email: string; password: string; mobileNumber: string; type: string; dob: string; drivingLicenseNumber: string; vehicleRegistrationNumber: string; state: string; city: string; addressLine: string; addressLine2: string; pincode: string; address: Address}) {
        const dateFormatRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!dateFormatRegex.test(payload.dob)) {
            payload.dob = moment(payload.dob).format('DD/MM/YYYY');
          }
        const filter = 'state, city, addressLine, addressLine2, pincode';
        const keys = filter.split(', ');
        const userAddress = Object.assign(Object.fromEntries(keys.map((k) => [k, payload[k]])),{ country: "India" });
        payload.address = userAddress;
        for (const k of keys) {
            delete payload[k];
        }
        createNewUser({variables: {userData: payload}}).then((response) => {
            toast({
              title: "User Created Successfully",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
          })
          .catch((error) => {
            toast({
              title: error.message || "Something went wrong.",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          });
    }
    return (
        <>
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    gender: "",
                    emailAddress: "",
                    password: "",
                    mobileNumber: "",
                    userType: "RIDER",
                    dob: moment(new Date()).format('DD/MM/YYYY'),
                    drivingLicenseNumber: "",
                    vehicleRegistrationNumber: "",
                    state: "",
                    city: "",
                    addressLine: "",
                    addressLine2: "",
                    pincode: "",
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
      }}>

                {({ isSubmitting, setFieldValue }) => (
                    <Form>
                        {error && <span>{error.message}</span>}
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
                                <Field name="emailAddress">
                                    {({ field, form }: any) => (
                                        <FormControl
                                            isInvalid={
                                                form.errors.emailAddress && form.touched.emailAddress
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
                                                {form.errors.emailAddress}
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
                                <Field name="userType">
                                    {({ field, form }: any) => (
                                        <FormControl
                                            isInvalid={
                                                form.errors.userType && form.touched.userType
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
                                                onChange={(e) => {handleStateChange(e) 
                                                                  setFieldValue('state',e.target.value)}}
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
                                                placeholder="Select City">
                                                {city.map((cityObj: any) => (
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
                                <Field name="addressLine">
                                    {({ field, form }: any) => (
                                        <FormControl>
                                            <Input
                                                variant="customInput"
                                                data-testid="addressLine-input"
                                                {...field}
                                                placeholder="AddressLine"
                                            />
                                        </FormControl>
                                    )}
                                </Field>
                            </Box>
                            <Box>
                                <Field name="addressLine2">
                                    {({ field, form }: any) => (
                                        <FormControl>
                                            <Input
                                                variant="customInput"
                                                data-testid="addressLine2-input"
                                                {...field}
                                                placeholder="AddressLine2"
                                            />
                                        </FormControl>
                                    )}
                                </Field>
                            </Box>
                            <Box>
                                <Field name="pincode">
                                    {({ field, form }: any) => (
                                        <FormControl>
                                            <Input
                                                variant="customInput"
                                                data-testid="pincode-input"
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
                                            form.errors.dob && form.touched.dob
                                        }>
                                            <DatePicker
                                                className="mystyle"
                                                placeholderText={'Date of Birth'} 
                                                name="dob"
                                                selected={date}
                                                onChange={(date) => {setDate(date)
                                                     setFieldValue('dob',(date || new Date()))}}
                                                maxDate={new Date()}
                                                isClearable
                                            />
                                            <FormErrorMessage>
                                                {form.errors.dob}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                            </Box>
                            <Box>
                                <Field name="vehicleRegistrationNumber">
                                    {({ field, form }: any) => (
                                        <FormControl
                                            isInvalid={
                                                form.errors.vehicleRegistrationNumber && form.touched.vehicleRegistrationNumber
                                            }
                                        >
                                            <Input
                                                variant="customInput"
                                                data-testid="vehicleRegistrationNumber-input"
                                                {...field}
                                                placeholder="Vechicle Registration Number"
                                                type="text"
                                            />
                                            <FormErrorMessage>
                                                {form.errors.vehicleRegistrationNumber}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                            </Box>
                            <Box>
                                <Field name="drivingLicenseNumber">
                                    {({ field, form }: any) => (
                                        <FormControl
                                            isInvalid={
                                                form.errors.drivingLicenseNumber && form.touched.drivingLicenseNumber
                                            }
                                        >
                                            <Input
                                                variant="customInput"
                                                data-testid="drivingLicenseNumber-input"
                                                {...field}
                                                placeholder="Valid Lisence Number"
                                                type="text"
                                            />
                                            <FormErrorMessage>
                                                {form.errors.drivingLicenseNumber}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                            </Box>
                        </SimpleGrid>

                        <HStack justifyContent="space-between" w="100%">
                            <VStack alignItems="flex-start" spacing="0">
                               
                                <Link
                                    to="/login"
                                    style={{ color: "#666", textDecoration: "underline" }}
                                > 
                                <Text fontSize="sm" fontWeight="400" color="grey">
                                    Already Had account? Login
                                </Text>

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


