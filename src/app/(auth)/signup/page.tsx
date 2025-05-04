import SignUpMain from '@/app/components/Modules/SignUpRoot/SignUpMain';
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: `Sign Up | NASS`,
    description: 'Create an account to access NASS and start your learning journey.'
};
export default function SignUpPage() {


  return (
    <SignUpMain />
  );
}
