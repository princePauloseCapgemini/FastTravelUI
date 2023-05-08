import {
    Container, Flex, FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button, Select
  } from "@chakra-ui/react";
  import { useForm } from 'react-hook-form'
  import { address } from './address';
  //unregister("firstName");
  export default function SignupForm() {
    const {
      handleSubmit,
      watch,
      register,
      unregister,
      formState: { errors, isSubmitting },
    } = useForm({
      defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        mobileNumber: "",
        type: "",
        age: "",
        lisenceNumber: ""
      },
      shouldUnregister: true,
    })
    const fieldOneValue = watch('type'); // Get the current value of fieldOne
    console.log(address[0]);
    function registerNewUser(payload: any) {
      console.log(payload)
  
    }
    return (
      <Container maxW="container.lg" p="8" justifyContent="center">
        <form noValidate onSubmit={handleSubmit(registerNewUser)}>
          <FormControl isInvalid={errors.firstName}>
            <FormLabel htmlFor='firstName'>First Name</FormLabel>
            <Input
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
            <FormLabel htmlFor='lastName'>Last Name</FormLabel>
            <Input
              id='name'
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
  
          <FormControl isInvalid={errors.email}>
            <FormLabel htmlFor='email'>Email</FormLabel>
            <Input
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
            <FormLabel htmlFor='password'>Password</FormLabel>
            <Input
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
  
          <FormControl isInvalid={errors.mobileNumber}>
            <FormLabel htmlFor='mobileNumber'>Mobile</FormLabel>
            <Input
              id='mobileNumber'
              placeholder='Mobile'
              {...register('mobileNumber', {
                required: 'Please Input mobileNumber',
                minLength: { value: 10, message: 'Minimum length should be 10' },
              })}
            />
            <FormErrorMessage>
              {errors.mobileNumber && errors.mobileNumber.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.mobileNumber}>
            <FormLabel htmlFor='type'>Type</FormLabel>
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
          {fieldOneValue === 'PARTNER' && <div className="partnerInfo">
          <FormControl isInvalid={errors.age}>
            <FormLabel htmlFor='age'>Age</FormLabel>
            <Input
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
  
          <FormControl isInvalid={errors.lisenceNumber}>
            <FormLabel htmlFor='lisenceNumber'>Lisence Number</FormLabel>
            <Input
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
          </div>}
          <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
            Submit
          </Button>
        </form>
      </Container>
    );
  }
  