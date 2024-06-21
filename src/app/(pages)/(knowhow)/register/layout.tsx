import { KnowhowNavbarForms } from '@/app/components/shared/KnowhowFormsHeader'
import '../../styles.css'

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <KnowhowNavbarForms/>
        {children}
      </body>
    </html>
  )
}