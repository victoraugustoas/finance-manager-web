import Box from '@mui/material/Box'
import { BarChart } from '../components/BarChart/BarChart'
import { CategoryTable } from '../components/CategoryTable/CategoryTable'
import { DonutChart } from '../components/DonutChart/DonutChart'
import { useTranslate } from '../hooks/useTranslate'
import { DONUT_SEGMENTS, TABLE_ROWS } from '../mocks/data'

export function ReportsPage() {
  const { t } = useTranslate('dashboard')

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 2 }}>
        <BarChart
          title={t('chart_income_vs_outgo')}
          months={['nov', 'dez', 'jan', 'fev', 'mar', 'abr', 'mai']}
          series={[
            { label: t('income'), color: '#3d6b4f', values: [6200, 6200, 6200, 6200, 6500, 6200, 6200] },
            { label: t('outgo'),  color: '#2a2723', values: [2890, 4120, 3210, 3650, 3980, 3450, 3892] },
          ]}
        />
        <DonutChart title={t('chart_money_distribution')} segments={DONUT_SEGMENTS} />
      </Box>
      <CategoryTable rows={TABLE_ROWS} />
    </Box>
  )
}
