import "../styles/globals.scss";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import AuthProvider from "../auth/auth.component";
import { AppProps } from "next/app";
import "../styles/variables.module.scss";
import Amplify from "aws-amplify";
import awsconfig from "../configs/aws";
import Loader from "../theme/loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApolloProvider } from "@apollo/client";
import client from "../gqlLib/client";
import { useRouter } from "next/router";
import { config } from "@fortawesome/fontawesome-svg-core";
import dynamic from "next/dynamic";

const FeedbackImport = dynamic(() => import("simple-screenshot-feedback"), {
  ssr: false,
});
import "@fortawesome/fontawesome-svg-core/styles.css";
import Head from "next/head";
import { useAppSelector } from "../redux/hooks";
import HeadTagInfo from "../theme/headTagInfo";
import FooterRecipeFilter from "../components/footer/footerRecipeFilter.component";

config.autoAddCss = false;
Amplify.configure(awsconfig);

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const handleSubmitError = (error: any) => {
    console.log(error);
  };

  return (
    <>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <AuthProvider>
            <HeadTagInfo />
            <Loader />
            <ToastContainer />
            {/* @ts-ignore */}
            <FeedbackImport
              //@ts-ignore
              slackToken={process.env.NEXT_PUBLIC_SLACK_API_KEY}
              slackChannel={process.env.NEXT_PUBLIC_SLACK_CHANNEL}
              handleSubmitError={handleSubmitError}
            />

            {/* @ts-ignore */}
            <Component {...pageProps} />
            <FooterRecipeFilter />
          </AuthProvider>
        </Provider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
