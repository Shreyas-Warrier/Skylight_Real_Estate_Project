/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import {Flex, Box, Text, Button, Image} from '@chakra-ui/react';

const Banner = ({purpose, title1, title2, desc1, desc2, buttonText, linkName, imageUrl}) => (
  <Flex flexWrap='wrap' justifyContent='center' alignItems='center' m='10'>
    <Image src={imageUrl} width={500} height={300} />
    <Box p='5'>
      <Text color='gray.500' fontSize='sm' fontWeight='medium'>{purpose}</Text>
      <Text fontSize='3xl' fontWeight='bold'>{title1}<br />{title2}</Text>
      <Text fontSize='lg' paddingTop='3' paddingBottom='3' color='gray.700'>{desc1}<br />{desc2}</Text>
      <Button fontSize='xl' bg="blue.300" color="white" as="a" href={linkName}> 
        {buttonText}
      </Button>
    </Box>
  </Flex>
)

export default function Home()
{
  return(
    <div>
      <h1>Hello World</h1>
      <Banner 
        purpose="Rent a Home"
        title1="Rental Homes for"
        title2="Eneryone"
        desc1 = "Expllore Apartments, Villas, Homes"
        desc2 = "and more"
        buttonText = "Explore Renting"
        linkName="/search?purpose=for-rent"
      />
      <Banner purpose={'For Rent'} />
    </div>
  )
}