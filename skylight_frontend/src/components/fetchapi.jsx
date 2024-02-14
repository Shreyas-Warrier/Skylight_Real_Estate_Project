/* eslint-disable no-unused-vars */
import axios from 'axios'

export const baseUrl = 'https://bayut.p.rapidapi.com'

export const fetchapi = async (url) => {
    const { data } = await axios.get((url), {
        headers: {
            'X-RapidAPI-Key': '7e0989b090msh650731a7ff6ffc1p1cfd8djsn5ef3262eed82',
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
          }
    });
      
    return data;
  }