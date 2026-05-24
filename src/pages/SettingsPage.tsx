import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useTranslate } from '../hooks/useTranslate'

export function SettingsPage() {
  const { t: tn } = useTranslate('nav')
  const { t } = useTranslate()

  return (
    <Card>
      <CardContent sx={{ p: { xs: '16px !important', sm: '24px !important' } }}>
        <Typography variant="h2" sx={{ mb: 1 }}>{tn('settings')}</Typography>
        <Typography variant="body2">{t('coming_soon')}</Typography>
      </CardContent>
    </Card>
  )
}
