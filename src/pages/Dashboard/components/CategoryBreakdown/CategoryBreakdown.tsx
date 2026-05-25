import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import type { CategoryBreakdownType } from '../../../../network/repository/ReportingRepository/dtos/index.ts'
import { useCategoryBreakdown } from './hooks/useCategoryBreakdown.ts'
import { useTranslate } from '../../../../hooks/useTranslate.ts'

export interface CategoryBreakdownProps {
  type: CategoryBreakdownType
  onSeeAll?: () => void
}

export function CategoryBreakdown({ type, onSeeAll }: CategoryBreakdownProps) {
  const { categories, isLoading } = useCategoryBreakdown(type)
  const { t, formatMoney } = useTranslate('dashboard')
  const theme = useTheme()
  const categoryColorList = Object.values(theme.palette.categoryColors)

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: { xs: 4, sm: 5 } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            mb: 4,
          }}
        >
          <Typography variant="h2">
            {type === 'EXPENSE'
              ? t('category_breakdown_expenses')
              : t('category_breakdown_incomes')}
          </Typography>
          {onSeeAll && (
            <Typography
              variant="labelSm"
              component="button"
              onClick={onSeeAll}
              sx={{
                bgcolor: 'transparent',
                border: 0,
                cursor: 'pointer',
                color: 'text.secondary',
                p: 0,
                '&:hover': { color: 'text.primary' },
              }}
            >
              Ver tudo →
            </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Box
                  key={i}
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Skeleton
                      variant="circular"
                      width={8}
                      height={8}
                      sx={{ bgcolor: 'background.surfaceInset', flexShrink: 0 }}
                    />
                    <Skeleton
                      variant="text"
                      width={100}
                      sx={(t) => ({ ...t.typography.labelSm, bgcolor: 'background.surfaceInset' })}
                    />
                  </Box>
                  <Skeleton
                    variant="text"
                    width={70}
                    sx={(t) => ({ ...t.typography.amountSm, bgcolor: 'background.surfaceInset' })}
                  />
                </Box>
              ))
            : categories.map(({ name, total }, index) => (
                <Box
                  key={name}
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={(t) => ({
                        width: 8,
                        height: 8,
                        borderRadius: t.shape.rounded.circle,
                        bgcolor: categoryColorList[index % categoryColorList.length],
                        flexShrink: 0,
                      })}
                    />
                    <Typography variant="labelSm" color="text.primary">
                      {name}
                    </Typography>
                  </Box>
                  <Typography variant="amountSm">{formatMoney(total, 'BRL')}</Typography>
                </Box>
              ))}
        </Box>
      </CardContent>
    </Card>
  )
}
