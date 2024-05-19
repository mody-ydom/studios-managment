// _app.tsx
import "@/styles/globals.css";
import LogoutButton from "@/src/components/LogoutButton";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/store";
import Head from "next/head";
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/src/theme";
import UserSetup from "@/src/components/UserSetup";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppCacheProvider>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <UserSetup />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </AppCacheProvider>
  );
}
