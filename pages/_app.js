import '../styles/globals.css';
import store from '../redux/store';
import { Provider } from 'react-redux';
import AuthProvider from '../auth/auth.component';

function MyApp({ Component, pageProps }) {
  return(
    <Provider store={store}>
      <AuthProvider>
         <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  )
}

export default MyApp
