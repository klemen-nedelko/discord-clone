import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { profile } from "console";
import { NextResponse } from "next/server";

export async function PATHC(
    req: Request,
    {params}: {params: { serverId:string}}
){
    try{
        const profile = await currentProfile();

        if(!profile){
            return new NextResponse("Unathorized", {status: 401});
        }
        if(!params.serverId){
            return new NextResponse("Server ID missing", {status: 401});
        }

        const server = await db.server.update({
            where:{
                id:params.serverId,
                profileId:{
                    not:profile.id
                },
                memebers:{
                    some:{
                        profileId:profile.id
                    }
                }
            },
            data:{
                memebers:{
                    deleteMany:{
                        profileId:profile.id
                    }
                }
            }
        });
        return NextResponse.json(server);
    }catch(error){
        console.log("[SERVER_ID_LEAVE]",error);
        return new NextResponse("Internal Error", {status: 500});
    }
}