"use client"

import { ServerWithMemebersWithProfiles } from "@/types"
import { MemeberRole } from "@prisma/client"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from "lucide-react"
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"
import { useModal } from "@/hooks/user-modal-store"

interface ServerHeaderProps{
    server: ServerWithMemebersWithProfiles
    role?: MemeberRole
}

export const ServerHeader = ({server, role}:ServerHeaderProps) => {

    const { onOpen } = useModal();

    const isAdmin = role === MemeberRole.ADMIN;
    const isModerator = role === MemeberRole.MODERATOR
    

    return(
        <DropdownMenu>
            <DropdownMenuTrigger
                className="focus:outline-none" asChild
            >
                <button
                    className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
                >
                    {server.name}
                    <ChevronDown className="h-5 w-5 ml-auto"/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-56 text-xs font-medium text-black dark:text-neutral-400 spaxe-y-[2px]"
            >
                {
                    isModerator || isAdmin &&
                    (<DropdownMenuItem
                        onClick={() => onOpen("invite", {server})}
                        className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer"
                    >   
                        Invite People
                    <UserPlus className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>)
                }
                {
                    isAdmin &&
                    (<DropdownMenuItem
                        onClick={() => onOpen("editServer", {server})}
                        className="px-3 py-2 text-sm cursor-pointer"
                    >   
                        Server settings
                        <Settings  className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>)
                }
                {
                    isAdmin &&
                    (<DropdownMenuItem
                        className="px-3 py-2 text-sm cursor-pointer"
                    >   
                        Manage Members
                        <Users className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>)
                }
                 {
                    isModerator || isAdmin &&
                    (<DropdownMenuItem
                        className="px-3 py-2 text-sm cursor-pointer"
                    >   
                        Create Channel
                        <PlusCircle className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>)
                }
                 {
                    isModerator || isAdmin &&
                    (<DropdownMenuSeparator
                        className="px-3 py-2 text-sm cursor-pointer"
                    />
                    )
                }
                {
                    isAdmin &&
                    (<DropdownMenuItem
                        className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
                    >   
                        Delete Server
                        <Trash className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>)
                }
                {
                    !isAdmin &&
                    (<DropdownMenuItem
                        className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
                    >   
                        Leave Server
                        <LogOut className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>)
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}