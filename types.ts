import { Member, Profile, Server } from "@prisma/client"

export type ServerWithMemebersWithProfiles = Server & {
    memebers: (Member & {profile:Profile})[];
}