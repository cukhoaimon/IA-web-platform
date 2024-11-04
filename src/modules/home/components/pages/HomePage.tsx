import { useQueryProfile } from "@/modules/home/hooks/useQueryProfile.ts"
import { AppSidebar } from "@/modules/home/components/organisms/AppSideBar.tsx"

function HomePage() {
  const { data } = useQueryProfile()
  return (
    <div>
      <AppSidebar username={data?.email ?? "User"} />
    </div>
  )
}

export default HomePage
