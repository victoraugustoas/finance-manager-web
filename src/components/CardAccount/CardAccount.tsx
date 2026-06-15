import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { CardAccountMobile } from './components/CardAccountMobile.tsx'
import { CardAccountDesktop } from './components/CardAccountDesktop.tsx'

export interface CardAccountProps {
  id: string
  name: string
  balance: number
}

export function CardAccount(props: CardAccountProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return isMobile ? <CardAccountMobile {...props} /> : <CardAccountDesktop {...props} />
}
