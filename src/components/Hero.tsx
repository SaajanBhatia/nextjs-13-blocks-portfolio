import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Heading, Spinner } from '@chakra-ui/react'
import Typewriter from "typewriter-effect";
import { useSession } from 'next-auth/react';
import AvatarMenu from './AvatarMenu';
import useSocials from '@/hooks/useSocials';
import { Socials } from '@prisma/client';
import useUser, { userQuery } from '@/hooks/useUser';
import LoadingPage from './LoadingPage';



export default function Hero() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { data: session, status } = useSession()

    // Socials
    const { socials, isSocialsLoading, socialsErr } = useSocials()
    const { user, userIsLoading, userErr } = useUser()

    if (userIsLoading) return <LoadingPage />

    return (
        <div className="bg-white">
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <a href="/" className="-m-1.5 p-1.5">
                            <Heading as='h4' size='md' color={"black"}>
                                {user ? user.displayName : ""}
                            </Heading>
                        </a>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {socials && socials.map((item) => (
                            <a key={item.name} href={item.url} className="text-sm font-semibold leading-6 text-gray-900" target='_blank'>
                                {item.name}
                            </a>
                        ))}

                        {isSocialsLoading && <Spinner color={'black.400'} />}
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">

                        {
                            (status != "authenticated") ? (
                                <>
                                    <a href="/api/auth/signin" className="text-sm font-semibold leading-6 text-gray-900">
                                        Log in <span aria-hidden="true">&rarr;</span>
                                    </a>

                                </>
                            ) : (
                                <>
                                    <AvatarMenu name={user ? user.displayName : ""} />
                                </>
                            )
                        }

                    </div>
                </nav>
                <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                    <div className="fixed inset-0 z-50" />
                    <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <a href="#" className="-m-1.5 p-1.5">
                                <Heading as='h4' size='md' color={"black"}>
                                    {user ? user.displayName : ""}
                                </Heading>
                            </a>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {socials && socials.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.url}
                                            target='_blank'
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                                <div className="py-6">
                                    {
                                        (status != "authenticated") ? (
                                            <>
                                                <a
                                                    href="/api/auth/signin"
                                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                                >
                                                    Log in
                                                </a>

                                            </>
                                        ) : (
                                            <>
                                                <AvatarMenu name={user ? user.displayName : ""} />
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </header>

            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                    <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                        <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                            Use my template!{' '}
                            <a href="#" className="font-semibold text-indigo-600">
                                <span className="absolute inset-0" aria-hidden="true" />
                                Clone Repo <span aria-hidden="true">&rarr;</span>
                            </a>
                        </div>
                    </div>
                    <div className="text-center">
                        <Heading
                            fontWeight={700}
                            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
                            lineHeight={"110%"}
                            color={'black'}
                        >
                            Hi, my name is
                            <Typewriter
                                options={{
                                    autoStart: true,
                                    loop: true,
                                }}
                                onInit={(typewriter) => {
                                    typewriter
                                        .pauseFor(2500)
                                        .typeString(`${user ? user.displayName : ""}`)
                                        .pauseFor(3000)
                                        .deleteChars(13)
                                        .pauseFor(500)
                                        .start();
                                }}
                            />
                        </Heading>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            {user ? user.headline : ""}
                        </p>
                        <p className="mt-3 text-md leading-6 text-gray-500">
                            {user ? user.tagline : ""}
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                                Explore <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
