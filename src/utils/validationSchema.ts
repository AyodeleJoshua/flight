import { object, string, ref, number, date } from 'yup';

export const LoginSchema = object().shape({
  email: string().email().required('Email is required'),
  password: string()
    .min(2, 'Password too short!')
    .required('Password is required'),
});

export const NewFlightSchema = object().shape({
  code: string()
    .matches(/[a-zA-Z]{6}/)
    .min(6, 'Code must be 6 characters')
    .max(6, 'Code must be 6 characters')
    .required('Code is required'),
  capacity: number()
    .min(1, 'Capacity should be between 1 and 50')
    .max(50, 'Capacity should be between 1 and 50')
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
