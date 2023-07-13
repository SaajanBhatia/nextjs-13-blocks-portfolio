'use client';

import React from 'react';
import { SimpleGrid, Skeleton, Box } from '@chakra-ui/react'


const SkeletonCard = () => {
    return (
        <Box m={5} p={5}>
            <SimpleGrid gap={6} columns={{ base: 1, md: 2, lg: 3 }}>
                <Skeleton height='10rem' className='p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700' />
                <Skeleton height='10rem' className='p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700' />
                <Skeleton height='10rem' className='p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700' />
            </SimpleGrid>
        </Box>

    );
};

export default SkeletonCard;