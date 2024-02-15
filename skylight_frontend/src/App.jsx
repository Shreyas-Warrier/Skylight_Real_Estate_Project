/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; 
import { ChakraProvider } from '@chakra-ui/react';
import Layout from './components/Layout';
import Home from './container/Home';
import Login from './components/Login';

const App = ({ Component, pageProps }) => {

  const location = useLocation();

  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    const routeChangeStart = () => {
      NProgress.start();
    };

    const routeChangeComplete = () => {
      NProgress.done();
    };

    window.addEventListener('routeChangeStart', routeChangeStart);
    window.addEventListener('routeChangeComplete', routeChangeComplete);

    return () => {
      window.removeEventListener('routeChangeStart', routeChangeStart);
      window.removeEventListener('routeChangeComplete', routeChangeComplete);
    };
  }, []);

  const isPath = location.pathname === '/login';

  return (
    <>
      <ChakraProvider>
        {!isPath && (
          <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
        )}
        </ChakraProvider>
        {isPath && (
          <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
        )}
    </>
  );
};

export default App;
