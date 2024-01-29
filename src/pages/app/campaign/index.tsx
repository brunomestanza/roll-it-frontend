import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'

import { findCampaignBySlug } from '@/api/campaigns/find-campaign-by.slug'
import { getProfile } from '@/api/players/get-profile'
import { Skeleton } from '@/components/ui/skeleton'

export function Campaign() {
  const { slug } = useParams()

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity,
  })

  const { data: campaign, isLoading: isLoadingCampaign } = useQuery({
    queryKey: ['campaign', slug],
    queryFn: () => findCampaignBySlug({ slug }),
  })

  if (!isLoadingCampaign && !campaign) {
    throw new Error(slug)
  }

  return (
    <>
      <Helmet title="Home" />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {campaign ? (
            <h1 className="text-center text-2xl font-bold tracking-tight">
              {campaign.name}
            </h1>
          ) : (
            <Skeleton className="h-8 w-[280px]" />
          )}
          {!profile || !campaign ? (
            <p>Loading...</p>
          ) : (
            <div>
              {profile.id === campaign.dungeonMasterId ? (
                <p>Mestre</p>
              ) : (
                <p>Jogador</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
