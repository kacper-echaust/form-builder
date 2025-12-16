import { useDraggable } from '@dnd-kit/core'
import type { Field } from '../../types'
import { Button } from '@chakra-ui/react/button'

const SingleField = ({ field }: { field: Field }) => {
  const { setNodeRef, listeners, attributes, transform } = useDraggable({
    id: field.id,
    data: field,
  })

  return (
    <Button
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      size="sm"
      variant="outline"
      style={{
        cursor: 'grab',
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
      }}
    >
      {field.name}
    </Button>
  )
}

export { SingleField }
