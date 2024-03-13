import { Menu, MenuButton, MenuList, MenuItem, IconButton, Flex, Box, Spacer } from '@chakra-ui/react';
import { FcMenu, FcHome, FcAbout } from 'react-icons/fc';
import { BsSearch } from 'react-icons/bs';
import { FiKey } from 'react-icons/fi';
import Logout from './Logout';

const Navbar = () => (
  <Flex p='2' borderBottom='1px' borderColor='gray.100'>
    <Box fontSize='3xl' color='blue.400' fontWeight='bold'>
      <a href='/' style={{ paddingLeft: '2' }}>Skylight</a>
    </Box>
    <Spacer />
    <Box>
      <Menu>
        <MenuButton as={IconButton} icon={<FcMenu />} variant='outline' color='red.400' />
        <MenuList>
          <MenuItem>
            <a href='/home'>
              <FcHome /> Home
            </a>
          </MenuItem>
          <MenuItem>
            <a href='/search'>
              <BsSearch /> Search
            </a>
          </MenuItem>
          <MenuItem>
            <a href='/search?purpose=for-sale'>
              <FcAbout /> Buy Property
            </a>
          </MenuItem>
          <MenuItem>
            <a href='/search?purpose=for-rent'>
              <FiKey /> Rent Property
            </a>
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
