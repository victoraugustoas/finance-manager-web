import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import type { LucideIcon } from 'lucide-react'
import { MoreHorizontal } from 'lucide-react'

interface CategoryCardProps {
  name: string
  icon: LucideIcon
  iconColor: string
  spent: number
  budget?: number
  isIncome?: boolean
  onOptions?: () => void
}

function fmtMoney(n: number) {
  return `R$ ${n.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export function CategoryCard({
  name,
  icon: Icon,
  iconColor,
  spent,
  budget,
  isIncome = false,
  onOptions,
}: CategoryCardProps) {
  const pct = budget ? Math.min((spent / budget) * 100, 100) : 0
  const isOver = budget ? spent > budget : false

  return (
    <Card
      sx={{
        cursor: 'pointer',
        transition: 'box-shadow 150ms cubic-bezier(0.22,1,0.36,1)',
        '&:hover': { boxShadow: 3 },
      }}
    >
      <CardContent sx={{ p: { xs: '16px !important', sm: '20px !important' } }}>
        {/* Header: ícone + nome + opções */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.75 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '12px',
              bgcolor: iconColor,
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Icon size={20} strokeWidth={2} />
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ fontSize: '0.9375rem', fontWeight: 600, color: 'text.primary' }}>
              {name}
            </Typography>
            <Typography variant="caption">
              {isIncome
                ? 'receita'
                : budget
                ? `limite ${fmtMoney(budget)}`
                : 'sem limite'}
            </Typography>
          </Box>

          {onOptions && (
            <Box
              component="button"
              onClick={e => { e.stopPropagation(); onOptions() }}
              sx={{
                width: 32,
                height: 32,
                border: 0,
                bgcolor: 'transparent',
                color: 'text.disabled',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                '&:hover': { bgcolor: 'rgba(26,24,21,0.04)', color: 'text.secondary' },
              }}
            >
              <MoreHorizontal size={16} strokeWidth={2} />
            </Box>
          )}
        </Box>

        {/* Valor + barra de progresso (ou só valor para receita/sem limite) */}
        {budget ? (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 0.75 }}>
              <Typography
                sx={{
                  fontFamily: '"Inter", system-ui, sans-serif',
                  fontWeight: 600,
                  fontSize: '1.125rem',
                  fontFeatureSettings: '"tnum" 1',
                  color: isOver ? 'error.main' : 'text.primary',
                }}
              >
                {fmtMoney(spent)}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: isOver ? 'error.main' : 'text.disabled', fontFeatureSettings: '"tnum" 1' }}
              >
                {pct.toFixed(0)}% usado
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={pct}
              sx={{
                '& .MuiLinearProgress-bar': {
                  bgcolor: isOver ? 'error.main' : iconColor,
                },
              }}
            />
          </>
        ) : (
          <Typography
            sx={{
              fontFamily: '"Inter", system-ui, sans-serif',
              fontWeight: 600,
              fontSize: '1.125rem',
              fontFeatureSettings: '"tnum" 1',
              color: isIncome ? 'success.main' : 'text.primary',
            }}
          >
            {fmtMoney(spent)}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}
