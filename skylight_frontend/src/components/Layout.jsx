/* eslint-disable react/prop-types */
import { Box } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';

import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }) => (
  <>
    <Helmet>
      <title>Real Estate</title>
    </Helmet>
    <Box maxWidth='1280px' m='auto'>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </Box>
  </>
);

export default Layout;
