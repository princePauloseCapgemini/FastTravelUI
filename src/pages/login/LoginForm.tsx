import { useCallback } from "react";

import {
  Button,
  Input,
  FormControl,
  FormErrorMessage,
  useToast,
  VStack,
  HStack,
  Text,
} from "@chakra-ui/react";
// import { useMutation } from "@apollo/client";
import { Formik, Form, Field } from "formik";

import * as Yup from "yup";
import { Link } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  phone: Yup.number().required("Required"),
  password: Yup.string().required("Required"),
});

function LoginForm() {
  //   const [login] = useMutation("");
  const toast = useToast();

  const onRegister = useCallback(
    async (payload: { phone: string; password: string }) => {
      console.log(payload);
      //   await login({ variables: { loginInput: payload } })
      //     .then(() => {
      //       toast({
      //         title: "Logged in successfully.",
      //         status: "success",
      //         duration: 5000,
      //         isClosable: true,
      //       });
      //     })
      //     .catch((error) => {
      //       toast({
      //         title: error.message || "Something went wrong.",
      //         status: "error",
      //         duration: 5000,
      //         isClosable: true,
      //       });
      //     });
    },
    [toast]
  );

  return (
    <Formik
      initialValues={{
        phone: "",
        password: "",
      }}
      validationSchema={LoginSchema}
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
          <VStack alignItems="flex-start" spacing="4">
            <Field name="phone">
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.phone && form.touched.phone}
                >
                  <Input
                    variant="customInput"
                    data-testid="phone-input"
                    {...field}
                    placeholder="Phone number"
                    type="number"
                  />
                  <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="password">
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.password && form.touched.password}
                >
                  <Input
                    variant="customInput"
                    data-testid="password-input"
                    {...field}
                    placeholder="Password"
                    type="password"
                  />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <HStack justifyContent="space-between" w="100%">
              <VStack alignItems="flex-start" spacing="0">
                <Text fontSize="sm" fontWeight="400" color="grey">
                  Don't have an account ?
                </Text>
                <Link
                  to="/signup"
                  style={{ color: "#666", textDecoration: "underline" }}
                >
                  Signup
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
                Login
              </Button>
            </HStack>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
