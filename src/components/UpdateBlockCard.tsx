import { Block } from '@prisma/client';
import React, { useState } from 'react';
import {
    Card, CardHeader, CardBody, CardFooter,
    FormControl, FormLabel, FormErrorMessage,
    FormHelperText, Select, Textarea,
    Input,
    Text, Heading,
    Box, Button
} from '@chakra-ui/react'
import { availableIcons, IconType, iconHandler } from '@/lib/helpers/iconHandler';
import useBlocks from '@/hooks/useBlocks';


export type UpdateBlockCardType = {
    block: Block
    title?: string
    createBlock: boolean
}

function UpdateBlockCard(props: UpdateBlockCardType) {
    const [headline, setHeadline] = useState<string>(props.block.headline)
    const [desc, setDesc] = useState<string | null>(props.block.description)
    const [url, setURL] = useState<string>(props.block.url)
    const [icon, setIcon] = useState<string>(props.block.url)

    const { createBlockMutation, deleteBlockMutation, updateBlockMutation } = useBlocks();

    const createNewBlock = () => {
        createBlockMutation.mutate({
            headline: headline,
            description: desc ?? "",
            url: url,
            icon: icon
        })
        if (createBlockMutation.status === "success") {
            console.log("successful")
        }
    }

    const deleteBlock = () => {
        deleteBlockMutation.mutate(props.block.id)
        if (deleteBlockMutation.status === "success") {
            console.log("successful")
        }
    }

    const updateBlock = () => {
        const updatedBlock: Block = {
            id: props.block.id,
            headline: headline,
            description: desc,
            icon: icon,
            url: url
        }
        updateBlockMutation.mutate(updatedBlock)
        if (updateBlockMutation.status === "success") {
            console.log("successful")
        }
    }

    return (
        <>
            <Card maxW="full" my={3} w={['full', 'sm:max-w-md', 'md:max-w-lg', 'lg:max-w-xl']} bg={props.createBlock ? "" : "gray"}>
                {
                    props.title &&
                    <>
                        <CardHeader>
                            <Heading size='md'>{props.title}</Heading>
                        </CardHeader>
                    </>
                }
                <CardBody>
                    <FormControl mb={3}>
                        <FormLabel>Headline</FormLabel>
                        <Input type="text" value={headline} onChange={(e) => setHeadline(e.target.value)} />
                        <FormHelperText>This is the title of the block</FormHelperText>
                    </FormControl>

                    <FormControl mb={3}>
                        <FormLabel>Description</FormLabel>
                        <Textarea value={desc ?? ""} onChange={(e) => setDesc(e.target.value)} noOfLines={2} />
                    </FormControl>

                    <FormControl mb={3}>
                        <FormLabel>URL</FormLabel>
                        <Input type="text" value={url} onChange={(e) => setURL(e.target.value)} />
                    </FormControl>

                    <FormControl mb={3}>
                        <FormLabel>Icon</FormLabel>
                        <Select placeholder='Select Icon' value={icon} onChange={(e) => setIcon(e.target.value)}>
                            {availableIcons.map((availIcon) => (
                                <>
                                    <option value={availIcon as string}> {availIcon} </option>
                                </>
                            ))}
                        </Select>
                        <Box m={1} p={1}>
                            {iconHandler(icon)}
                        </Box>
                    </FormControl>

                    {
                        !props.createBlock && <>
                            <Button color={'blue.300'} onClick={updateBlock}>
                                Update Block
                            </Button>

                            <Button color={'red.400'} onClick={deleteBlock} variant={'outline'}>
                                Delete Block
                            </Button>
                        </>
                    }

                    {
                        props.createBlock && <>
                            <Button color={'green.400'} onClick={createNewBlock}>
                                Create Block
                            </Button>
                        </>
                    }

                </CardBody>
            </Card>
        </>
    );
}

export default UpdateBlockCard;