import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Box, styled, ThemeProvider } from '@mui/material';
import appTheme from '../lib/theme';
import { AuthUserProvider } from '../lib/providers/AuthProvider';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../lib/apolloClient';

const StyledAppContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  height: '100vh',
}));

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient} >
      <ThemeProvider theme={appTheme}>
        <AuthUserProvider>
          <StyledAppContainer>
            <Component {...pageProps} />
          </StyledAppContainer>
        </AuthUserProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
