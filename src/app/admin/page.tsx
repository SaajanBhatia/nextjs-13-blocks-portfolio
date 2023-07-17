'use client';
/**
 * All admin functions excluding CRUD on new cards, that will be done from the main
 * page if session exists
 */

import React, { useState, ChangeEvent } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation'
import useUser from '@/hooks/useUser';
import LoadingScreen from '@/components/LoadingPage';
import {
    Box, Heading, Text,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Button, Flex, IconButton
} from '@chakra-ui/react';
import useBlocks from '@/hooks/useBlocks';
import UpdateBlockCard from '@/components/UpdateBlockCard';
import { Block, Socials } from '@prisma/client';
import UpdateUserCard from '@/components/UpdateUserCard';
import { MinusIcon, AddIcon, ArrowBackIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import UpdateSocialsCard from '@/components/UpdateSocialsCard';



function Admin() {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            // The user is not authenticated, handle it here.
            redirect('/api/auth/signin?callbackUrl=/admin')
        },
    })

    const { blocks, blocksIsLoading, blocksErr } = useBlocks();
    const { user, userIsLoading, userErr } = useUser();

    const emptyBlock: Block = {
        id: '',
        headline: '',
        description: null,
        url: '',
        icon: null,
    };

    const emptySocial: Socials = {
        id: '',
        name: '',
        url: ''
    }


    if (userIsLoading) {
        return <LoadingScreen />
    }

    if (user) {
        return (
            <div className='container mt-8 px-8 pt-4 mx-auto mb-8'>

                <Flex alignItems="center">
                    <Link href={"/"}>
                        <IconButton
                            aria-label="Back"
                            icon={<ArrowBackIcon />}
                            borderRadius="full"
                            colorScheme="teal"
                            mr={2}
                            variant={'outline'}
                        />
                        <Text>Home</Text>
                    </Link>
                </Flex>

                {/* Heading and Back Button */}

                <Heading as='h3' size='lg' p={3}>
                    Admin Dashboard
                </Heading>

                {/* User Data  */}
                <Box my={3}>
                    <UpdateUserCard />
                </Box>


                {/* TODO: Change Password Form Submission */}
                <form>

                </form>

                {/* Blocks Form */}
                <Heading as='h4' size='md' p={3}>
                    Create New Block
                </Heading>
                <Box my={3}>
                    <UpdateBlockCard block={emptyBlock} createBlock={true} />
                </Box>

                <Box my={3}>
                    <Accordion allowMultiple>

                        <AccordionItem>
                            {({ isExpanded }) => (
                                <>
                                    <h2>
                                        <AccordionButton>
                                            <Box as="span" flex='1' textAlign='center'>
                                                Current Blocks ({blocks?.length})
                                            </Box>
                                            {isExpanded ? (
                                                <MinusIcon fontSize='12px' />
                                            ) : (
                                                <AddIcon fontSize='12px' />
                                            )}
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        {/* Available Blocks */}
                                        {blocks ? blocks.map((block: Block) => (
                                            <>
                                                <div className='sm:col-span-6 md:col-span-6 lg-col-span-6'>
                                                    <UpdateBlockCard block={block} createBlock={false} />
                                                </div>
                                            </>
                                        )) : null}
                                    </AccordionPanel>
                                </>
                            )}
                        </AccordionItem>
                    </Accordion>
                </Box>


                {/* Socials Form */}
                <Heading as='h4' size='md' p={3}>
                    Create New Social
                </Heading>

                <UpdateSocialsCard />


            </div >
        );
    }

    if (userErr) {
        return <>Error with admin dashboard, could not get user object</>
    }
}

export default Admin;