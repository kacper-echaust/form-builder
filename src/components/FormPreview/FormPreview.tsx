import {
  Box,
  Button,
  Checkbox,
  createListCollection,
  Field,
  Heading,
  Input,
  Portal,
  RadioGroup,
  Select,
  Textarea,
} from '@chakra-ui/react'
import { useContext, type FormEvent } from 'react'
import { CanvasFieldsContext } from '../../context/CanvasFieldsContext'
import type { CanvasFieldsType } from '../../types'

const FormPreview = () => {
  const { canvasFields } = useContext(CanvasFieldsContext)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())
    console.log(data)
  }
  const getField = (field: CanvasFieldsType) => {
    const {
      type,
      label,
      required,
      fromTo,
      maxLength,
      minLength,
      selectOptions,
      placeholder,
    } = field
    const selectCollection = createListCollection({
      items:
        selectOptions?.map((opt) => ({
          label: opt.value,
          value: String(opt.value),
        })) ?? [],
    })
    switch (type) {
      case 'text':
        return (
          <Field.Root required={required}>
            <Field.Label>{label}</Field.Label>
            <Input
              placeholder={placeholder}
              min={minLength || undefined}
              max={maxLength || undefined}
              name={label}
            />
          </Field.Root>
        )
      case 'checkbox':
        return (
          <Checkbox.Root required={required} name={label}>
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>{label}</Checkbox.Label>
          </Checkbox.Root>
        )
      case 'textarea':
        return (
          <Field.Root required={required}>
            <Field.Label>{label}</Field.Label>
            <Textarea
              placeholder={placeholder}
              minLength={Number(minLength) || undefined}
              maxLength={Number(maxLength) || undefined}
              name={label}
            />
          </Field.Root>
        )
      case 'radio':
        return (
          <>
            <RadioGroup.Root
              defaultValue={field.radioOptions?.[0].value}
              name={field.uid}
              display="flex"
              justifyContent="space-around"
              width="100%"
            >
              <RadioGroup.Label>{label}</RadioGroup.Label>
              {field.radioOptions?.map((item) => (
                <RadioGroup.Item key={item.value} value={item.value}>
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemIndicator />
                  <RadioGroup.ItemText>{item.value}</RadioGroup.ItemText>
                </RadioGroup.Item>
              ))}
            </RadioGroup.Root>
          </>
        )
      case 'select':
        return (
          <Select.Root
            collection={selectCollection}
            name={label}
            required={required}
          >
            <Select.HiddenSelect />
            <Select.Label>{label}</Select.Label>
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder={placeholder} />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {selectCollection.items.map((option) => (
                    <Select.Item item={option} key={option.value}>
                      {option.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        )
      case 'date':
        if (fromTo) {
          return (
            <Field.Root required={required}>
              <Field.Label>{`${label} from`}</Field.Label>
              <Input
                placeholder={minLength}
                type={type}
                name={`from ${label}`}
              />
              <Field.Label>{`${label} to`}</Field.Label>
              <Input placeholder={maxLength} type={type} name={`to ${label}`} />
            </Field.Root>
          )
        }
        return (
          <Field.Root required={required}>
            <Field.Label>{label}</Field.Label>
            <Input
              placeholder={placeholder}
              min={minLength}
              max={maxLength}
              name={label}
              type={type}
            />
          </Field.Root>
        )
      case 'number':
        return (
          <Field.Root required={required}>
            <Field.Label>{label}</Field.Label>
            <Input placeholder={placeholder} type={type} name={label} />
          </Field.Root>
        )
    }
  }

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Heading position="absolute" top={{ base: 20, lg: 10 }} size="3xl">
        Form Builder
      </Heading>
      <form onSubmit={handleSubmit} style={{ width: '50%', marginTop: '50px' }}>
        {canvasFields.map((field) => (
          <Box key={field.uid} padding={2}>
            {getField(field)}
          </Box>
        ))}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginTop="20px"
        >
          <Button type="submit" paddingX={10}>
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export { FormPreview }
