import { Form, Formik } from 'formik';
import Button from '../../lib/Button';
import TextInput from '../../lib/TextInput';
import { RegisterSchema } from '../../utils/validationSchema';
import { register } from '../../services/auth.service';
import { Alert } from '../../lib';
import { useState } from 'react';
import { ApiResponseError, AuthApiSuccessfulResponse } from '../../utils/types';
import constants from '../../utils/constants';
import { setBulkItemsInLocalStorage } from '../../utils/localStorageOperations';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import actionTypes from '../../context/auth/actionTypes';

const Register = () => {
  const { dispatch } = useAuth();
  const [responseError, setResponseError] = useState('');
  const navigate = useNavigate();

  return (
    <div>
      {responseError && <Alert>{responseError}</Alert>}
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={RegisterSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          try {
            const response = (await register(
              values,
            )) as AuthApiSuccessfulResponse;
            const dispatchedResponse = {
              email: response.email,
              id: response.id,
              name: response.name,
            };
            setBulkItemsInLocalStorage([
              { name: constants.ACCESS_TOKEN, value: response.token },
              { name: constants.REFRESH_TOKEN, value: response.refreshToken },
              {
                name: constants.USER_INFO,
                value: JSON.stringify({
                  ...dispatchedResponse,
                }),
              },
            ]);
            dispatch({
              type: actionTypes.LOGIN,
              payload: {
                ...dispatchedResponse,
              },
            });
            navigate('/flights');
          } catch (error) {
            const responseError = error as ApiResponseError;

            setResponseError(responseError.response.data.message);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, errors, touched, isSubmitting, handleChange, isValid }) => (
          <Form>
            <TextInput
              id="name"
              label="Name"
              type="text"
              value={values.name}
              onChange={handleChange}
              error={(errors.name && touched.name && errors.name) as string}
            />
            <TextInput
              id="email"
              label="Email"
              type="email"
              value={values.email}
              onChange={handleChange}
              error={(errors.email && touched.email && errors.email) as string}
            />
            <TextInput
              id="password"
              label="Password"
              type="password"
              onChange={handleChange}
              value={values.password}
              error={
                (errors.password &&
                  touched.password &&
                  errors.password) as string
              }
            />
            <TextInput
              id="confirmPassword"
              label="Confirm password"
              type="password"
              onChange={handleChange}
              value={values.confirmPassword}
              error={
                (errors.confirmPassword &&
                  touched.confirmPassword &&
                  errors.confirmPassword) as string
              }
            />
            <Button
              type="submit"
              //   || !touched.email || !touched.password
              disabled={
                isSubmitting ||
                !values.email ||
                !values.name ||
                !values.password ||
                !isValid
              }
              loading={isSubmitting}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
