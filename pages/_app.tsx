import * as React from 'react';
// components
import Head from 'next/head';
// providers
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/client';
// types
import { AppProps } from 'next/app';
// local
import { theme } from '@md-styles/styled/theme';
import { GlobalStyles } from '@md-styles/styled/global';
// hooks
import { useApollo } from '../lib/apolloClient';
// utils
import { cookiesManager } from '@md-managers/cookies';
// global css
import 'normalize.css/normalize.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { getToken } = cookiesManager();
  const token: string | undefined = pageProps.serverToken ?? getToken();
  const apolloClient = useApollo(pageProps.initialApolloState, token);

  return (
    <>
      <Head>
        <title>Cultum Starter Kit</title>
        <link rel='icon' href='/favicon.ico' />
        <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1' />
        <meta charSet='utf-8' />
      </Head>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </ThemeProvider>
      <GlobalStyles />
    </>
  );
};

export default MyApp;
