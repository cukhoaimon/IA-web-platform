import { useQuery } from "@tanstack/react-query"
import { QueryKey } from "@/shared/const/queryKey.ts"
import { getRequest } from "@/shared/utils/axios.utils.ts"
import { ApiPath } from "@/shared/const"

interface ProfileResponse {
  id: string
  email: string
  createdAt: string
}

export const useQueryProfile = () => {
  const { data, isLoading, isError } = useQuery<ProfileResponse>({
    queryKey: [QueryKey.profile],
    queryFn: () =>
      getRequest({
        path: ApiPath.Profile
      })
  })

  return { data, isLoading, isError }
}
