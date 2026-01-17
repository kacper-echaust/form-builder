import { Alert, Box } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'

const progressAnimation = keyframes`
  from { width: 0%; }
  to { width: 100%; }
`

const ErrorBaner = ({ error }: { error: string }) => {
  return (
    <Alert.Root
      status="error"
      position="absolute"
      top="5"
      width="60%"
      animation=""
    >
      <Alert.Indicator />
      <Alert.Title>{error}</Alert.Title>
      <Box
        position="absolute"
        bottom="0"
        left="0"
        height="4px"
        bg="red.200"
        animation={`${progressAnimation} 6s linear forwards`}
      ></Box>
    </Alert.Root>
  )
}

export { ErrorBaner }
