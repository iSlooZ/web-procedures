import '../../styles.css'
import { KnowHowNavbar } from '@/app/components/knowhow/KnowHowNavbar';


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

