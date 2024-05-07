import React from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Flex,
  Avatar,
  Box,
  Text,
  Badge,
  Button,
  Image,
} from '@chakra-ui/react';
import MenuLink from './menuLink/menuLink'; // Assuming MenuLink is another component
import { MdLogout } from 'react-icons/md';

const SidebarDrawer = ({ isOpen, onClose, name, lastName, menuItems, handleClick } : any) => {
  return (
    <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody backgroundColor={"#182237"} color="white">
            <Flex direction="column" p={4}>
              <Flex align="center">
                <Image alt="itesa-icon" width={50} height={50} src="/itesa.png" />
                <Box ml="3">
                  <Text fontWeight="bold">
                    {name} {lastName}
                    <Badge ml="1" colorScheme="green">
                      New
                    </Badge>
                  </Text>
                  <Text fontSize="sm">Crypto Lord</Text>
                </Box>
              </Flex>
              <ul style={{ listStyle: "none" }}>
                {menuItems.map((cat: any) => (
                  <li key={cat.title}>
                    {cat.list.map((item: any) => (
                      <MenuLink onClose={onClose} item={item} key={item.title} />
                    ))}
                  </li>
                ))}
              </ul>
              <Button
                leftIcon={<MdLogout />}
                variant="outline"
                colorScheme="red"
                onClick={handleClick}
              >
                Logout
              </Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default SidebarDrawer;
