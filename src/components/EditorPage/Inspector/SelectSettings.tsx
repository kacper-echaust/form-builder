import { Field, Input, Button, Text, Flex, Icon, Stack } from '@chakra-ui/react'
import type { FieldSettings } from '../../../types'
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa'
import { type ChangeEvent } from 'react'

const SelectSettings = ({ onChange, formValues }: FieldSettings) => {
  const { placeholder, options } = formValues
  const selectOptions = options || []

  const handleAddOption = () => {
    const id = crypto.randomUUID()
    const updated = [...selectOptions, { id, optionName: 'Add some option' }]

    onChange('options', updated)
  }
  const handleDeleteOption = (id: string) => {
    const updated = selectOptions.filter((option) => option.id !== id)
    onChange('options', updated)
  }
  const handleChange = (id: string, event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const updated = selectOptions.map((option) =>
      option.id === id ? { ...option, optionName: value } : option
    )
    onChange('options', updated)
  }
  return (
    <>
      <Field.Root>
        <Field.Label>Placeholder</Field.Label>
        <Input
          name="placeholder"
          onChange={(e) => onChange('placeholder', e.target.value)}
          value={placeholder}
        />
      </Field.Root>
      <Field.Root padding="2">
        <Field.Label>Options</Field.Label>
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
                value={option.optionName}
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
