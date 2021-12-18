import type { AppProps } from 'next/app';
import { UserProvider } from '../context/personContext';

import 'animate.css';
import '../styles/globals.scss';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp
