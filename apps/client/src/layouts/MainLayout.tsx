import { Box, Flex, Menu, Portal, Image } from "@chakra-ui/react";
import usFlag from "../assets/united-states-svgrepo-com.svg";
import armFlag from "../assets/armenia-svgrepo-com.svg";
import { useTranslation } from "react-i18next";

const icons = {
  en: usFlag,
  am: armFlag,
};

type Props = {};

const MainLayout: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {
  const { i18n } = useTranslation();
  const selectedLanguage = (i18n.resolvedLanguage ??
    "en") as keyof typeof icons;
  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  return (
    <Box>
      <Flex
        px={10}
        py={5}
        justifyContent={"space-between"}
        borderBottomColor={"lightgray"}
        borderBottomWidth={"1px"}
      >
        <img src="" alt={"logo image"} />
        <Menu.Root>
          <Menu.Trigger asChild>
            <Image src={icons[selectedLanguage]} width={"6"} />
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item
                  value="en"
                  justifyContent={"center"}
                  onClick={() => handleLanguageChange("en")}
                >
                  <Image src={usFlag} width={"6"} />
                </Menu.Item>
                <Menu.Item
                  value="am"
                  justifyContent={"center"}
                  onClick={() => handleLanguageChange("am")}
                >
                  <Image src={armFlag} width={"6"} />
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Flex>
      <Box>{children}</Box>
    </Box>
  );
};
export default MainLayout;
