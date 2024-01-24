import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { BookmarkPlus } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'

import { getProfile } from '@/api/players/get-profile'
import { Button } from '@/components/ui/button'

import { CampaignCard } from './campaign-card'
import { CampaignCardSkeleton } from './campaign-card-skeleton'

export function Home() {
  const navigate = useNavigate()

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity,
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
            disabled={isLoadingProfile}
          >
            <BookmarkPlus />
            Criar nova campanha
          </Button>
        </div>
        {isLoadingProfile ? (
          <>
            <CampaignCardSkeleton />
            <CampaignCardSkeleton />
          </>
        ) : (
          <>
            {profile?.campaigns.map((campaign) => {
              const lastSessionDate = formatDistanceToNow(
                campaign.updatedAt || campaign.createdAt,
                {
                  locale: ptBR,
                  addSuffix: true,
                },
              )

              return (
                <CampaignCard
                  key={campaign.id}
                  slug={campaign.slug}
                  title={campaign.name}
                  description=""
                  dungeonMaster={campaign.dungeonMasterDisplay}
                  playersNames={[]}
                  lastSessionDate={lastSessionDate}
                />
              )
            })}
          </>
        )}
      </div>
    </>
  )
}
