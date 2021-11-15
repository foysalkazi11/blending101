import '../styles/globals.scss';
import store from '../redux/store';
import { Provider } from 'react-redux';
import AuthProvider from '../auth/auth.component';
import { AppProps } from 'next/app';
import '../styles/variables.module.scss';
import  '../styles/globalStyle.scss';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<AuthProvider>
				<Component {...pageProps} />
			</AuthProvider>
		</Provider>
	);
}

export default MyApp;
