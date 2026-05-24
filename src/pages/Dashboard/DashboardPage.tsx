import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { ArrowDownToLine, Bus, ShoppingCart, Utensils } from 'lucide-react'
import { CardIncomeOutgo } from '../../components/CardIncomeOutgo/CardIncomeOutgo.tsx'
import { CardTotalBalance } from '../../components/CardTotalBalance/CardTotalBalance.tsx'
import { CategoryBreakdown } from './components/CategoryBreakdown/CategoryBreakdown.tsx'
import { ExpenseRow } from '../../components/ExpenseRow/ExpenseRow.tsx'
import { IncomeRow } from '../../components/IncomeRow/IncomeRow.tsx'
import { useTranslate } from '../../hooks/useTranslate.ts'
import { BREAKDOWN, INCOME, OUTGO } from '../../mocks/data.ts'
import { categoryColors } from '../../theme/pluma.ts'
import { ListAccounts } from './components/ListAccounts/ListAccounts.tsx'

export function DashboardPage() {
  const { t } = useTranslate('dashboard')

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <CardTotalBalance />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 2fr' },
          gap: 2,
        }}
      >
        <CardIncomeOutgo income={INCOME} outgo={OUTGO} />
        <ListAccounts />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' }, gap: 2 }}>
        <CategoryBreakdown items={BREAKDOWN} />
        <Card>
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
                {t('recent_activity')}
              </Typography>
              <Box
                component="button"
                sx={{
                  bgcolor: 'transparent',
                  border: 0,
                  cursor: 'pointer',
                  color: 'text.secondary',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  p: 0,
                }}
              >
                {t('view_all')}
              </Box>
            </Box>
            <IncomeRow
              name="Salário"
              category="salário"
              account="Inter"
              date="20 mai"
              amount={6200}
              icon={ArrowDownToLine}
              iconColor={categoryColors.salary}
            />
            <ExpenseRow
              name="iFood"
              category="alimentação"
              account="Nubank"
              date="hoje"
              amount={38.9}
              icon={Utensils}
              iconColor={categoryColors.food}
            />
            <ExpenseRow
              name="Mercado Pago"
              category="mercado"
              account="Inter"
              date="ontem"
              amount={124.5}
              icon={ShoppingCart}
              iconColor={categoryColors.grocery}
            />
            <ExpenseRow
              name="Uber"
              category="transporte"
              account="Nubank"
              date="hoje"
              amount={22.4}
              icon={Bus}
              iconColor={categoryColors.transport}
              showDivider={false}
            />
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}
