import { Box, Typography } from '@mui/material'
import { FC, PropsWithChildren } from 'react'
import { FormContainer, PageContainer } from './Containers'

type Props = {
  heading: string
  onSubmit: () => void
}

export const LoginLayouts: FC<PropsWithChildren<Props>> = ({
  heading,
  children,
  onSubmit,
}) => {
  return (
    <PageContainer direction="column" justifyContent="space-between">
      <FormContainer variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
        >
          {heading}
        </Typography>
        <Box
          component="form"
          onSubmit={onSubmit}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
          }}
        >
          {children}
        </Box>
      </FormContainer>
    </PageContainer>
  )
}
