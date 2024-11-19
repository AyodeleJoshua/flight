import { Formik, Form, Field } from 'formik';
import { Alert, Datepicker } from '../../lib';
import { ApiResponseError } from '../../utils/types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '../../lib/TextInput';
import Button from '../../lib/Button';
import { NewFlightSchema } from '../../utils/validationSchema';
import { createFlight } from '../../services/flightServices';
import { useQueryClient } from '@tanstack/react-query';

const NewFlight = () => {
  const [responseError, setResponseError] = useState('');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return (
    <div>
      <div>
        {responseError && <Alert>{responseError}</Alert>}
        <Formik
          initialValues={{ code: '', capacity: '', departureDate: '' }}
          validationSchema={NewFlightSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
              await createFlight(values);
              queryClient.invalidateQueries({ queryKey: ['all-flights'] });
              navigate('/flights');
            } catch (error) {
              const responseError = error as ApiResponseError;
              setResponseError(responseError.response.data.message);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, errors, touched, isSubmitting, handleChange }) => (
            <Form>
              <TextInput
                id="code"
                label="Code"
                type="text"
                value={values.code}
                onChange={handleChange}
                error={(errors.code && touched.code && errors.code) as string}
              />
              <TextInput
                id="capacity"
                label="Capacity"
                type="number"
                onChange={handleChange}
                value={values.capacity}
                error={
                  (errors.capacity &&
                    touched.capacity &&
                    errors.capacity) as string
                }
              />
              <Field name="departureDate">
                {({
                  field,
                  meta,
                }: {
                  field: {
                    onChange: React.ChangeEventHandler<HTMLInputElement>;
                  };
                  meta: { error: string; touched: boolean };
                }) => (
                  <Datepicker
                    hasError={(meta.error && meta.touched) as boolean}
                    error={meta.error}
                    label="Flight Departure Time"
                    id="departureDate"
                    onDateChange={field.onChange}
                    format="yyyy-MM-dd"
                  />
                )}
              </Field>

              <Button type="submit" loading={isSubmitting}>
                Create Flight
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NewFlight;
