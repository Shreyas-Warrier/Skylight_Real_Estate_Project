/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Box, Flex, Spinner, Text, Icon } from '@chakra-ui/react';
import { Avatar} from '@chakra-ui/avatar';
import { useParams } from 'react-router-dom';
import ImageScrollBar from '../components/ImageScrollBar';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import {BsGridFill} from 'react-icons/bs'
import { GoVerified } from 'react-icons/go';
import { FaBed, FaBath } from 'react-icons/fa';
import millify from 'millify';

const PropertyDetails = () => {
    const { id } = useParams();
    const [propertyDetails, setPropertyDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/properties/${id}`);
                const data = await response.json();
                setPropertyDetails(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching property details:', error);
                setLoading(false);
            }
        };

        fetchPropertyDetails();
    }, [id]);

    const handleNextImage = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex + 1) % propertyDetails.photos.length);
    };

    const handlePrevImage = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex - 1 + propertyDetails.photos.length) % propertyDetails.photos.length);
    };

    return (
        <Box maxWidth="1000px" margin="auto" p="4" position="relative">
            {loading ? (
                <Flex justifyContent="center" alignItems="center" height="50vh">
                    <Spinner size="xl" color="blue.500" />
                </Flex>
            ) : (
                <Box>
                    <Flex alignItems="center" justifyContent="center" position="relative">
                        <Box position="absolute" left="0" top="50%" transform="translateY(-50%)" onClick={handlePrevImage}>
                            <Icon as={FaArrowAltCircleLeft} fontSize="2xl" cursor="pointer" />
                        </Box>
                        <ImageScrollBar data={[propertyDetails.photos[selectedImageIndex]]} />
                        <Box position="absolute" right="0" top="50%" transform="translateY(-50%)" onClick={handleNextImage}>
                            <Icon as={FaArrowAltCircleRight} fontSize="2xl" cursor="pointer" />
                        </Box>
                    </Flex>
                    <Box w="full" p="6">
                    <Flex paddingTop="2" alignItems='center' justifyContent="space-between">
                        <Flex alignItems="center">
                        <Box paddingRight="3" color="green.400">{propertyDetails.isVerified && <GoVerified />}</Box>
                        <Text fontWeight="bold" fontSize="lg">AED {millify(propertyDetails.price)}{propertyDetails.rentFrequency && `/${propertyDetails.rentFrequency}`}</Text>
                        </Flex>
                        <Box>
                            <Avatar size="sm" src={propertyDetails.agency?.logo?.url} />
                        </Box>
                    </Flex>

                    <Flex alignItems="center" p="1" justifyContent="space-between" w="250px" color="blue.400">
                        {propertyDetails.rooms} <FaBed /> | {propertyDetails.baths} <FaBath /> | {millify(propertyDetails.area)} sqft <BsGridFill />
                    </Flex>
                    <Box marginTop="2">
                    <Text fontSize='lg' marginBottom="2" fontWeight="bold">
                    {propertyDetails.title}
                    </Text>
                    <Text lineHeight="2" color="gray.600">
                        {propertyDetails.description}
                    </Text>
                    </Box>     
                    <Flex flexWrap="wrap" textTransform="uppercase" justifyContent="space-between">
                        <Flex justifyContent="space-between" w="400px" borderBottom="1px" borderColor="gray.100" p="3">
                            <Text>Type</Text>
                            <Text fontWeight="bold">{propertyDetails.type}</Text>
                        </Flex>
                        <Flex justifyContent="space-between" w="400px" borderBottom="1px" borderColor="gray.100" p="3">
                            <Text>Purpose</Text>
                            <Text fontWeight="bold">{propertyDetails.purpose}</Text>
                        </Flex>
                        {propertyDetails.furnishingStatus && (
                            <Flex justifyContent="space-between" w="400px" borderBottom="1px" borderColor="gray.100" p="3">
                            <Text>Furnishing Status</Text>
                            <Text fontWeight="bold">{propertyDetails.furnishingStatus}</Text>
                        </Flex>
                        )}
                    </Flex>
                    <Box>
                        {propertyDetails.amenities.length && <Text fontSize="2xl" fontWeight="black" marginTop="5">Amenities</Text>}
                        <Flex flexWrap="wrap">
                            {propertyDetails.amenities.map((item) => (
                                item.amenities.map((amenity) => (
                                    <Text fontWeight="bold" color="blue.400" fontSize="l" p="2" bg="gray.200" m="1" borderRadius="5"
                                    key={amenity.text}>{amenity.text}</Text>
                                ))
                            ))}
                        </Flex>
                    </Box>
                    </Box>
                    
                </Box>
            )}
        </Box>
    );
};

export default PropertyDetails;
