"use client";

/**
 * 
 * @returns Home Page 
 * All blocks with option to sign in
 * Hero Section for Introduction
 * Possible Search Function
 */
import Hero from "@/components/Hero";
import BlockGrid from "@/components/BlockGrid";
import useBlocks from "@/hooks/useBlocks";
import SkeletonCard from "@/components/SkeletonCard";

const navigation = [
  { name: 'Github', href: '#' },
  { name: 'LinkedIn', href: '#' },
  { name: 'Twitter', href: '#' },
  { name: 'Blog', href: '#' },
]

export default function Home() {

  const { blocks, isLoading, error } = useBlocks()

  return <>
    {/* Hero Section */}
    <Hero
      name="Saajan Bhatia"
      headline="Full stack Software Engineer"
      tagline="Check it out!"
      navigation={navigation}
    />

    {isLoading && <SkeletonCard />}
    {blocks && <BlockGrid blocks={blocks} />}


    {/* Footer Section */}



  </>
}
