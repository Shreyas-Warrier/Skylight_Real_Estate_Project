/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, Flex, Text} from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/avatar';
import {BsGridFill} from 'react-icons/bs'
import { GoVerified } from 'react-icons/go';
import { FaBed, FaBath } from 'react-icons/fa';
import millify from 'millify';
import {Link} from 'react-router-dom';

import DefaultImage from '../assets/house.jpg';

const Property = ({ property: { coverPhoto, price, rentFrequency, rooms, title, baths, area, agency, isVerified, externalID } }) => (
  <Link to={`/property/${externalID}`} target="_blank" rel="noopener noreferrer">
    <Flex flexWrap='wrap' w='420px' p='5' paddingTop='0px' justifyContent='flex-start' cursor='pointer'>
      <Box>
        <img src={coverPhoto ? coverPhoto.url : DefaultImage} alt="house" width={400} height={260}/>
      </Box>
      <Box w="full">
          <Flex paddingTop="2" alignItems='center' justifyContent="space-between">
              <Flex alignItems="center">
                  <Box paddingRight="3" color="green.400">{isVerified && <GoVerified />}</Box>
                  <Text fontWeight="bold" fontSize="lg">AED {millify(price)}{rentFrequency && `/${rentFrequency}`}</Text>
              </Flex>
              <Box>
                  <Avatar size="sm" src={agency?.logo?.url} />
              </Box>
          </Flex>

          <Flex alignItems="center" p="1" justifyContent="space-between" w="250px" color="blue.400">
            {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft <BsGridFill />
          </Flex>
          <Text fontSize='lg'>
          {title.length > 30 ? title.substring(0, 30) + '...' : title}
        </Text>
      </Box>
    </Flex>
  </Link>
);

export default Property;
