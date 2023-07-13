import { Block } from '@prisma/client';
import React from 'react';
import { Grid, GridItem, Box, SimpleGrid } from '@chakra-ui/react'
import BlockCard from './BlockCard';

export type BlockGridType = {
    blocks: Block[]
}

function BlockGrid(props: BlockGridType) {

    return (
        <Box m={5} p={5}>
            <SimpleGrid gap={6} columns={{ base: 1, md: 2, lg: 3 }}>
                {props.blocks.map((block: Block) => (
                    <>
                        <BlockCard
                            headline={block.headline}
                            description={block.description}
                            url={block.url}
                            icon={block.icon}
                        />
                    </>
                ))}
            </SimpleGrid>
        </Box>
    );
}

export default BlockGrid;