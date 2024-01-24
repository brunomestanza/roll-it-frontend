import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function CampaignCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-4 w-[260px]" />
        </CardTitle>
        <div>
          <Skeleton className="h-3 w-[260px] md:w-[1060px]" />
          <Skeleton className="h-3 w-[260px] md:hidden" />
          <Skeleton className="h-3 w-[260px] md:hidden" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 md:grid md:grid-cols-3">
        <div>
          <div className="font-bold text-slate-500">Mestre</div>
          <div>
            <Skeleton className="h-6 w-[260px]" />
          </div>
        </div>
        <div>
          <p className="font-bold text-slate-500">Jogadores (?)</p>
          <div className="flex flex-col gap-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton className="h-6 w-[260px]" key={index} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-bold text-slate-500">Categorias</p>
          <Badge className="w-fit">Dungeon and Dragons 5e</Badge>
          <Badge className="w-fit">Violencia explicita</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-3">
          Última sessão: <Skeleton className="h-4 w-[140px]" />
        </div>
      </CardFooter>
    </Card>
  )
}
