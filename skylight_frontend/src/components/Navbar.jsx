import { Menu, MenuButton, MenuList, MenuItem, IconButton, Flex, Box, Spacer } from '@chakra-ui/react';
import { FcMenu, FcHome, FcAbout } from 'react-icons/fc';
import { BsSearch } from 'react-icons/bs';
import { FiKey, FiSettings } from 'react-icons/fi';
import {Link} from 'react-router-dom';
import Logout from './Logout';

const Navbar = () => (
  <Flex p='2' borderBottom='1px' borderColor='gray.100'>
    <Box fontSize='3xl' color='blue.400' fontWeight='bold'>
      <Link to='/' style={{ paddingLeft: '2' }}>Skylight</Link>
    </Box>
    <Spacer />
    <Box>
      <Menu>
        <MenuButton as={IconButton} icon={<FcMenu />} variant='outline' color='red.400' />
        <MenuList>
          <MenuItem>
            <Link to='/home'>
              <FcHome /> Home
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to='/search'>
              <BsSearch /> Search
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to='/search?purpose=for-sale'>
              <FcAbout /> Buy Property
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to='/search?purpose=for-rent'>
              <FiKey /> Rent Property
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to='/dashboard'> 
              <FiSettings /> Dashboard 
            </Link>
          </MenuItem>
          <MenuItem>
            <Logout />
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  </Flex>
);

export default Navbar;
