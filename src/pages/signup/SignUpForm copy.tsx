import {
    Container, FormErrorMessage,
    FormLabel,
    VStack,
    FormControl,
    Input,
    Button, Select, SimpleGrid
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from 'react-hook-form'
import { address } from './address';
export default function SignupForm() {
    const [state, setState] = useState<string>('');
    const [city, setCity] = useState<any[]>([]);
    const [district, setDistrict] = useState<any[]>([]);
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
            email: "",
            password: "",
            mobileNumber: "",
            type: "RIDER",
            age: "",
            lisenceNumber: "",
            vehicleNum: "",
            state: "",
            city: "",
            district: "",
            pinCode: "",
        },
        shouldUnregister: true,
    })
    const fieldOneValue = watch('type'); // Get the current value of fieldOne
    const states = address.states;
    let cities: any[]  = [];
    let districts : any[]  = [];
    function registerNewUser(payload: any): void {
        console.log(payload)

    }
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

                <FormControl isInvalid={errors.email}>
                    <Input
                        variant="customInput"
                        id='email'
                        placeholder='Email'
                        {...register('email', {
                            required: 'Please Input Email',
                            minLength: { value: 4, message: 'Minimum length should be 4' },
                        })}
                    />
                    <FormErrorMessage>
                        {errors.email && errors.email.message}
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
                    <Select {...register('city')} onChange={handleCityChange}>
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
                    <Select {...register('district')}>
                        <option value="">Select District</option>
                        {state && city && 
                            district.map((distObj: any) => (
                                <option key={distObj?.name} value={distObj?.name}>
                                    {distObj?.name}
                                </option>
                            ))}
                    </Select>
                </FormControl>

                <FormControl>
                    <Input
                    variant="customInput"
                        id='pinCode'
                        placeholder='Enter Pin Code'
                        {...register('pinCode')}
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
                    <Select name="fieldOne" {...register('type', {
                        required: 'Please Select User Type',
                    })}>
                        <option value='RIDER'>Rider</option>
                        <option value='PARTNER'>Partner</option>
                    </Select>
                    <FormErrorMessage>
                        {errors.type && errors.type.message}
                    </FormErrorMessage>
                </FormControl>

                {fieldOneValue === 'PARTNER' && <>
                    <FormControl isInvalid={errors.age}>
                        <Input
                        variant="customInput"
                            id='age'
                            placeholder='Age'
                            disabled={fieldOneValue !== 'PARTNER'}
                            // Disable if fieldOne is not 'option1'
                            {...register('age', {
                                required: 'Please Input age',
                                minLength: { value: 2, message: 'Minimum length should be 2' },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.age && errors.age.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.vehicleNum}>
                        <Input
                        variant="customInput"
                            id='vehicleNum'
                            disabled={fieldOneValue !== 'PARTNER'} // Disable if fieldOne is not 'option1'
                            placeholder='Vechicle Registration Number'
                            {...register('vehicleNum', {
                                required: 'Please Input vehicle Registration Number',
                                minLength: { value: 10, message: 'Minimum length should be 10' },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.lisenceNumber && errors.lisenceNumber.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.lisenceNumber}>
                        <Input
                        variant="customInput"
                            id='lisenceNumber'
                            disabled={fieldOneValue !== 'PARTNER'} // Disable if fieldOne is not 'option1'
                            placeholder='Email'
                            {...register('lisenceNumber', {
                                required: 'Please Input lisenceNumber',
                                minLength: { value: 10, message: 'Minimum length should be 10' },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.lisenceNumber && errors.lisenceNumber.message}
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
