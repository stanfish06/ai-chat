import React, { useState } from 'react'
import {
  Box,
  Button,
  HStack,
  VStack,
  Text,
  Input,
  Card,
  Heading,
  Flex
} from "@chakra-ui/react"
import { ColorModeButton, useColorModeValue } from './components/ui/color-mode'
import Sidebar from './components/Sidebar'
import { Greet } from "../wailsjs/go/main/App"

function App() {
  const [name, setName] = useState('')
  const [result, setResult] = useState('')

  const bg = useColorModeValue('gray.50', 'gray.900')
  const cardBg = useColorModeValue('white', 'gray.800')

  const handleGreet = async () => {
    if (name) {
      try {
        const greeting = await Greet(name)
        setResult(greeting)
      } catch (error) {
        console.error('Error calling Greet:', error)
        setResult('Error calling backend function')
      }
    }
  }

  return (
    <Flex minH="100vh" bg={bg}>
      <Sidebar />
      <Box flex="1" p={8}>
        <VStack spacing={6} maxW="md" mx="auto">
          <HStack w="full" justify="space-between" align="center">
            <Heading size="lg" color="blue.500">
              AI Chat App
            </Heading>
            <ColorModeButton />
          </HStack>

          <Card.Root w="full" bg={cardBg} p={6}>
            <VStack spacing={4}>
              <Text fontSize="lg" textAlign="center">
                Welcome to your Wails + Chakra UI app!
              </Text>

              <VStack spacing={3} w="full">
                <Input
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  size="lg"
                />

                <Button
                  onClick={handleGreet}
                  colorScheme="blue"
                  size="lg"
                  w="full"
                  disabled={!name}
                >
                  Greet Me
                </Button>
              </VStack>

              {result && (
                <Box
                  p={4}
                  borderRadius="md"
                  bg={useColorModeValue('blue.50', 'blue.900')}
                  w="full"
                >
                  <Text fontSize="lg" fontWeight="medium" textAlign="center">
                    {result}
                  </Text>
                </Box>
              )}
            </VStack>
          </Card.Root>
        </VStack>
      </Box>
    </Flex>
  )
}

export default App
