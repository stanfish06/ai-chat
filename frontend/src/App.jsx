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
import { UpdateMsg } from "../wailsjs/go/main/Prompt"

function App() {
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(null)
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

  const sendPrompt = async () => {
    setLoading(true);
    setErr(null);
    try {
      const confirmation = await UpdateMsg(text);
      console.log(confirmation);
    } catch (e) {
      setErr(String(e));
    } finally {
      setLoading(false);
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
                  placeholder="Enter a message"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  size="lg"
                />

                <Button
                  onClick={sendPrompt}
                  colorScheme="blue"
                  size="lg"
                  w="full"
                  disabled={!text}
                >
                  send
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
