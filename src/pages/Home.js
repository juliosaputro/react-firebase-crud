import React from 'react'
import DatasTable from '../components/DatasTable';
import Topup from '../components/Topup';
import Withdraw from '../components/Withdraw';
import {
Container,
Flex,
Text,
SimpleGrid
} from '@chakra-ui/react'

export default function Home() {
  return (
    <Container bg={"#303F9F"} h="full" maxW="full" mt={0} centerContent overflow={"hidden"} justifyContent={'space-between'}>
      <Flex h={'10rem'} justifyContent={'center'} alignItems={'center'} alignContent={'center'} >
      <Text textTransform={'uppercase'}>selamat datang admin</Text>
      </Flex>
      <Flex justifyContent={'space-between'} w={'7xl'}>
        <DatasTable/>
        <SimpleGrid columns={1} spacing={0}>
          <Topup/>
          <Withdraw/>
        </SimpleGrid>
      </Flex>
    </Container>
  )
}
