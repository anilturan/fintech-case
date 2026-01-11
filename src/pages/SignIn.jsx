import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../services/userService';
import { useAuthStore } from '../store/authStore';
import AuthLayout from '../components/auth/AuthLayout';
import Input from '../components/Input';
import AuthSwitchLink from '../components/auth/AuthSwitchLink';
import AuthProviderButton from '../components/auth/AuthProviderButton';
import Button from '../components/common/Button';

const schema = yup.object({
  email: yup.string().email('Geçerli bir e-posta girin.').required('E-posta zorunludur.'),
  password: yup
    .string()
    .min(6, 'Şifre en az 6 karakter olmalı.')
    .required('Şifre zorunludur.')
});

export default function SignIn() {
  const navigate = useNavigate();
  const { token, setAuth } = useAuthStore();
  const loginMutation = useMutation({
    mutationFn: loginUser
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: '', password: '' }
  });

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  const onSubmit = async (values) => {
    try {
      const response = await loginMutation.mutateAsync(values);
      setAuth({
        token: response?.token || response?.accessToken,
        user: response?.user || { name: response?.name }
      });
      toast.success('Hoş geldiniz!');
      navigate('/dashboard');
    } catch (error) {
      if (error?.response?.data?.details?.length) {
        error.response.data.details.forEach((item) => {
          if (item?.field && item?.message) {
            setError(item.field, { type: 'server', message: item.message });
          }
        });
        toast.error(error.response.data.message || 'Giriş başarısız.');
        return;
      }
      toast.error(error?.message || 'Giriş başarısız.');
    }
  };

  const isSubmitting = loginMutation.isPending;

  return (
    <AuthLayout
      title="Sign In"
      subtitle="Welcome back! Please enter your details"
      footer={
        <AuthSwitchLink
          prefix="Don't have an account?"
          linkText="Sign up"
          to="/signup"
        />
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label="Email"
          name="email"
          type="email"
          {...register('email')}
          disabled={isSubmitting}
          placeholder="example@gmail.com"
          error={errors.email?.message}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          {...register('password')}
          disabled={isSubmitting}
          placeholder="••••••"
          error={errors.password?.message}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
      <AuthProviderButton label="Sign in with google" />
    </AuthLayout>
  );
}
