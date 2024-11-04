import { ChevronUp, User2 } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider
} from "@/components/ui/sidebar.tsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx"
import { tokenManager } from "@/shared/hooks/tokenManager.ts"
import { useNavigate } from "react-router-dom"
import { useCallback } from "react"
import { AppPath } from "@/shared/const"
import { toast } from "@/hooks/use-toast.ts"

interface AppSidebarProps {
  username: string
}

export function AppSidebar(props: AppSidebarProps) {
  const { username } = props
  const navigate = useNavigate()

  const handleSignOut = useCallback(() => {
    tokenManager.eraseToken()
    navigate(AppPath.Login, {
      replace: true
    })
    toast({
      title: "Sign out successfully"
    })
  }, [])

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader />
        <SidebarContent />
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton variant="outline">
                    <User2 /> {username}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                  <DropdownMenuItem onClick={handleSignOut}>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}
