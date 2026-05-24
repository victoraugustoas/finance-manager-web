import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import type { CategoryBreakdownType } from '../../../../network/repository/ReportingRepository/dtos/index.ts'
import { useCategoryBreakdown } from './hooks/useCategoryBreakdown.ts'
import { useTranslate } from '../../../../hooks/useTranslate.ts'

const CATEGORY_COLORS = [
  '#3d6b4f',
  '#8b5a2b',
  '#5a6b8b',
  '#8b2e2e',
  '#6b5a8b',
  '#2e8b5a',
  '#5a8b6b',
  '#8b7a2b',
]

export interface CategoryBreakdownProps {
  type: CategoryBreakdownType
  onSeeAll?: () => void
}

function fmtMoney(n: number) {
  return `R$ ${n.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export function CategoryBreakdown({ type, onSeeAll }: CategoryBreakdownProps) {
  const { categories, isLoading } = useCategoryBreakdown(type)
  const { t } = useTranslate('dashboard')

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: { xs: '16px !important', sm: '24px !important' } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            mb: 2,
          }}
        >
          <Typography variant="h2" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            {type === 'EXPENSE'
              ? t('category_breakdown_expenses')
              : t('category_breakdown_incomes')}
          </Typography>
          {onSeeAll && (
            <Box
              component="button"
              onClick={onSeeAll}
              sx={{
                bgcolor: 'transparent',
                border: 0,
                cursor: 'pointer',
                color: 'text.secondary',
                fontFamily: '"Inter", system-ui, sans-serif',
                fontSize: '0.8125rem',
                fontWeight: 500,
                p: 0,
                '&:hover': { color: 'text.primary' },
              }}
            >
              Ver tudo →
            </Box>
          )}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.75 }}>
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Box
                  key={i}
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Skeleton
                      variant="circular"
                      width={8}
                      height={8}
                      sx={{ bgcolor: '#ede8de', flexShrink: 0 }}
                    />
                    <Skeleton
                      variant="text"
                      width={100}
                      sx={{ fontSize: '0.8125rem', bgcolor: '#ede8de' }}
                    />
                  </Box>
                  <Skeleton
                    variant="text"
                    width={70}
                    sx={{ fontSize: '0.8125rem', bgcolor: '#ede8de' }}
                  />
                </Box>
              ))
            : categories.map(({ name, total }, index) => (
                <Box
                  key={name}
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
                        flexShrink: 0,
                      }}
                    />
                    <Typography sx={{ fontSize: '0.8125rem', color: 'text.primary' }}>
                      {name}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      fontFeatureSettings: '"tnum" 1',
                    }}
                  >
                    {fmtMoney(total)}
                  </Typography>
                </Box>
              ))}
        </Box>
      </CardContent>
    </Card>
  )
}
