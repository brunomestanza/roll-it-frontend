import { z } from 'zod'

const addPlayerToCampaignSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type AddPlayerToCampaignForm = z.infer<typeof addPlayerToCampaignSchema>

export function DungeonMasterDashboard() {
  return (
    <div>
      <p>Mestre</p>
    </div>
  )
}
