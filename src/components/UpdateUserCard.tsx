import React, { useState } from 'react';
import {
    Card, CardHeader, CardBody, CardFooter,
    FormControl, FormLabel, FormErrorMessage,
    FormHelperText, Select, Textarea,
    Input,
    Text, Heading,
    Box, Button,
    Spinner
} from '@chakra-ui/react'
import { User } from '@prisma/client';
import useUser from '@/hooks/useUser';

export type UpdateUserCardProps = {}

function UpdateUserCard(props: UpdateUserCardProps) {

    const { user, userIsLoading, userErr } = useUser()

    const [userDisplayName, setUserDisplayName] = useState(user ? user.displayName : "")
    const [userHeadline, setUserHeadline] = useState(user ? user.headline : "")
    const [userAvatar, setUserAvatar] = useState(user ? user.avatarURL : "")
    const [userTagline, setUserTagline] = useState(user ? user.tagline : "")

    return (
        <>
            {
                userIsLoading &&
                <>
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />
                </>
            }

            {
                user &&
                <>
                    <Card maxW="full" w={['full', 'sm:max-w-md', 'md:max-w-lg', 'lg:max-w-xl']}>
                        <CardHeader>
                            <Heading size='md'>User Details</Heading>
                        </CardHeader>
                        <CardBody>
                            <FormControl mb={3}>
                                <FormLabel>Display Name</FormLabel>
                                <Input type="text" value={userDisplayName} onChange={(e) => setUserDisplayName(e.target.value)} />
                                <FormHelperText>This is the landing page title</FormHelperText>
                            </FormControl>

                            <FormControl mb={3}>
                                <FormLabel>Headline</FormLabel>
                                <Input type="text" value={userHeadline} onChange={(e) => setUserHeadline(e.target.value)} />
                            </FormControl>

                            <FormControl mb={3}>
                                <FormLabel>Tagline</FormLabel>
                                <Input type="text" value={userTagline} onChange={(e) => setUserTagline(e.target.value)} />
                            </FormControl>

                            <FormControl mb={3}>
                                <FormLabel>Avatar URL</FormLabel>
                                <Input type="text" value={userAvatar} onChange={(e) => setUserAvatar(e.target.value)} />
                            </FormControl>

                            <Button color={'blue.300'}>
                                Update User
                            </Button>
                        </CardBody>
                    </Card>
                </>
            }
        </>
    )
}

export default UpdateUserCard;