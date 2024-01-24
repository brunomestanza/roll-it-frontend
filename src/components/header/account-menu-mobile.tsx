import { useQuery } from '@tanstack/react-query'
import { LogOut, Menu } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { getProfile } from '@/api/players/get-profile'

import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Skeleton } from '../ui/skeleton'
import { Navigation } from './navigation'

export function AccountMenuMobile() {
  const navigate = useNavigate()

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity,
  })

  function handleSignOut() {
    localStorage.removeItem('auth')
    navigate('/sign-in')
    toast.success('Jogador deslogado com sucesso.')
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="my-4">
          <p>
            {isLoadingProfile ? (
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-48" />
              </div>
            ) : (
              <span className="text-primary">{profile?.name}</span>
            )}
          </p>
          <p>
            {isLoadingProfile ? (
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-48" />
              </div>
            ) : (
              <span className="truncate text-sm font-normal text-muted-foreground">
                {profile?.email}
              </span>
            )}
          </p>
        </div>

        <div className="my-6 block md:hidden">
          <Navigation />
        </div>

        <Button
          variant="outline"
          className="w-full text-rose-500 dark:text-rose-400"
          onClick={() => handleSignOut()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </Button>
      </SheetContent>
    </Sheet>
  )
}
