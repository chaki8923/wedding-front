import { Noto_Sans_JP } from 'next/font/google'
 
const notoSansJP = Noto_Sans_JP({
  preload: false,
  weight: ['400','500','700'],
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
})
 
export { notoSansJP }
