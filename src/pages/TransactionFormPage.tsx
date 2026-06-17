import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'
import FormControlLabel from '@mui/material/FormControlLabel'
import MenuItem from '@mui/material/MenuItem'
import Skeleton from '@mui/material/Skeleton'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { ArrowLeft, ArrowDownToLine, ArrowUpFromLine } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTransactionFormController } from './TransactionForm/hooks/useTransactionFormController.ts'

function TypeButton({
  active,
  label,
  description,
  icon,
  tone = 'primary',
  onClick,
}: {
  active: boolean
  label: string
  description: string
  icon: ReactNode
  tone?: 'primary' | 'success' | 'error'
  onClick: () => void
}) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      sx={(theme) => {
        const activePalette = theme.palette[tone]

        return {
          display: 'flex',
          alignItems: 'center',
          gap: 3,
          width: '100%',
          p: 4,
          borderRadius: theme.shape.rounded.lg,
          border: `1px solid ${active ? activePalette.main : theme.palette.divider}`,
          bgcolor: active ? activePalette.light : 'background.paper',
          color: active ? activePalette.main : 'text.secondary',
          textAlign: 'left',
          cursor: 'pointer',
          transition: 'all 120ms cubic-bezier(0.22,1,0.36,1)',
          '&:hover': {
            borderColor: activePalette.main,
            bgcolor: active ? activePalette.light : 'background.surface',
          },
        }
      }}
    >
      <Box
        sx={(theme) => {
          const activePalette = theme.palette[tone]

          return {
            width: 36,
            height: 36,
            borderRadius: theme.shape.rounded.navItem,
            bgcolor: active ? activePalette.main : 'background.surfaceInset',
            color: active ? 'primary.contrastText' : 'text.secondary',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="labelSm" component="div" color="inherit" sx={{ fontWeight: 700 }}>
          {label}
        </Typography>
        <Typography variant="caption" component="div" color="text.disabled">
          {description}
        </Typography>
      </Box>
    </Box>
  )
}

export function TransactionFormPage() {
  const {
    form,
    accounts,
    categories,
    subCategories,
    isLoading,
    isSubmitting,
    errorMessage,
    successMessage,
    updateField,
    updateType,
    updateCategory,
    submit,
    goBack,
  } = useTransactionFormController()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 3 }}>
        <Button
          variant="text"
          startIcon={<ArrowLeft size={18} />}
          onClick={goBack}
          sx={{ alignSelf: 'flex-start' }}
        >
          voltar
        </Button>
      </Box>

      <Card>
        <CardContent sx={{ p: { xs: 4, sm: 5 } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <Box>
              <Typography variant="h2" component="h2">
                Nova movimentação
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Cadastre receitas e despesas com conta, categoria, subcategoria e datas.
              </Typography>
            </Box>

            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

            <Box
              component="form"
              onSubmit={async (event) => {
                event.preventDefault()
                await submit()
              }}
              sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: 2,
                }}
              >
                <TypeButton
                  active={form.type === 'EXPENSE'}
                  label="Despesa"
                  description="lançamento de saída"
                  icon={<ArrowUpFromLine size={18} />}
                  tone="error"
                  onClick={() => updateType('EXPENSE')}
                />
                <TypeButton
                  active={form.type === 'INCOME'}
                  label="Receita"
                  description="lançamento de entrada"
                  icon={<ArrowDownToLine size={18} />}
                  tone="success"
                  onClick={() => updateType('INCOME')}
                />
              </Box>

              {isLoading ? (
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    gap: 3,
                  }}
                >
                  {Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      variant="rounded"
                      height={56}
                      sx={(theme) => ({
                        borderRadius: theme.shape.rounded.md,
                        bgcolor: 'background.surfaceInset',
                      })}
                    />
                  ))}
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', sm: 'minmax(0, 2fr) 1fr' },
                      gap: 3,
                    }}
                  >
                    <TextField
                      label="Descrição"
                      value={form.name}
                      onChange={(event) => updateField('name', event.target.value)}
                      required
                      fullWidth
                      slotProps={{ htmlInput: { maxLength: 255 } }}
                    />
                    <TextField
                      label="Valor"
                      type="number"
                      value={form.amount}
                      onChange={(event) => updateField('amount', event.target.value)}
                      required
                      fullWidth
                      slotProps={{ htmlInput: { min: 0.01, step: 0.01 } }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' },
                      gap: 3,
                    }}
                  >
                    <TextField
                      label="Conta"
                      value={form.accountId}
                      onChange={(event) => updateField('accountId', event.target.value)}
                      required
                      select
                      fullWidth
                    >
                      {accounts.map((account) => (
                        <MenuItem key={account.id} value={account.id}>
                          {account.name}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      label="Categoria"
                      value={form.categoryId}
                      onChange={(event) => updateCategory(event.target.value)}
                      required
                      select
                      fullWidth
                    >
                      {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      label="Subcategoria"
                      value={form.subCategoryId}
                      onChange={(event) => updateField('subCategoryId', event.target.value)}
                      required
                      select
                      fullWidth
                      disabled={!form.categoryId}
                    >
                      {subCategories.map((subCategory) => (
                        <MenuItem key={subCategory.id} value={subCategory.id}>
                          {subCategory.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>

                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                      gap: 3,
                    }}
                  >
                    <TextField
                      label="Data de vencimento"
                      type="date"
                      value={form.dueDate}
                      onChange={(event) => updateField('dueDate', event.target.value)}
                      required
                      fullWidth
                      slotProps={{ inputLabel: { shrink: true } }}
                    />
                    <TextField
                      label="Data de lançamento"
                      type="date"
                      value={form.entryDate}
                      onChange={(event) => updateField('entryDate', event.target.value)}
                      required
                      fullWidth
                      slotProps={{ inputLabel: { shrink: true } }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', sm: form.effectivated ? '1fr 1fr' : '1fr' },
                      gap: 3,
                      alignItems: 'center',
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Switch
                          checked={form.effectivated}
                          onChange={(event) => updateField('effectivated', event.target.checked)}
                        />
                      }
                      label={form.type === 'INCOME' ? 'Recebida' : 'Paga'}
                    />
                    {form.effectivated && (
                      <TextField
                        label={form.type === 'INCOME' ? 'Data de recebimento' : 'Data de pagamento'}
                        type="date"
                        value={form.effectivatedDate}
                        onChange={(event) => updateField('effectivatedDate', event.target.value)}
                        required
                        fullWidth
                        slotProps={{ inputLabel: { shrink: true } }}
                      />
                    )}
                  </Box>

                  <TextField
                    label="Observações"
                    value={form.notes}
                    onChange={(event) => updateField('notes', event.target.value)}
                    multiline
                    minRows={3}
                    fullWidth
                    slotProps={{ htmlInput: { maxLength: 2000 } }}
                  />
                </Box>
              )}

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button variant="outlined" onClick={goBack} disabled={isSubmitting}>
                  cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isLoading || isSubmitting}
                  startIcon={
                    isSubmitting ? <CircularProgress size={16} color="inherit" /> : undefined
                  }
                >
                  cadastrar
                </Button>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
