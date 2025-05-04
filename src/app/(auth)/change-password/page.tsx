import { Metadata } from 'next';
import ChangePasswordMain from '@/app/components/Modules/ChangePassword/Main';
export const metadata: Metadata = {
    title: `Change Password | NASS`,
    description: 'Change Password'
};
export default function ChangePasswordPage() {

  return (
    <ChangePasswordMain />
  );
}
