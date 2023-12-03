'use client';

import Header from "@/components/layout/header";
import BannerWrap from "@/components/banners/bannerWrap";
import Head from "next/head";

export default function Banner() {
    return (
        <>
        <Head>
            <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        </Head>
        <div>
            <Header />
            <BannerWrap />
        </div>
        </>
    )
}