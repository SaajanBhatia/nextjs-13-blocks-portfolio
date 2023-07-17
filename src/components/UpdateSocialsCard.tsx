import React, { useState } from 'react';
import { Block, Socials } from '@prisma/client';
import {
    SimpleGrid,
    Card, CardHeader, CardBody, CardFooter,
    Heading, Text,
    Button, Input,
    FormControl, FormLabel, FormErrorMessage, FormHelperText,
} from '@chakra-ui/react'
import { availableIcons, IconType, iconHandler } from '@/lib/helpers/iconHandler';
import useBlocks from '@/hooks/useBlocks';
import useSocials from '@/hooks/useSocials';
import Link from 'next/link';

type UpdateSocialsProps = {

}

function UpdateSocialsCard(props: UpdateSocialsProps) {
    // Call hook inside function
    const {
        socials,
        isSocialsLoading,
        socialsErr,
        createSocialMutation,
        updateSocialMutation,
        deleteSocialMutation
    } = useSocials()
    const [newSocialName, setNewSocialName] = useState("")
    const [newSocialURL, setNewSocialURL] = useState("")



    return (
        <>
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                {/* First card used to create */}
                <Card>
                    <CardHeader>
                        <Heading size='md'>Add social link</Heading>
                    </CardHeader>
                    <CardBody>
                        <FormControl mb={3}>
                            <FormLabel>Social Name</FormLabel>
                            <Input type='text' value={newSocialName} onChange={(e) => setNewSocialName(e.target.value)} />
                        </FormControl>
                        <FormControl mb={3}>
                            <FormLabel>URL</FormLabel>
                            <Input type='text' value={newSocialURL} onChange={(e) => setNewSocialURL(e.target.value)} />
                        </FormControl>
                    </CardBody>
                    <CardFooter>
                        <Button>Create</Button>
                    </CardFooter>
                </Card>

                {
                    socials &&
                    socials.map((social: Socials) => (
                        <>
                            <>
                                <Card>
                                    <CardHeader>
                                        <Heading size='md'>{social.name}</Heading>
                                    </CardHeader>
                                    <CardFooter>
                                        <Link href={social.url} target='_blank'>
                                            <Button variant={'outline'}>View</Button>
                                        </Link>
                                        <Button variant={'outline'} color={'red.400'}>Delete</Button>
                                    </CardFooter>
                                </Card>
                            </>
                        </>
                    ))
                }

            </SimpleGrid>
        </>
    );
}

export default UpdateSocialsCard;