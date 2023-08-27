import "../styles/globals.scss";
import type { NextPage } from "next";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import AuthProvider from "../context/AuthProvider";
import { AppProps } from "next/app";
import Loader from "../theme/loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApolloProvider } from "@apollo/client";
import client from "../gqlLib/client";
import { config } from "@fortawesome/fontawesome-svg-core";
import dynamic from "next/dynamic";

const FeedbackImport = dynamic(() => import("simple-screenshot-feedback"), {
  ssr: false,
});
import "@fortawesome/fontawesome-svg-core/styles.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Layout from "../layouts";
import { Fragment, ReactElement, ReactNode } from "react";

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.useLayout ||
    ((page: ReactNode) => <Layout {...Component.meta}>{page} </Layout>);

  const handleSubmitError = (error: any) => {
    console.log(error);
  };

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <AuthProvider>
          <DndProvider backend={HTML5Backend}>
            {getLayout(
              <Fragment>
                <Loader />
                <ToastContainer limit={3} />
                {/* @ts-ignore */}
                <FeedbackImport
                  //@ts-ignore
                  slackToken={process.env.NEXT_PUBLIC_SLACK_API_KEY}
                  slackChannel={process.env.NEXT_PUBLIC_SLACK_CHANNEL}
                  handleSubmitError={handleSubmitError}
                />
                {/* @ts-ignore */}
                <Component {...pageProps} />
              </Fragment>,
            )}
          </DndProvider>
        </AuthProvider>
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;

type AppPropsWithLayout = AppProps & {
  Component: CustomLayout;
};

export type CustomLayout<P = {}, IP = P> = NextPage<P, IP> & {
  meta?: { title: string; icon: string };
  useLayout?: (page: ReactElement) => ReactNode;
};
