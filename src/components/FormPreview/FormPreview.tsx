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
          value: String(opt.id),
        })) ?? [],
    })
    switch (type) {
      case 'text':
        return (
          <>
            <Field.Label>{label}</Field.Label>
            <Input
              required={required}
              placeholder={placeholder}
              min={minLength}
              max={maxLength}
              name={label}
            />
          </>
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
          <>
            <Field.Label>{label}</Field.Label>
            <Textarea
              placeholder={placeholder}
              required={required}
              minLength={Number(minLength)}
              maxLength={Number(maxLength)}
              name={label}
            />
          </>
        )
      case 'radio':
        return (
          <>
            <Field.Label>{label}</Field.Label>
            <RadioGroup.Root
              defaultValue={field.radioOptions?.[0].value}
              name={label}
              display="flex"
              justifyContent="space-around"
              width="100%"
            >
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
          <Select.Root collection={selectCollection} name={label}>
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
            <>
              <Field.Label>{label}</Field.Label>
              <Input
                required={required}
                placeholder={minLength}
                type={type}
                name={`from ${label}`}
              />
              <Input
                required={required}
                placeholder={maxLength}
                type={type}
                name={`to ${label}`}
              />
            </>
          )
        }
        return (
          <>
            <Field.Label>{label}</Field.Label>
            <Input
              required={required}
              placeholder={placeholder}
              min={minLength}
              max={maxLength}
              name={label}
              type={type}
            />
          </>
        )
      case 'number':
        return (
          <>
            <Field.Label>{label}</Field.Label>
            <Input
              required={required}
              placeholder={placeholder}
              type={type}
              name={label}
            />
          </>
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
      <Heading position="absolute" top={10} size="3xl">
        Form Builder
      </Heading>
      <form onSubmit={handleSubmit} style={{ width: '50%' }}>
        {canvasFields.map((field) => (
          <Field.Root key={field.id} padding={2}>
            {getField(field)}
          </Field.Root>
        ))}
        <Box display="flex" alignItems="center" justifyContent="center">
          <Button type="submit" paddingX={10}>
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export { FormPreview }
