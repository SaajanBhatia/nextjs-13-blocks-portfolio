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
import useUser from "@/hooks/useUser";


export default function Home() {

  // Blocks
  const { blocks, blocksIsLoading, blocksErr } = useBlocks()

  const { user, userIsLoading, userErr } = useUser()

  return <>
    {/* Hero Section */}
    <Hero />

    {blocksIsLoading && <SkeletonCard />}
    {blocks && <BlockGrid blocks={blocks} />}


    {/* Footer Section */}



  </>
}
