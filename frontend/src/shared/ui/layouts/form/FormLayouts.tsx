import { Box } from '@mui/material'
import { FC, PropsWithChildren } from 'react'
import { FormContainer, PageContainer } from './Containers'

type Props = {
  onSubmit: () => void
}

export const FormLayouts: FC<PropsWithChildren<Props>> = ({
  children,
  onSubmit,
}) => {
  return (
    <PageContainer direction="column" justifyContent="space-between">
      <FormContainer variant="outlined">
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
