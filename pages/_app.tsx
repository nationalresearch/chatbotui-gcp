import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { ClerkProvider, useUser } from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'] });

function MyApp({ Component, pageProps }: AppProps<{}>) {
  const queryClient = new QueryClient();
  const { isLoaded, isSignedIn, user } = useUser();

  // In case the user is not signed in or if the user data is not loaded yet
  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className={inter.className}>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <ClerkProvider {...pageProps}>
          <div>
            Hello, {user.firstName} welcome to Clerk
          </div>
          <Component {...pageProps} />
        </ClerkProvider>
      </QueryClientProvider>
    </div>
  );
}

export default appWithTranslation(MyApp);