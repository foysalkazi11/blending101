import '../styles/globals.scss';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import AuthProvider from '../auth/auth.component';
import { AppProps } from 'next/app';
import '../styles/variables.module.scss';
import Amplify from 'aws-amplify';
import awsconfig from '../configs/aws';
import Loader from '../theme/loader/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApolloProvider } from '@apollo/client';
import client from '../gqlLib/client';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
Amplify.configure(awsconfig);

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const AuthLayoutProvider = [
    '/login',
    '/forget_password',
    '/reset_password',
    '/signup',
    '/verify_email',
  ].includes(router.pathname)
    ? Fragment
    : AuthProvider;

  return (
    <>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <AuthProvider>
            <Loader />
            <ToastContainer />
            {/* @ts-ignore */}
            <Component {...pageProps} />
          </AuthProvider>
        </Provider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
