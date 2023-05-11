import { useCallback } from "react";

import { useMutation } from "@apollo/client";
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
import Cookies from "js-cookie";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

import { LOGIN_USER } from "../../graphqlOperation/mutation";

const LoginSchema = Yup.object().shape({
  emailAddress: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

function LoginForm() {
  const [login] = useMutation(LOGIN_USER);
  const toast = useToast();
  const navigate = useNavigate();

  const onRegister = useCallback(
    async (payload: { emailAddress: string; password: string }) => {
      await login({ variables: { userData: payload } })
        .then((response) => {
          Cookies.set("jwt", JSON.stringify(response.data.signInUser));
          navigate("/book-a-trip");
          toast({
            title: "Logged in successfully.",
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
    },
    [toast]
  );

  return (
    <Formik
      initialValues={{
        emailAddress: "",
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
            <Field name="emailAddress">
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={
                    form.errors.emailAddress && form.touched.emailAddress
                  }
                >
                  <Input
                    variant="customInput"
                    data-testid="emailAddress-input"
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

            <Field name="password">
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.password && form.touched.password}
                >
                  <Input
                    mb="2"
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
