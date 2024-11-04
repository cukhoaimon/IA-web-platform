import { useQueryProfile } from "@/modules/home/hooks/useQueryProfile.ts"
import { AppSidebar } from "@/modules/home/components/organisms/AppSideBar.tsx"

function HomePage() {
  const { data } = useQueryProfile()
  return (
    <div className="h-dvh">
      <div className="text-5xl font-bold">You are authenticated</div>
      <AppSidebar username={data?.email ?? "User"} />
    </div>
  )
}

export default HomePage
