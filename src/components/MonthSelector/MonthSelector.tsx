import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import { useId } from 'react'
import { useMonthlyDate } from '../../hooks/useMonthlyDate.ts'
import { useTranslate } from '../../hooks/useTranslate.ts'

function formatMonthInputValue(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${year}-${month}`
}

function parseMonthInputValue(value: string) {
  const [year, month] = value.split('-').map(Number)
  if (!year || !month) return null

  return new Date(year, month - 1, 1)
}

export function MonthSelector() {
  const inputId = useId()
  const { selectedMonth, setSelectedMonth, goToPreviousMonth, goToNextMonth } = useMonthlyDate()
  const { formatDate } = useTranslate()
  const monthLabel = formatDate(selectedMonth, { formatStr: 'MMMM yyyy' })

  return (
    <Box
      sx={(theme) => ({
        display: 'inline-grid',
        gridTemplateColumns: '36px minmax(150px, 1fr) 36px',
        alignItems: 'center',
        width: { xs: '100%', sm: 'auto' },
        minHeight: 40,
        border: '1px solid',
        borderColor: 'rgba(26,24,21,0.12)',
        borderRadius: theme.shape.rounded.md,
        bgcolor: 'background.paper',
        overflow: 'hidden',
      })}
    >
      <Tooltip title="Mês anterior">
        <IconButton
          aria-label="Mês anterior"
          onClick={goToPreviousMonth}
          size="small"
          sx={{ width: 36, height: 40, borderRadius: 0 }}
        >
          <ChevronLeft size={18} />
        </IconButton>
      </Tooltip>

      <Box
        component="label"
        htmlFor={inputId}
        sx={{
          position: 'relative',
          minWidth: 0,
          height: 40,
          px: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          borderLeft: '1px solid',
          borderRight: '1px solid',
          borderColor: 'rgba(26,24,21,0.08)',
          cursor: 'pointer',
        }}
      >
        <CalendarDays size={16} />
        <Typography
          variant="labelSm"
          component="span"
          color="text.primary"
          sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        >
          {monthLabel}
        </Typography>

        <Box
          id={inputId}
          component="input"
          type="month"
          aria-label="Selecionar mês"
          value={formatMonthInputValue(selectedMonth)}
          onChange={(event) => {
            const month = parseMonthInputValue(event.target.value)
            if (month) setSelectedMonth(month)
          }}
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer',
          }}
        />
      </Box>

      <Tooltip title="Próximo mês">
        <IconButton
          aria-label="Próximo mês"
          onClick={goToNextMonth}
          size="small"
          sx={{ width: 36, height: 40, borderRadius: 0 }}
        >
          <ChevronRight size={18} />
        </IconButton>
      </Tooltip>
    </Box>
  )
}
