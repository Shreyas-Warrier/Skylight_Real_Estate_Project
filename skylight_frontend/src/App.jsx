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
import Nlogin from './components/Nlogin';
import Register from './components/Register';
import Search from './components/Search';
import PropertyDetails from './property/[id]';
import AuthLayout from './components/AuthLayout';
import Dashboard from './components/Dashboard';

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

  const isPath = location.pathname === '/' | location.pathname === '/register' | location.pathname === '/login';

  return (
    <>
      <ChakraProvider>
        {!isPath && (
          <AuthLayout>
          <Layout>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Layout>
        </AuthLayout>
        )}
        </ChakraProvider>
        {isPath && (
          <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Nlogin />} />
        </Routes>
        )}
    </>
  );
};

export default App;
