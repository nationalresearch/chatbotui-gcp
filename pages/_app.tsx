import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { useAuth } from '@clerk/nextjs';
import UserContext from './UserContext';

const inter = Inter({ subsets: ['latin'] });

function MyApp({ Component, pageProps }: AppProps<{}>) {
  const queryClient = new QueryClient();
  const { isLoaded, userId, sessionId } = useAuth();

  // In case the user signs out while on the page or if the auth is not loaded yet
  if (!isLoaded || !userId) {
    return null;
  }

  return (
    <div className={inter.className}>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <ClerkProvider {...pageProps}>
          <UserContext.Provider value={{ userId, sessionId }}>
            <div>
              Hello, {userId} your current active session is {sessionId}
            </div>
            <Component {...pageProps} />
          </UserContext.Provider>
        </ClerkProvider>
      </QueryClientProvider>
    </div>
  );
}

export default appWithTranslation(MyApp);