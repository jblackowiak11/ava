import './globals.css';
import SessionProvider from '../components/session-provider';

export const metadata = {
  title: 'Ava',
  description: 'AI assistant for Abodie',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider session={null}>{children}</SessionProvider>
      </body>
    </html>
  );
}
