import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../services/userService';
import AuthLayout from '../components/auth/AuthLayout';
import Input from '../components/Input';
import AuthSwitchLink from '../components/auth/AuthSwitchLink';
import AuthProviderButton from '../components/auth/AuthProviderButton';
import Button from '../components/common/Button';

const schema = yup.object({
  fullName: yup.string().required('Ad soyad zorunludur.'),
  email: yup.string().email('Geçerli bir e-posta girin.').required('E-posta zorunludur.'),
  password: yup
    .string()
    .min(8, 'Şifre en az 8 karakter olmalı.')
    .required('Şifre zorunludur.')
});

export default function SignUp() {
  const navigate = useNavigate();
  const registerMutation = useMutation({
    mutationFn: registerUser
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { fullName: '', email: '', password: '' }
  });

  const onSubmit = async (values) => {
    try {
      await registerMutation.mutateAsync(values);
      toast.success('Hesabınız oluşturuldu.');
      navigate('/signin');
    } catch (error) {
      if (error?.response?.data?.details?.length) {
        error.response.data.details.forEach((item) => {
          if (item?.field && item?.message) {
            setError(item.field, { type: 'server', message: item.message });
          }
        });
        toast.error(error.response.data.message || 'Kayıt başarısız.');
        return;
      }
      toast.error(error?.message || 'Kayıt başarısız.');
    }
  };

  const isSubmitting = registerMutation.isPending;

  return (
    <AuthLayout
      title="Create new account"
      subtitle="Welcome back! Please enter your details"
      footer={
        <AuthSwitchLink
          prefix="Already have an account?"
          linkText="Sign in"
          to="/signin"
        />
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label="Full Name"
          name="fullName"
          type="text"
          {...register('fullName')}
          disabled={isSubmitting}
          placeholder="Mahfuzul Nabil"
          error={errors.fullName?.message}
        />
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
          isLoading={isSubmitting}
        >
          {isSubmitting ? 'Creating account...' : 'Create Account'}
        </Button>
      </form>
      <AuthProviderButton label="Sign up with google" />
    </AuthLayout>
  );
}
