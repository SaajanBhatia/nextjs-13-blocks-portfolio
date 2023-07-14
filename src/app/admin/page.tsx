'use client';
/**
 * All admin functions excluding CRUD on new cards, that will be done from the main
 * page if session exists
 */

import React from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import useUser from '@/hooks/useUser';
import LoadingScreen from '@/components/LoadingPage';
import { Button } from '@chakra-ui/react';


function Admin() {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            // The user is not authenticated, handle it here.
            redirect('/api/auth/signin?callbackUrl=/admin')
        },
    })

    const { user, userIsLoading, userErr } = useUser()

    if (userIsLoading) {
        return <LoadingScreen />
    }

    // Form Submission
    const handleDashboardSubmission = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

    }

    if (user) {
        return (
            <div className='container mt-8 px-8 pt-4 mx-auto'>

                {/* Heading and Back Button */}

                {/* Form */}
                <form>
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Admin Dashboard</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Edit your user details, blocks and socials</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                            <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Display Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="displayName"
                                        name="displayName"
                                        type="text"
                                        autoComplete="name"
                                        className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={user.displayName}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Avatar URL
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="avatarURL"
                                        name="avatarURL"
                                        type="text"
                                        className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={user.avatarURL ?? ""}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Headline
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="headline"
                                        name="headline"
                                        type="text"
                                        autoComplete="bio"
                                        className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={user.headline ?? ""}
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                    Tagline
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="tagline"
                                        name="tagline"
                                        rows={3}
                                        className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={user.tagline ?? ""}
                                    />
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                            </div>

                        </div>

                        <Button colorScheme='teal' variant='solid' mt={3} type='submit'>
                            Update Details
                        </Button>

                    </div>

                </form>


            </div>
        );
    }

    if (userErr) {
        return <>Error with admin dashboard, could not get user object</>
    }
}

export default Admin;