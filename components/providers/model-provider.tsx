"use client"

import {CreateServer} from "@/components/modals/create-server-modal";
import { useEffect, useState } from "react";
import { InviteModal } from "@/components/modals/invite-modal";
import { EditServerModal } from "@/components/modals/edit-server-modal";

export const ModalProvider = () =>{

    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true);
    },[])

    if(!isMounted){
        return null;
    }


    return (
        <>
        <CreateServer/>
        <InviteModal/>
        <EditServerModal/>
        </>
    )
}