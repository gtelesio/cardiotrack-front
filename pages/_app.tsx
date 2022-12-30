import '../styles/globals.css';
import { AppPropsWithLayout } from 'src/types/app/app.type';


export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page:React.ReactNode) => page);
  return getLayout(<Component {...pageProps} />)
}
