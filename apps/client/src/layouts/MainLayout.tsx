import { Box, Flex, Menu, Portal, Image, Span, HStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ColorModeButton, useColorMode } from "../components/ui/color-mode";

const icons = {
  en: "en",
  am: "am",
};

type Props = {};

const MainLayout: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const selectedLanguage = (i18n.resolvedLanguage ??
    "en") as keyof typeof icons;
  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  const { colorMode } = useColorMode();
  const imgUrl = new URL("/logo.png", import.meta.url).href;
  const { t } = useTranslation();
  return (
    <Box>
      <Flex
        bg="nature.light"
        px={10}
        py={3}
        justifyContent={"space-between"}
        boxSizing={"border-box"}
        borderBottomColor={colorMode === "dark" ? "black" : "lightgray"}
        borderBottomWidth={"1px"}
        alignItems="center"
      >
        <Image
          src={imgUrl}
          alt={"logo image"}
          height={10}
          onClick={() => navigate("/")}
          cursor={"pointer"}
        />
        <HStack gap={2}>
          <Menu.Root>
            <Menu.Trigger asChild>
              <Span
                color="gray.700"
                textDecoration={"underline"}
                cursor={"pointer"}
              >
                {t(selectedLanguage)}
              </Span>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item
                    value="en"
                    justifyContent={"center"}
                    onClick={() => handleLanguageChange("en")}
                  >
                    {t("en")}
                  </Menu.Item>
                  <Menu.Item
                    value="am"
                    justifyContent={"center"}
                    onClick={() => handleLanguageChange("am")}
                  >
                    {t("am")}
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
          <ColorModeButton />
        </HStack>
      </Flex>
      <Box
        bg="gray.50" // Example background color
        _dark={{ bg: "gray.800" }} // Dark mode background
      >
        {children}
      </Box>
      <Box p={20} bg={"nature.light"}></Box>
    </Box>
  );
};
export default MainLayout;
