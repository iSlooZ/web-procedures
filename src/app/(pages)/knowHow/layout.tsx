
import "../../(home)/globals.css";

export const metadata = {
  title: 'Marketing page',
  description: 'This is marketing page',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}

