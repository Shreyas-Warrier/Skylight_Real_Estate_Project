/* eslint-disable react/prop-types */
import { Box } from '@chakra-ui/react';

import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }) => (
  <>
    <CustomHead>
      <title>Real Estate</title>
    </CustomHead>
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

const CustomHead = ({ children }) => (
  <head>
    {children}
  </head>
);

export default Layout;
