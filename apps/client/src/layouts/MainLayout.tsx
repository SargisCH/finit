import { Box, Flex, Menu, Portal, Image, Span } from "@chakra-ui/react";
import usFlag from "../assets/united-states-svgrepo-com.svg";
import armFlag from "../assets/armenia-svgrepo-com.svg";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

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
  const imgUrl = new URL("/logo.png", import.meta.url).href;
  const { t } = useTranslation();
  return (
    <Box>
      <Flex
        bg={"brandBg"}
        px={10}
        py={5}
        justifyContent={"space-between"}
        boxSizing={"border-box"}
        borderBottomColor={"lightgray"}
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
        <Menu.Root>
          <Menu.Trigger asChild>
            <Span color="white" textDecoration={"underline"} cursor={"pointer"}>
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
      </Flex>
      <Box>{children}</Box>
      <Box mt={4} p={20} bg={"brandBg"}></Box>
    </Box>
  );
};
export default MainLayout;
