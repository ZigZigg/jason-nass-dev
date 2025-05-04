import { Metadata } from 'next';
import ResetNewPasswordMain from '@/app/components/Modules/ResetNewPassword/Main';
export const metadata: Metadata = {
    title: `Reset Password | NASS`,
    description: 'Reset Password'
};
export default function ForgotPasswordPage() {

  return (
    <ResetNewPasswordMain />
  );
}
