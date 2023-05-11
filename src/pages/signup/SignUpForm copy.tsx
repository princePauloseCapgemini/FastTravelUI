import {
    Container, FormErrorMessage,
    FormLabel,
    VStack,
    FormControl,
    Input,
    Button, Select, 
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from 'react-hook-form'
import { address } from './address';
import { REGISTER_USER } from "../../graphqlOperation/mutation";
import { useMutation } from "@apollo/client";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export default function SignupForm() {
    const [state, setState] = useState<string>('');
    const [city, setCity] = useState<any[]>([]);
    const [date, setDate] = useState(new Date());

    const {
        handleSubmit,
        watch,
        register,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            gender:"",
            emailAddress: "",
            password: "",
            mobileNumber: "",
            userType: "RIDER",
            dob: "",
            drivingLicenseNumber: "",
            vehicleRegistrationNumber: "",
            state: "",
            city: "",
            addressLine: "",
            addressLine2: "",
            pincode: "",
        },
        shouldUnregister: true,
    })
    const fieldOneValue = watch('userType'); // Get the current value of fieldOne


    const [ createNewUser, { loading, error },] = useMutation(REGISTER_USER);

    function registerNewUser(payload: any): void {
        const filter  = 'state, city, addressLine, addressLine2, pincode';
        const keys = filter.split(', ');
        const address =  Object.assign(Object.fromEntries(keys.map(k => [k, payload[k]])), {country: "India"});
        payload.address = address;
       for (const k of keys) {
          delete payload[k];
      }
      console.log(payload)
    createNewUser({
     variables: {
        userData :  payload,
     },
   });
    }
    const states = address.states;
    let cities: any[]  = [];  

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


    return (
        <Container maxW="container.lg" p="8" justifyContent="center">
            <form noValidate onSubmit={handleSubmit(registerNewUser)}>
            <VStack alignItems="flex-start" spacing="4">
                <FormControl isInvalid={errors.firstName}>
                    <Input
                    variant="customInput"
                        id='name'
                        placeholder='First Name'
                        {...register('firstName', {
                            required: 'Please Input firstName',
                            minLength: { value: 4, message: 'Minimum length should be 4' },
                        })}
                    />
                    <FormErrorMessage>
                        {errors.firstName && errors.firstName.message}
                    </FormErrorMessage>
                </FormControl>


                <FormControl isInvalid={errors.lastName}>
                    <Input
                        id='lastname'
                        variant="customInput"
                        placeholder='Last Name'
                        {...register('lastName', {
                            required: 'Please Input lastName',
                            minLength: { value: 4, message: 'Minimum length should be 4' },
                        })}
                    />
                    <FormErrorMessage>
                        {errors.lastName && errors.lastName.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.gender} variant="customInput">
                    <Select {...register('gender', {
                        required: 'Please Select Gender',
                    })}>
                        <option value='M'>Male</option>
                        <option value='F'>Female</option>
                        <option value='O'>Others</option>
                    </Select>
                    <FormErrorMessage>
                        {errors.gender && errors.gender.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.emailAddress}>
                    <Input
                        variant="customInput"
                        id='emailAddress'
                        placeholder='Email Address'
                        {...register('emailAddress', {
                            required: 'Please Input Email',
                            minLength: { value: 4, message: 'Minimum length should be 4' },
                        })}
                    />
                    <FormErrorMessage>
                        {errors.emailAddress && errors.emailAddress.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.password}>
                    <Input
                       variant="customInput"
                        type="password"
                        id='password'
                        placeholder='Password'
                        {...register('password', {
                            required: 'Please Input Password',
                            minLength: { value: 8, message: 'Minimum length should be 8' },
                        })}
                    />
                    <FormErrorMessage>
                        {errors.password && errors.password.message}
                    </FormErrorMessage>
                </FormControl>


                <FormControl>
                    <Select {...register('state')} onChange={handleStateChange}>
                        <option value="">Select State</option>
                        {states.map((stateObj) => (
                            <option key={stateObj.name} value={stateObj.name}>
                                {stateObj.name}
                            </option>
                        ))}
                    </Select>
                </FormControl>

                <FormControl>
                    <Select {...register('city')}>
                        <option value="">Select City</option>
                        {state &&
                            city.map((cityObj: any) => (
                                <option key={cityObj?.name} value={cityObj?.name}>
                                    {cityObj?.name}
                                </option>
                            ))}
                    </Select>
                </FormControl>

                <FormControl>
                <Input
                       variant="customInput"
                        id='addressLine'
                        placeholder='AddressLine'
                        {...register('addressLine')}
                    />
                </FormControl>

                <FormControl>
                <Input
                       variant="customInput"
                        id='addressLine2'
                        placeholder='AddressLine2'
                        {...register('addressLine2')}
                    />
                </FormControl>
                <FormControl>
                    <Input
                    variant="customInput"
                        id='pincode'
                        placeholder='Enter Pin Code'
                        {...register('pincode')}
                    />
                </FormControl>

                <FormControl>
                    <Input
                    variant="customInput"
                        id='mobileNumber'
                        placeholder='Mobile'
                        {...register('mobileNumber')}
                    />
                </FormControl>

                <FormControl variant="customInput">
                    <Select name="fieldOne" {...register('userType', {
                        required: 'Please Select User Type',
                    })}>
                        <option value='RIDER'>Rider</option>
                        <option value='PARTNER'>Partner</option>
                    </Select>
                    <FormErrorMessage>
                        {errors.userType && errors.userType.message}
                    </FormErrorMessage>
                </FormControl>

                {fieldOneValue === 'PARTNER' && <>
                    <FormControl isInvalid={errors.dob}>
                        {/* <Input
                        variant="customInput"
                            placeholder='Date of Birth'
                            disabled={fieldOneValue !== 'PARTNER'}
                            // Disable if fieldOne is not 'option1'
                            {...register('dob', {
                                required: true,
                                pattern: {
                                  value: /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2[0-9]|3[01])\/(19|20)\d{2}$/,
                                  message: 'Invalid date format (mm/dd/yyyy)'
                                }
                            })}
                        /> */}
                          <DatePicker
                                                className="mystyle"
                                                name="dob"
                                                wrapperClassName="customInput"
                                                selected={date}
                                                dateFormat='dd/MM/yyyy'
                                                onChange={(date) => setDate(date)}
                                                maxDate={new Date()}
                                                isClearable
                                                showYEarDropdown
                                                scrollMonthYearDropDown
                                            />
                        <FormErrorMessage>
                            {errors.dob && errors.dob.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.vehicleRegistrationNumber}>
                        <Input
                        variant="customInput"
                            id='vehicleRegistrationNumber'
                            disabled={fieldOneValue !== 'PARTNER'} // Disable if fieldOne is not 'option1'
                            placeholder='Vechicle Registration Number'
                            {...register('vehicleRegistrationNumber', {
                                required: 'Please Input vehicle Registration Number',
                                minLength: { value: 10, message: 'Minimum length should be 10' },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.vehicleRegistrationNumber && errors.vehicleRegistrationNumber.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.drivingLicenseNumber}>
                        <Input
                        variant="customInput"
                            id='drivingLicenseNumber'
                            disabled={fieldOneValue !== 'PARTNER'} // Disable if fieldOne is not 'option1'
                            placeholder='Valid Lisence Number'
                            {...register('drivingLicenseNumber', {
                                required: 'Please Input lisenceNumber',
                                minLength: { value: 10, message: 'Minimum length should be 10' },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.drivingLicenseNumber && errors.drivingLicenseNumber.message}
                        </FormErrorMessage>
                    </FormControl>
                </>}
                </VStack>
                <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                    Submit
                </Button>
            </form>
        </Container>
    );
}
