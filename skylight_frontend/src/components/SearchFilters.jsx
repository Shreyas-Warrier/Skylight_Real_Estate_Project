/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {Image, Flex, Select, Box, Text, Input, Spinner, Icon, Button} from '@chakra-ui/react'
import {MdCancel} from 'react-icons/md'
import { useNavigate, useSearchParams } from "react-router-dom"
import { filterData, getFilterValues } from "../utils/filterData";

const SearchFilters = () => {

    const[filters, setFilters] = useState(filterData);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const searchProperties = (filterValues) => {

        const values = getFilterValues(filterValues);

        values.forEach((item) => {
            if (item.value !== undefined) {
                searchParams.set(item.name, item.value);
            }
        });

        navigate(`?${searchParams.toString()}`);
    }

    return(
        <Flex bg="gray.100" p="4" justifyContent="center" flexWrap="wrap">
            {filters.map((filter) => (
                <Box key={filter.queryName}>
                    <Select placeholder={filter.placeholder}
                    w="fit-content"
                    p="2"
                    onChange={(e) => searchProperties({[filter.queryName]:e.target.value})}>
                        {filter?.items?.map((item) => (
                            <option value={item.value} key={item.value}>
                                {item.name}
                            </option>
                        ))}
                    </Select>
                </Box>
            ))}
        </Flex>
    )
}

export default SearchFilters