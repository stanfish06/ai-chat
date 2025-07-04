import React from 'react'
import { 
  Box, 
  VStack, 
  Text, 
  Icon,
  Flex
} from '@chakra-ui/react'
import { useColorModeValue } from './ui/color-mode'
import { FiHome, FiSettings, FiUser, FiMessageSquare } from 'react-icons/fi'

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Flex
      align="center"
      p="3"
      mx="2"
      borderRadius="lg"
      cursor="pointer"
      _hover={{
        bg: useColorModeValue('gray.100', 'gray.700'),
      }}
      {...rest}
    >
      {icon && (
        <Icon
          mr="3"
          fontSize="16"
          as={icon}
        />
      )}
      <Text fontSize="sm">{children}</Text>
    </Flex>
  )
}

export default function Sidebar() {
  const bg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  
  return (
    <Box
      w="60"
      minH="100vh"
      bg={bg}
      borderRight="1px"
      borderColor={borderColor}
    >
      <VStack spacing="1" align="stretch" p="2">
        <Text 
          fontSize="lg" 
          fontWeight="bold" 
          p="3" 
          color={useColorModeValue('gray.700', 'gray.200')}
        >
          AI Chat
        </Text>
        
        <NavItem icon={FiHome}>
          Home
        </NavItem>
        
        <NavItem icon={FiMessageSquare}>
          Chats
        </NavItem>
        
        <NavItem icon={FiUser}>
          Profile
        </NavItem>
        
        <NavItem icon={FiSettings}>
          Settings
        </NavItem>
      </VStack>
    </Box>
  )
}

