/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useEffect,useState } from 'react';
import {Flex, Box, Text, Button, Image, Link} from '@chakra-ui/react';
import axios from 'axios'

const Banner = ({purpose, title1, title2, desc1, desc2, buttonText, linkName, imageUrl}) => (
  <Flex flexWrap='wrap' justifyContent='center' alignItems='center' m='10'>
    <Image src={imageUrl} width={500} height={300} />
    <Box p='5'>
      <Text color='gray.500' fontSize='sm' fontWeight='medium'>{purpose}</Text>
      <Text fontSize='3xl' fontWeight='bold'>{title1}<br />{title2}</Text>
      <Text fontSize='lg' paddingTop='3' paddingBottom='3' color='gray.700'>{desc1}<br />{desc2}</Text>
      <Button fontSize='xl' bg="blue.300">
        <a href={linkName}>
          {buttonText}
        </a>
      </Button>
    </Box>
  </Flex>
)

const Home = () =>{

  const [propsForSale, setPropsForSale] = useState([]);
  const [propsForRent, setPropsForRent] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const saleResponse = await axios.get('http://localhost:8080/api/properties?type=for-sale');
        //console.log('Sale Response:', saleResponse.data.hits);
        setPropsForSale(saleResponse.data.hits);

        const rentResponse = await axios.get('http://localhost:8080/api/properties?type=for-rent');
        //console.log('Rent Response:', rentResponse.data.hits);
        setPropsForRent(rentResponse.data.hits);
      }
      catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.')
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>
  }

  return(
    <Box>
      <Banner 
        purpose="Rent a Home"
        title1="Rental Homes for"
        title2="Everyone"
        desc1 = "Explore Apartments, Villas, Homes"
        desc2 = "and more"
        buttonText = "Explore Renting"
        linkName="/search?purpose=for-rent"
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
      />

      <Flex flexWrap="wrap">
        {propsForSale.map((property) => 
          <Property property={property} key={property.id} />
        )}
      </Flex>

      <Banner 
        purpose="Buy a Home"
        title1="Find, Buy and Own Your"
        title2="Dream House"
        desc1 = "Explore Apartments, Villas, Homes"
        desc2 = "and more"
        buttonText = "Explore Buying"
        linkName="/search?purpose=for-sale"
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008'
      />

    {propsForSale.map((property) => 
              <Property property={property} key={property.id} />
            )}
    </Box>
  )
}

export default Home;