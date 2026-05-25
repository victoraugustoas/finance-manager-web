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

export interface AccountOption {
  id: string
  name: string
}
export interface CategoryOption {
  id: string
  name: string
  color: string
}

interface AddTransactionModalProps {
  open: boolean
  onClose: () => void
  accounts: AccountOption[]
  categories: CategoryOption[]
  onSubmit?: (data: {
    type: 'in' | 'out'
    amount: string
    categoryId: string
    accountId: string
    date: string
  }) => void
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

  const visibleCategories = categories.filter((c) => type === 'in' || c.id !== 'salary')

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: (t) => ({
          borderRadius: isMobile
            ? `${t.shape.rounded.xl}px ${t.shape.rounded.xl}px 0 0`
            : t.shape.rounded.lg,
          m: 0,
          ...(isMobile && {
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            width: '100%',
            maxWidth: '100%',
          }),
        }),
      }}
      sx={{
        '& .MuiBackdrop-root': { bgcolor: 'rgba(0,0,0,0.32)' },
        ...(isMobile && {
          '& .MuiDialog-container': { alignItems: 'flex-end' },
        }),
      }}
    >
      <DialogContent sx={{ p: { xs: '12px 20px 32px', sm: 5 } }}>
        {isMobile && (
          <Box
            sx={(t) => ({
              width: 40,
              height: 4,
              borderRadius: t.shape.rounded.pill,
              bgcolor: 'rgba(26,24,21,0.16)',
              mx: 'auto',
              mb: 4,
            })}
          />
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
          <Typography variant="pageTitle" component="div" color="text.primary">
            nova movimentação
          </Typography>
          <Box
            component="button"
            onClick={onClose}
            sx={(t) => ({
              width: 32,
              height: 32,
              border: 0,
              bgcolor: 'background.surfaceInset',
              borderRadius: t.shape.rounded.circle,
              color: 'text.secondary',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            })}
          >
            <X size={16} strokeWidth={2} />
          </Box>
        </Box>

        <Box
          sx={(t) => ({
            display: 'flex',
            gap: 2,
            p: 1,
            bgcolor: 'background.surfaceInset',
            borderRadius: t.shape.rounded.md,
            mb: 5,
          })}
        >
          {(['out', 'in'] as const).map((t) => (
            <Box
              key={t}
              component="button"
              onClick={() => setType(t)}
              sx={(theme) => ({
                flex: 1,
                height: 36,
                border: 0,
                borderRadius: theme.shape.rounded.icon,
                cursor: 'pointer',
                bgcolor: type === t ? 'background.paper' : 'transparent',
                color: type === t ? 'text.primary' : 'text.secondary',
                fontSize: '0.875rem',
                fontWeight: 600,
                boxShadow: type === t ? '0 1px 2px rgba(26,24,21,0.04)' : 'none',
                transition: 'all 150ms cubic-bezier(0.22,1,0.36,1)',
              })}
            >
              {t === 'out' ? 'Saída' : 'Entrada'}
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
          <Typography variant="caption">Valor</Typography>
          <OutlinedInput
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="R$ 0,00"
            autoFocus
            size="small"
            sx={(t) => ({
              borderRadius: t.shape.rounded.md,
              fontFamily: '"Fraunces", Georgia, serif',
              fontSize: '1.25rem',
            })}
          />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="caption" sx={{ display: 'block', mb: 2 }}>
            Categoria
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {visibleCategories.map((c) => (
              <Box
                key={c.id}
                component="button"
                onClick={() => setCategoryId(c.id)}
                sx={(t) => ({
                  height: 28,
                  px: 3,
                  borderRadius: t.shape.rounded.pill,
                  border: '1px solid',
                  borderColor: categoryId === c.id ? 'transparent' : 'rgba(26,24,21,0.08)',
                  bgcolor: categoryId === c.id ? c.color : 'background.surfaceInset',
                  color: categoryId === c.id ? 'common.white' : 'text.secondary',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 2,
                  transition: 'all 120ms cubic-bezier(0.22,1,0.36,1)',
                })}
              >
                {categoryId === c.id && (
                  <Box
                    sx={(t) => ({
                      width: 6,
                      height: 6,
                      borderRadius: t.shape.rounded.circle,
                      bgcolor: 'rgba(255,255,255,0.7)',
                    })}
                  />
                )}
                {c.name}
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 6 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="caption">Conta</Typography>
            <Box
              component="select"
              value={accountId}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setAccountId(e.target.value)}
              sx={(t) => ({
                height: 40,
                px: 4,
                borderRadius: t.shape.rounded.md,
                border: '1px solid rgba(26,24,21,0.16)',
                bgcolor: 'background.paper',
                color: 'text.primary',
                fontSize: '0.875rem',
                appearance: 'none',
                cursor: 'pointer',
              })}
            >
              {accounts.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="caption">Data</Typography>
            <OutlinedInput
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Hoje"
              size="small"
              sx={(t) => ({
                borderRadius: t.shape.rounded.md,
                fontSize: '0.875rem',
              })}
            />
          </Box>
        </Box>

        <Divider sx={{ mb: 5 }} />

        <Box
          sx={{
            display: 'flex',
            gap: 3,
            justifyContent: { xs: 'stretch', sm: 'flex-end' },
            flexDirection: { xs: 'column-reverse', sm: 'row' },
          }}
        >
          <Box
            component="button"
            onClick={onClose}
            sx={(t) => ({
              height: 44,
              px: 5,
              borderRadius: t.shape.rounded.md,
              border: '1px solid rgba(26,24,21,0.16)',
              bgcolor: 'transparent',
              color: 'text.primary',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              '&:hover': { bgcolor: 'rgba(26,24,21,0.04)' },
            })}
          >
            Cancelar
          </Box>
          <Box
            component="button"
            onClick={handleSubmit}
            sx={(t) => ({
              height: 44,
              px: 5,
              borderRadius: t.shape.rounded.md,
              border: 0,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              flex: { xs: 1, sm: 'none' },
              '&:hover': { bgcolor: 'primary.dark' },
              '&:active': { transform: 'scale(0.98)' },
            })}
          >
            Adicionar
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
