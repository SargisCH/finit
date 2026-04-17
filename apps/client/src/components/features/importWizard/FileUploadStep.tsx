import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Flex, Icon, Input, Text, VStack } from "@chakra-ui/react";
import { LuUpload } from "react-icons/lu";
import { uploadFileForHeaders } from "../../../api/import";

interface Props {
  onUpload: (file: File, headers: string[]) => void;
}

export default function FileUploadStep({ onUpload }: Props) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const response = await uploadFileForHeaders(file);
      onUpload(file, response.headers);
    } catch (err) {
      console.error("Error uploading file:", err);
      setError("Failed to process the file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack gap={6} align="stretch">
      <Box
        border="2px dashed"
        borderColor="gray.300"
        borderRadius="md"
        p={10}
        textAlign="center"
        cursor="pointer"
        _hover={{ borderColor: "green.400" }}
        position="relative"
      >
        <Input
          type="file"
          accept=".xlsx,.xls,.csv"
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          opacity={0}
          cursor="pointer"
          onChange={handleFileChange}
          disabled={loading}
        />
        <VStack gap={2}>
          <Icon as={LuUpload} boxSize={8} color="gray.400" />
          <Text fontWeight="bold">{t("import.selectFile")}</Text>
          <Text color="gray.500">{t("import.dragAndDrop")}</Text>
        </VStack>
      </Box>

      {loading && (
        <Flex justifyContent="center">
          <Text>Processing file...</Text>
        </Flex>
      )}

      {error && (
        <Text color="red.500" textAlign="center">
          {error}
        </Text>
      )}
    </VStack>
  );
}
