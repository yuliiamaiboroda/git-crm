import { Check } from '@mui/icons-material'
import { Button, ButtonProps, CircularProgress } from '@mui/material'
import { FC } from 'react'

type Props = {
  done?: boolean
  loading?: boolean
} & ButtonProps

export const CustomButton: FC<Props> = ({ done, loading, ...other }) => {
  if (done) {
    return (
      <Button fullWidth disabled variant="contained" {...other}>
        <Check />
      </Button>
    )
  } else if (loading) {
    return (
      <Button fullWidth disabled variant="contained" {...other}>
        <CircularProgress size={22} />
      </Button>
    )
  } else {
    return <Button fullWidth variant="contained" {...other} />
  }
}
