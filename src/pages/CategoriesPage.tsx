import Box from '@mui/material/Box'
import { CategoryCard } from '../components/CategoryCard/CategoryCard'
import { CATEGORIES_META, RAW_TRANSACTIONS } from '../mocks/data'

export function CategoriesPage() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
        gap: 2,
      }}
    >
      {CATEGORIES_META.map(c => {
        const spent = Math.abs(
          RAW_TRANSACTIONS
            .filter(t => t.categoryId === c.id && t.amount < 0)
            .reduce((s, t) => s + t.amount, 0)
        )
        return (
          <CategoryCard
            key={c.id}
            name={c.name}
            icon={c.icon}
            iconColor={c.color}
            spent={spent}
            budget={c.budget}
            isIncome={c.id === 'salary'}
          />
        )
      })}
    </Box>
  )
}
