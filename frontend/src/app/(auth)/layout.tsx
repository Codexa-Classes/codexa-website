import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - Codexa Classes',
  description: 'Login to access your Codexa Classes dashboard and manage your courses and applications.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
