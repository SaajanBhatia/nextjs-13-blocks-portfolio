

export type BlockCardProps = {
    headline: string,
    description?: string | null,
    url?: string | null,
    icon?: string | null
}

import { iconHandler } from '@/lib/helpers/iconHandler';
import { Card, Text } from '@chakra-ui/react'
import Link from 'next/link';

export default function BlockCard(props: BlockCardProps) {
    return (
        <Card>
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                {iconHandler(String(props.icon))}
                <Link href={String(props.url)}>
                    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{props.headline}</h5>
                </Link>

                <Text color={'white'} mb={3}>{props.description ? String(props.description) : ""}</Text>

                <Link href={String(props.icon)} className='text-white'>
                    Explore

                </Link>

            </div>

        </Card>
    );
}