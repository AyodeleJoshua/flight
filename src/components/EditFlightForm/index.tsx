import { Field, Form, Formik } from 'formik';
import { FlightDetailsSuccessfulResponseType } from '../../utils/types';
import TextInput from '../../lib/TextInput';
import { Alert, Datepicker } from '../../lib';
import Button from '../../lib/Button';
import { NewFlightSchema } from '../../utils/validationSchema';

interface EditFlightFormProps {
  flightDetails: FlightDetailsSuccessfulResponseType;
  onFormSubmit: (
    values: any,
    setSubmitting: (isSubmitting: boolean) => void,
  ) => Promise<any>;
  responseError: string;
}

const EditFlightForm = ({
  flightDetails,
  onFormSubmit,
  responseError,
}: EditFlightFormProps) => {
  const { code, capacity, departureDate } = flightDetails;
  return (
    <div>
      {responseError && <Alert>{responseError}</Alert>}
      <Formik
        initialValues={{ code, capacity, departureDate }}
        validationSchema={NewFlightSchema}
        onSubmit={async (values, { setSubmitting }) => {
          onFormSubmit(values, setSubmitting);
        }}
      >
        {({ values, errors, touched, isSubmitting, handleChange, isValid }) => (
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
                  defaultSelected={values.departureDate}
                />
              )}
            </Field>

            <Button
              type="submit"
              disabled={
                isSubmitting ||
                !values.capacity ||
                !values.code ||
                !values.departureDate ||
                !isValid
              }
              loading={isSubmitting}
            >
              Update Flight
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditFlightForm;
