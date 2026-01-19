import { Button, Field, Flex, Icon, Input, Stack, Text } from '@chakra-ui/react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import type { FieldSettings } from '../../../types'
import type { ChangeEvent } from 'react'

const RadioSettings = ({ onChange, formValues, errors }: FieldSettings) => {
  const { radioOptions = [] } = formValues
  const handleAddOption = () => {
    const id = crypto.randomUUID()
    const updated = [...radioOptions, { id, value: 'Add some option' }]
    if (updated.length > 9) return
    onChange('radioOptions', updated)
  }
  const handleDeleteOption = (id: string) => {
    const updated = radioOptions.filter((option) => option.id !== id)
    onChange('radioOptions', updated)
  }
  const handleChange = (id: string, event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const updated = radioOptions.map((option) =>
      option.id === id ? { ...option, value } : option
    )
    onChange('radioOptions', updated)
  }
  return (
    <>
      <Field.Root padding="2" invalid={!!errors.radioOptions}>
        <Field.Label>Options</Field.Label>
        <Field.ErrorText>{errors.radioOptions}</Field.ErrorText>
        <Flex width="70%" justifyContent="space-between" alignItems="center">
          <Button
            backgroundColor="transparent"
            onClick={handleAddOption}
            paddingLeft={0}
          >
            <Icon>
              <FaPlusCircle color="white" />
            </Icon>
            <Text color="white">Add option</Text>
          </Button>
        </Flex>
        <Stack>
          {radioOptions.map((option, index) => (
            <Flex alignItems="center" key={option.id}>
              <Text marginRight={2}>{`${index + 1}.`}</Text>
              <Icon
                position="absolute"
                right={5}
                cursor="pointer"
                zIndex={99}
                onClick={() => handleDeleteOption(option.id)}
              >
                <FaMinusCircle color="white" />
              </Icon>
              <Input
                value={option.value}
                onChange={(event) => {
                  handleChange(option.id, event)
                }}
              />
            </Flex>
          ))}
        </Stack>
      </Field.Root>
    </>
  )
}

export { RadioSettings }
