import {currentProfile} from "@/lib/current-profile"
import {db} from "@/lib/db"
import {NextResponse} from "next/server"
import {v4 as uuid} from "uuid"
import {MemeberRole as MemberRole} from "@prisma/client"

export async function POST(req: Request){
    try{

        const {name, imageUrl} = await req.json();

        const profile = await currentProfile();

        if(!profile){
            return new NextResponse("Unathorized",{status:401})
        }

        const server = await db.server.create({
            data:{
                profileId: profile.id,
                name,
                imageUrl,
                inviteCode: uuid(),
                channels:{
                    create:[
                        {name: "general", profileId: profile.id}
                    ]
                },
                memebers:{
                    create:[
                        {profileId: profile.id, role: MemberRole.ADMIN}
                    ]
                }
            }
        })

        return NextResponse.json(server);

    }catch(err){
        console.log("[SERVER_POST]",err);
        return new NextResponse("Internal Error",{status:500});
    }
}