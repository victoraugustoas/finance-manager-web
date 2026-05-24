import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Divider from '@mui/material/Divider'
import OutlinedInput from '@mui/material/OutlinedInput'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { X } from 'lucide-react'
import { useState } from 'react'

export interface AccountOption { id: string; name: string }
export interface CategoryOption { id: string; name: string; color: string }

interface AddTransactionModalProps {
  open: boolean
  onClose: () => void
  accounts: AccountOption[]
  categories: CategoryOption[]
  onSubmit?: (data: { type: 'in' | 'out'; amount: string; categoryId: string; accountId: string; date: string }) => void
}

export function AddTransactionModal({
  open,
  onClose,
  accounts,
  categories,
  onSubmit,
}: AddTransactionModalProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [type, setType] = useState<'in' | 'out'>('out')
  const [amount, setAmount] = useState('')
  const [categoryId, setCategoryId] = useState(categories[0]?.id ?? '')
  const [accountId, setAccountId] = useState(accounts[0]?.id ?? '')
  const [date, setDate] = useState('')

  function handleSubmit() {
    onSubmit?.({ type, amount, categoryId, accountId, date })
    onClose()
  }

  const visibleCategories = categories.filter(c => type === 'in' || c.id !== 'salary')

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      // Bottom sheet no mobile
      PaperProps={{
        sx: {
          borderRadius: isMobile ? '28px 28px 0 0' : '18px',
          m: 0,
          ...(isMobile && {
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            width: '100%',
            maxWidth: '100% !important',
          }),
        },
      }}
      sx={{
        '& .MuiBackdrop-root': { bgcolor: 'rgba(0,0,0,0.32)' },
        ...(isMobile && {
          '& .MuiDialog-container': { alignItems: 'flex-end' },
        }),
      }}
    >
      <DialogContent sx={{ p: { xs: '12px 20px 32px', sm: '24px' } }}>
        {/* Handle no mobile */}
        {isMobile && (
          <Box
            sx={{
              width: 40,
              height: 4,
              borderRadius: 2,
              bgcolor: 'rgba(26,24,21,0.16)',
              mx: 'auto',
              mb: 1.75,
            }}
          />
        )}

        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
          <Typography
            sx={{
              fontFamily: '"Fraunces", Georgia, serif',
              fontWeight: 500,
              fontSize: '1.5rem',
              color: 'text.primary',
            }}
          >
            nova movimentação
          </Typography>
          <Box
            component="button"
            onClick={onClose}
            sx={{
              width: 32,
              height: 32,
              border: 0,
              bgcolor: '#ece5d6',
              borderRadius: '50%',
              color: 'text.secondary',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={16} strokeWidth={2} />
          </Box>
        </Box>

        {/* Tipo: Saída / Entrada */}
        <Box
          sx={{
            display: 'flex',
            gap: '6px',
            p: '4px',
            bgcolor: '#ece5d6',
            borderRadius: '12px',
            mb: 2.5,
          }}
        >
          {(['out', 'in'] as const).map(t => (
            <Box
              key={t}
              component="button"
              onClick={() => setType(t)}
              sx={{
                flex: 1,
                height: 36,
                border: 0,
                borderRadius: '8px',
                cursor: 'pointer',
                bgcolor: type === t ? 'background.paper' : 'transparent',
                color: type === t ? 'text.primary' : 'text.secondary',
                fontFamily: '"Inter", system-ui, sans-serif',
                fontSize: '0.875rem',
                fontWeight: 600,
                boxShadow: type === t ? '0 1px 2px rgba(26,24,21,0.04)' : 'none',
                transition: 'all 150ms cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              {t === 'out' ? 'Saída' : 'Entrada'}
            </Box>
          ))}
        </Box>

        {/* Valor */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, mb: 2 }}>
          <Typography variant="caption">Valor</Typography>
          <OutlinedInput
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="R$ 0,00"
            autoFocus
            size="small"
            sx={{
              borderRadius: '12px',
              fontFamily: '"Fraunces", Georgia, serif',
              fontSize: '1.25rem',
              '& fieldset': { borderColor: 'rgba(26,24,21,0.16)' },
              '&.Mui-focused fieldset': { borderColor: 'primary.main' },
            }}
          />
        </Box>

        {/* Categoria */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" sx={{ display: 'block', mb: 0.75 }}>
            Categoria
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
            {visibleCategories.map(c => (
              <Box
                key={c.id}
                component="button"
                onClick={() => setCategoryId(c.id)}
                sx={{
                  height: 28,
                  px: '10px',
                  borderRadius: '999px',
                  border: '1px solid',
                  borderColor: categoryId === c.id ? 'transparent' : 'rgba(26,24,21,0.08)',
                  bgcolor: categoryId === c.id ? c.color : '#ece5d6',
                  color: categoryId === c.id ? '#fff' : 'text.secondary',
                  fontFamily: '"Inter", system-ui, sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.75,
                  transition: 'all 120ms cubic-bezier(0.22,1,0.36,1)',
                }}
              >
                {categoryId === c.id && (
                  <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.7)' }} />
                )}
                {c.name}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Conta + Data */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, mb: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
            <Typography variant="caption">Conta</Typography>
            <Box
              component="select"
              value={accountId}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setAccountId(e.target.value)}
              sx={{
                height: 40,
                px: '14px',
                borderRadius: '12px',
                border: '1px solid rgba(26,24,21,0.16)',
                bgcolor: 'background.paper',
                color: 'text.primary',
                fontFamily: '"Inter", system-ui, sans-serif',
                fontSize: '0.875rem',
                appearance: 'none',
                cursor: 'pointer',
              }}
            >
              {accounts.map(a => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
            <Typography variant="caption">Data</Typography>
            <OutlinedInput
              value={date}
              onChange={e => setDate(e.target.value)}
              placeholder="Hoje"
              size="small"
              sx={{
                borderRadius: '12px',
                fontSize: '0.875rem',
                '& fieldset': { borderColor: 'rgba(26,24,21,0.16)' },
                '&.Mui-focused fieldset': { borderColor: 'primary.main' },
              }}
            />
          </Box>
        </Box>

        <Divider sx={{ mb: 2.5 }} />

        {/* Ações */}
        <Box sx={{ display: 'flex', gap: 1.25, justifyContent: { xs: 'stretch', sm: 'flex-end' }, flexDirection: { xs: 'column-reverse', sm: 'row' } }}>
          <Box
            component="button"
            onClick={onClose}
            sx={{
              height: 44,
              px: 3,
              borderRadius: '12px',
              border: '1px solid rgba(26,24,21,0.16)',
              bgcolor: 'transparent',
              color: 'text.primary',
              fontFamily: '"Inter", system-ui, sans-serif',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              '&:hover': { bgcolor: 'rgba(26,24,21,0.04)' },
            }}
          >
            Cancelar
          </Box>
          <Box
            component="button"
            onClick={handleSubmit}
            sx={{
              height: 44,
              px: 3,
              borderRadius: '12px',
              border: 0,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              fontFamily: '"Inter", system-ui, sans-serif',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              flex: { xs: 1, sm: 'none' },
              '&:hover': { bgcolor: 'primary.dark' },
              '&:active': { transform: 'scale(0.98)' },
            }}
          >
            Adicionar
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
