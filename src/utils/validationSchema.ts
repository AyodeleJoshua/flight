import { object, string, ref, number, date } from 'yup';

export const LoginSchema = object().shape({
  email: string().email('Email must be valid').required('Email is required'),
  password: string()
    .min(2, 'Password too short!')
    .required('Password is required'),
});

export const NewFlightSchema = object().shape({
  code: string()
    .matches(/[a-zA-Z]{6}/, 'Code must be exactly 6 letters')
    .length(6)
    .required('Code is required'),
  capacity: number()
    .min(1, 'Capacity should be between 1 and 99')
    .max(99, 'Capacity should be between 1 and 99')
    .required('Capacity is required'),
  departureDate: date().required('Departure date must be a valid date!'),
});

export const RegisterSchema = object().shape({
  name: string().min(2, 'Name too short'),
  email: string().email(),
  password: string().min(2, 'Password too short!'),
  confirmPassword: string()
    .oneOf([ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});
