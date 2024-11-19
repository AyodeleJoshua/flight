import { Form, Formik } from 'formik';
import Button from '../../lib/Button';
import TextInput from '../../lib/TextInput';
import { LoginSchema } from '../../utils/validationSchema';
import { login } from '../../services/auth.service';
import { Alert } from '../../lib';
import { useState } from 'react';
import { ApiResponseError, AuthApiSuccessfulResponse } from '../../utils/types';
import constants from '../../utils/constants';
import { setBulkItemsInLocalStorage } from '../../utils/localStorageOperations';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import actionTypes from '../../context/auth/actionTypes';

const Login = () => {
  const [responseError, setResponseError] = useState('');
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  return (
    <div>
      {responseError && <Alert>{responseError}</Alert>}
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          try {
            const response = (await login(values)) as AuthApiSuccessfulResponse;
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
            <Button
              type="submit"
              disabled={
                isSubmitting || !values.email || !values.password || !isValid
              }
              loading={isSubmitting}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
      <p>
        Don't have an account? <Link to="/auth/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
