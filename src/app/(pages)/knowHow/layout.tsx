

import { KnowHowNavbar } from '@/app/components/knowhow/welcome/KnowHowNavbar';
import './knowhow.css'


export const metadata = {
  title: 'Marketing page',
  description: 'This is marketing page',
}

export default function KnowHowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
      <KnowHowNavbar/>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}

