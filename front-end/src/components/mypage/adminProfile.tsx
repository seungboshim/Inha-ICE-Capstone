import React, { useState, useEffect } from "react"
import Image from "next/image"
import { getMemberData } from "../../apis/member"
import Profile from "./profile";

export default function AdminProfile() {
    return (
        <>
            <Profile />
        </>
    )
}