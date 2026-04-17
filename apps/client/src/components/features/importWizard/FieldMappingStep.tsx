import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Flex,
  Table,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

interface Props {
  headers: string[];
  mapping: Record<string, string>;
  onMappingSubmit: (mapping: Record<string, string>) => void;
}

const targetFields = ["name", "data", "taxid", "tax", "price"];

export default function FieldMappingStep({
  headers,
  mapping,
  onMappingSubmit,
}: Props) {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm({
    defaultValues: mapping,
  });

  const onSubmit = (values: Record<string, string>) => {
    onMappingSubmit(values);
  };

  return (
    <VStack gap={6} align="stretch">
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          {t("import.mappingStep")}
        </Text>
        <Text color="gray.500">{t("import.mappingDescription")}</Text>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Table.Root variant="outline">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>{t("import.fieldName")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("import.fileHeader")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {targetFields.map((field) => (
              <Table.Row key={field}>
                <Table.Cell fontWeight="medium">
                  {t(`import.fields.${field}`)}
                </Table.Cell>
                <Table.Cell>
                  <select
                    {...register(field)}
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #E2E8F0",
                    }}
                  >
                    <option value="">Select a header...</option>
                    {headers.map((header) => (
                      <option key={header} value={header}>
                        {header}
                      </option>
                    ))}
                  </select>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>

        <Flex justifyContent="space-between" mt={8}>
          <Button variant="ghost" onClick={() => onMappingSubmit({})}>
            {t("import.skip")}
          </Button>
          <Button colorPalette="natureDark" type="submit">
            {t("next")}
          </Button>
        </Flex>
      </form>
    </VStack>
  );
}
