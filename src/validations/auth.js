import * as yup from 'yup';

export const signInSchema = yup.object().shape({
  email: yup.string().email('Email không hợp lệ.').max(100, 'Email không vượt quá 100 ký tự.').required('Email không được rỗng.'),
  password: yup.string().min(6, 'Mật khẩu phải tối thiểu 6 ký tự.').max(50, 'Mật khẩu quá dài (Tối đa 50 kí tự).').required('Mật khẩu không được rỗng.'),
});

export const signUpSchema = yup.object().shape({
  email: yup.string().email('Email không hợp lệ.').max(100, 'Email không vượt quá 100 ký tự.').required('Email không được rỗng.'),
  fullname: yup.string().max(100, 'Họ & tên không vượt quá 100 ký tự.').required('Họ & tên không được rỗng.'),
  password: yup.string().min(6, 'Mật khẩu phải tối thiểu 6 ký tự.').max(50, 'Mật khẩu quá dài (Tối đa 50 kí tự).').required('Mật khẩu không được rỗng.'),
  confirmPassword: yup.string().required('Nhập lại mật khẩu không được rỗng.'),
});