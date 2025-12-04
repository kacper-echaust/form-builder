import { Box, Button, Grid } from "@chakra-ui/react";

const fields = [
  { label: "Text input", type: "text" },
  { label: "Textarea", type: "textarea" },
  { label: "Checkbox", type: "checkbox" },
  { label: "Radio", type: "radio" },
  { label: "Select", type: "select" },
  { label: "Date", type: "date" },
  { label: "Number", type: "number" },
];

const SideBar = () => {
  return (
    <Box w="250px" p="4" borderRight="1px solid #eee" flexShrink={0}>
      <Box mb="4" fontWeight="bold" fontSize="lg">
        Form Fields
      </Box>
      <Grid templateColumns="repeat(2,1fr)" gap="4">
        {fields.map((field) => (
          <Button size="sm" variant="outline" key={field.type}>
            {field.label}
          </Button>
        ))}
      </Grid>
    </Box>
  );
};

export { SideBar };
