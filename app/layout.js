import 'styles/globals.css'
import { Inter } from 'next/font/google'
import Head from 'next/head'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'V360 Case',
  description: 'Case for V360 Full Stack.',
}

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"/>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
