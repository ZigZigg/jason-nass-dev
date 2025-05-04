import { Metadata } from 'next';
import SignInMain from '@/app/components/Modules/SignInRoot/SignInMain';
export const metadata: Metadata = {
    title: `Log In | NASS`,
    description: 'Log in to your NASS account to access your resources and continue learning.'
};
export default function LoginPage() {

  return (
    <SignInMain />
  );
}
