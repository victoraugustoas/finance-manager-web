import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import type { LucideIcon } from 'lucide-react'
import { MoreHorizontal } from 'lucide-react'
import { useTranslate } from '../../hooks/useTranslate.ts'

interface CategoryCardProps {
  name: string
  icon: LucideIcon
  iconColor: string
  spent: number
  budget?: number
  isIncome?: boolean
  onOptions?: () => void
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
  const { formatMoney } = useTranslate()
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
      <CardContent sx={{ p: { xs: 4, sm: 5 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
          <Box
            sx={(t) => ({
              width: 40,
              height: 40,
              borderRadius: t.shape.rounded.md,
              bgcolor: iconColor,
              color: 'common.white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            })}
          >
            <Icon size={20} strokeWidth={2} />
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="rowTitle" component="div">
              {name}
            </Typography>
            <Typography variant="caption">
              {isIncome
                ? 'receita'
                : budget
                  ? `limite ${formatMoney(budget, 'BRL')}`
                  : 'sem limite'}
            </Typography>
          </Box>

          {onOptions && (
            <Box
              component="button"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation()
                onOptions()
              }}
              sx={(t) => ({
                width: 32,
                height: 32,
                border: 0,
                bgcolor: 'transparent',
                color: 'text.disabled',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: t.shape.rounded.icon,
                '&:hover': { bgcolor: 'rgba(26,24,21,0.04)', color: 'text.secondary' },
              })}
            >
              <MoreHorizontal size={16} strokeWidth={2} />
            </Box>
          )}
        </Box>

        {budget ? (
          <>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                mb: 2,
              }}
            >
              <Typography
                variant="amountMd"
                component="div"
                color={isOver ? 'error.main' : 'text.primary'}
              >
                {formatMoney(spent, 'BRL')}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: isOver ? 'error.main' : 'text.disabled',
                  fontFeatureSettings: '"tnum" 1',
                }}
              >
                {pct.toFixed(0)}% usado
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={pct}
              sx={{ '& .MuiLinearProgress-bar': { bgcolor: isOver ? 'error.main' : iconColor } }}
            />
          </>
        ) : (
          <Typography
            variant="amountMd"
            component="div"
            color={isIncome ? 'success.main' : 'text.primary'}
          >
            {formatMoney(spent, 'BRL')}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}
