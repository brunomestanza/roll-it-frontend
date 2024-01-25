import { useQuery } from '@tanstack/react-query'
import { BookmarkPlus } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'

import { findAllPlayerCampaigns } from '@/api/campaigns/find-all-player-campaigns'
import { getProfile } from '@/api/players/get-profile'
import { Button } from '@/components/ui/button'

import { CampaignCard } from './campaign-card'
import { CampaignCardSkeleton } from './campaign-card-skeleton'

export function Home() {
  const navigate = useNavigate()

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity,
  })

  const { data: campaigns, isLoading: isLoadingCampaigns } = useQuery({
    queryKey: ['campaigns'],
    queryFn: findAllPlayerCampaigns,
  })

  function createNewCampaign() {
    navigate('/new-campaign')
  }

  return (
    <>
      <Helmet title="Home" />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <h1 className="text-2xl font-bold tracking-tight">Campanhas</h1>
          <Button
            className="w-fit gap-3"
            onClick={createNewCampaign}
            disabled={isLoadingCampaigns}
          >
            <BookmarkPlus />
            Criar nova campanha
          </Button>
        </div>
        {!campaigns ? (
          <>
            <CampaignCardSkeleton />
            <CampaignCardSkeleton />
          </>
        ) : (
          <>
            {profile &&
              campaigns.map((campaign) => {
                return (
                  <CampaignCard
                    key={campaign.id}
                    campaign={campaign}
                    userId={profile.id}
                  />
                )
              })}
          </>
        )}
      </div>
    </>
  )
}
