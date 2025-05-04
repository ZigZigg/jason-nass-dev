import { Metadata } from 'next';
import ForgotPasswordMain from '@/app/components/Modules/ForgotPassword/Main';
export const metadata: Metadata = {
    title: `Forgot Password | NASS`,
    description: 'Forgot Password'
};
export default function ForgotPasswordPage() {

  return (
    <ForgotPasswordMain />
  );
}
