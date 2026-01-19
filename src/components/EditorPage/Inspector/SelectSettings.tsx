import { Field, Input, Button, Text, Flex, Icon, Stack } from '@chakra-ui/react'
import type { FieldSettings } from '../../../types'
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa'
import { type ChangeEvent } from 'react'

const SelectSettings = ({ onChange, formValues, errors }: FieldSettings) => {
  const { placeholder, selectOptions = [] } = formValues

  const handleAddOption = () => {
    const id = crypto.randomUUID()
    const updated = [...selectOptions, { id, value: 'Add some option' }]
    if (updated.length > 9) return
    onChange('selectOptions', updated)
  }
  const handleDeleteOption = (id: string) => {
    const updated = selectOptions.filter((option) => option.id !== id)
    onChange('selectOptions', updated)
  }
  const handleChange = (id: string, event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const updated = selectOptions.map((option) =>
      option.id === id ? { ...option, value } : option
    )
    onChange('selectOptions', updated)
  }
  return (
    <>
      <Field.Root invalid={!!errors.placeholder}>
        <Field.Label>Placeholder</Field.Label>
        <Input
          name="placeholder"
          onChange={(e) => onChange('placeholder', e.target.value)}
          value={placeholder ?? ''}
        />
        <Field.ErrorText>{errors.placeholder}</Field.ErrorText>
      </Field.Root>
      <Field.Root padding="2" invalid={!!errors.selectOptions}>
        <Field.Label>Options</Field.Label>
        <Field.ErrorText>{errors.selectOptions}</Field.ErrorText>
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
          {selectOptions.map((option, index) => (
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

export { SelectSettings }
