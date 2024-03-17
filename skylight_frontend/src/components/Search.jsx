/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Flex, Box, Text, Icon, Image, Spinner } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';
import SearchFilters from './SearchFilters';
import Property from './Property';

const Search = () => {
    const[searchFilters, setSearchFilters] = useState(false);
    const[purpose, setPurpose] = useState('');
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const [minPrice, setMinPrice] = useState('0');
    const [maxPrice, setMaxPrice] = useState('1000000');
    const [rentFrequency, setRentFrequency] = useState('yearly');
    const [roomsMin, setRoomsMin] = useState('0');
    const [bathsMin, setBathsMin] = useState('0');
    const [sort, setSort] = useState('price-desc');
    const [areaMax, setAreaMax] = useState('35000');
    const [locationExternalIDs, setLocationExternalIDs] = useState('5002');
    const [categoryExternalID, setCategoryExternalID] = useState('4');
    
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        setPurpose(searchParams.get('purpose') || 'for-rent');
        setRentFrequency(searchParams.get('rentFrequency') || 'yearly');
        setMinPrice(searchParams.get('minPrice') || '0');
        setMaxPrice(searchParams.get('maxPrice') || '1000000');
        setRoomsMin(searchParams.get('roomsMin') || '0');
        setBathsMin(searchParams.get('bathsMin') || '0');
        setSort(searchParams.get('sort') || 'price-desc');
        setAreaMax(searchParams.get('areaMax') || '35000');
        setLocationExternalIDs(searchParams.get('locationExternalIDs') || '5002');
        setCategoryExternalID(searchParams.get('categoryExternalID') || '4');
        fetchData();
    }, [location, purpose, rentFrequency, minPrice, maxPrice, roomsMin, bathsMin, sort, areaMax, locationExternalIDs, categoryExternalID]);

    const fetchData = async () => {
        try {
            const queryParams = new URLSearchParams({
                purpose,
                rentFrequency,
                minPrice,
                maxPrice,
                roomsMin,
                bathsMin,
                sort,
                areaMax,
                locationExternalIDs,
                categoryExternalID,
            }).toString();
            const url = `http://localhost:8080/api/properties?${queryParams}`;
            const response = await fetch(url);
            const data = await response.json();
            
            setProperties(data?.hits || []);
        } catch (error) {
            console.error('Error fetching properties:', error);
        } finally {
            setLoading(false); 
        }
    };


    return(
        <Box>
            <Flex
            cursor="pointer" bg="gray.100"
            borderBottom="1px"
            borderColor="gray.200"
            p="2"
            fontWeight="black"
            fontSize="lg"
            justifyContent="center"
            alignItems="center"
            onClick={() => setSearchFilters((prevFilters) => !prevFilters)}
            >
                <Text>Search Property By</Text>
                <Icon paddingLeft="2" w="7" as={BsFilter} />   
            </Flex>
            {searchFilters && <SearchFilters />}
            <Text fontSize="2xl" p="4" fontWeight="bold">
                Properties {purpose}
            </Text>
            {loading ? (
                <Flex justifyContent="center" alignItems="center" height="50vh">
                    <Spinner size="xl" color="blue.500" />
                </Flex>
            ) : (
                <Flex flexWrap="wrap">
                    {properties.map(property => (
                        <Property property={property} key={property.id} />
                    ))}
                </Flex>
            )}
            
        </Box>
    )
}

export default Search;