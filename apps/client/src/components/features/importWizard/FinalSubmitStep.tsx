import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Flex,
  Table,
  Text,
  VStack,
  Icon,
  HStack,
  Separator,
  Badge,
  Collapsible,
} from "@chakra-ui/react";
import { LuFile, LuCheck, LuChevronDown, LuChevronUp } from "react-icons/lu";
import { useMutation } from "@tanstack/react-query";
import { analyzeExpenses } from "../../../api/import";
import type { ExpenseCategory, ExpenseItem } from "@shared/schemas";
import { useState } from "react";

interface Props {
  file: File | null;
  mapping: Record<string, string>;
  onComplete: () => void;
}

function CategoryCard({ category, currency }: { category: ExpenseCategory; currency: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Box border="1px solid" borderColor="gray.200" borderRadius="md" overflow="hidden" _dark={{ borderColor: "gray.700" }}>
      <Flex
        px={4}
        py={3}
        justifyContent="space-between"
        alignItems="center"
        cursor="pointer"
        onClick={() => setOpen(!open)}
        _hover={{ bg: "gray.50", _dark: { bg: "gray.800" } }}
      >
        <HStack gap={3}>
          <Text fontWeight="semibold">{category.name}</Text>
          <Badge colorPalette="green" variant="subtle">{category.percentage.toFixed(1)}%</Badge>
        </HStack>
        <HStack gap={3}>
          <Text fontWeight="bold">{category.total.toLocaleString()} {currency}</Text>
          <Icon as={open ? LuChevronUp : LuChevronDown} color="gray.500" />
        </HStack>
      </Flex>

      <Collapsible.Root open={open}>
        <Collapsible.Content>
          <Box px={4} pb={4}>
            <Table.Root size="sm" variant="outline">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Description</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="right">Amount</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="right">Count</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {category.expenses.map((expense: ExpenseItem, i: number) => (
                  <Table.Row key={i}>
                    <Table.Cell color="gray.600" _dark={{ color: "gray.400" }}>{expense.description}</Table.Cell>
                    <Table.Cell textAlign="right">{expense.amount.toLocaleString()} {currency}</Table.Cell>
                    <Table.Cell textAlign="right">{expense.count}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  );
}

export default function FinalSubmitStep({ file, mapping, onComplete }: Props) {
  const { t } = useTranslation();

  const { mutate, isPending, data: result } = useMutation({
    mutationFn: () => analyzeExpenses(file!, mapping),
  });

  const activeMappings = Object.entries(mapping).filter(([_, value]) => !!value);

  if (result) {
    return (
      <VStack gap={6} align="stretch">
        <HStack justifyContent="space-between" flexWrap="wrap" gap={2}>
          <VStack align="start" gap={0}>
            <Text fontSize="xl" fontWeight="bold">{t("import.analysisResult")}</Text>
            <Text color="gray.500" fontSize="sm">{file?.name}</Text>
          </VStack>
          <Box textAlign="right">
            <Text fontSize="2xl" fontWeight="bold">
              {result.totalAmount.toLocaleString()} {result.currency}
            </Text>
            <Text color="gray.500" fontSize="sm">{t("import.totalExpenses")}</Text>
          </Box>
        </HStack>

        <VStack gap={3} align="stretch">
          {result.categories.map((cat: ExpenseCategory, i: number) => (
            <CategoryCard key={i} category={cat} currency={result.currency} />
          ))}
        </VStack>

        <Flex justifyContent="end">
          <Button colorPalette="natureDark" onClick={onComplete}>
            {t("import.done")}
          </Button>
        </Flex>
      </VStack>
    );
  }

  return (
    <VStack gap={8} align="stretch">
      <Box textAlign="center" py={4}>
        <Icon as={LuCheck} boxSize={12} color="green.500" mb={4} />
        <Text fontSize="xl" fontWeight="bold">
          {t("import.readyToAnalyze")}
        </Text>
        <Text color="gray.500">
          {t("import.reviewBeforeSubmit")}
        </Text>
      </Box>

      <VStack gap={4} align="stretch" bg="gray.50" p={6} borderRadius="md" _dark={{ bg: "gray.800" }}>
        <HStack gap={3}>
          <Icon as={LuFile} color="blue.500" />
          <Text fontWeight="bold">{t("import.fileDetails")}</Text>
        </HStack>
        <Text fontSize="sm" ml={7}>
          {file?.name} ({(file?.size || 0) / 1024 > 1024
            ? `${((file?.size || 0) / (1024 * 1024)).toFixed(2)} MB`
            : `${((file?.size || 0) / 1024).toFixed(2)} KB`})
        </Text>

        <Separator />

        <HStack gap={3}>
          <Icon as={LuCheck} color="green.500" />
          <Text fontWeight="bold">{t("import.fieldMappings")}</Text>
        </HStack>

        {activeMappings.length > 0 ? (
          <Table.Root size="sm" variant="outline" ml={7} width="auto">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader border="none" pb={2}>{t("import.systemField")}</Table.ColumnHeader>
                <Table.ColumnHeader border="none" pb={2}>{t("import.fileColumn")}</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {activeMappings.map(([key, value]) => (
                <Table.Row key={key}>
                  <Table.Cell border="none" py={1} color="gray.600" _dark={{ color: "gray.400" }}>
                    {t(`import.fields.${key}`)}
                  </Table.Cell>
                  <Table.Cell border="none" py={1} fontWeight="medium">
                    {value}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        ) : (
          <Text fontSize="sm" ml={7} fontStyle="italic" color="gray.500">
            {t("import.noMappingAutoDetect")}
          </Text>
        )}
      </VStack>

      <Flex justifyContent="end">
        <Button
          colorPalette="natureDark"
          size="lg"
          onClick={() => mutate()}
          loading={isPending}
        >
          {isPending ? t("import.analyzing") : t("import.analyze")}
        </Button>
      </Flex>
    </VStack>
  );
}
