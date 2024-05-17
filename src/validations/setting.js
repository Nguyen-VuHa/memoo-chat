import * as yup from 'yup';

export const settingMenuSchema = yup.object().shape({
  MenuName: yup.string().max(100, 'The menu name length must not exceed 100 characters').required('Menu name is require'),
  Path: yup.string().max(50, 'The menu path is too long (maximum 50 characters).').required('Menu path is require'),
});

export const settingRoleSchema = yup.object().shape({
  RoleName: yup.string().max(50, 'The role name length must not exceed 50 characters').required('Role name is require'),
});


export const settingUserSchema = yup.object().shape({
  Email: yup.string().email('Invalid email.').max(100, 'The email length must not exceed 100 characters').required('Email is require'),
  Password: yup.string().min(6, 'The password must be at least 6 characters long.').max(50, 'The password is too long (maximum 50 characters).').required('Password is require'),
  FullName: yup.string().max(50, 'The full name length must not exceed 50 characters').required('Full name is require'),
  PermissionRole: yup.string().required('Permission role is require'),
});