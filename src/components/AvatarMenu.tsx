import React from 'react';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    Avatar,
    AvatarBadge,
    Button,
    ButtonGroup,
    Box
} from '@chakra-ui/react'
import Link from 'next/link';


interface AvatarMenuProps {
    name: string
}

function AvatarMenu(props: AvatarMenuProps) {
    return (
        <Popover>
            <PopoverTrigger>
                <Button variant={"unstyled"}>
                    <Avatar name={props.name}>
                        <AvatarBadge boxSize='1.25em' bg='green.500' />
                    </Avatar>
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>{props.name}</PopoverHeader>
                <ButtonGroup size='sm' m={3} p={3}>
                    <Link href="/admin" passHref>
                        <Button >
                            Admin
                        </Button>
                    </Link>

                    <Link href="/api/auth/signout" passHref>
                        <Button>
                            Sign Out
                        </Button>
                    </Link>
                </ButtonGroup>
            </PopoverContent>
        </Popover>
    );
}

export default AvatarMenu;