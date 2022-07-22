import React, { useState,useEffect } from 'react'
import db from '../const/firebsae';
import {
  collection,
  getDocs,
} from "firebase/firestore"
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'


export default function DatasTable() {

  const [users, setUsers] = useState([])
  const userCollection = collection(db,"user")

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollection);
      setUsers(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    }
    getUsers();
  }, []);

  console.log(users, "user");

  return (
    <Box borderRadius={"2xl"} background={"whiteAlpha.900"} w={'3xl'}>
      <TableContainer padding={8} textAlign={'center'} >
        <Table variant='unstyled' >
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Nama</Th>
              <Th >Level Akun</Th>
              <Th>Saldo</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => {
              const no = users.indexOf(user) + 1;
              const student = (user.is_student.toString() === "true" ? "Murid" : "Guru");
              return (
                <Tr>
              <Td>{no}</Td>
              <Td>{user.name}</Td>
              <Td >{student}</Td>
              <Td >{user.balance}</Td>
            </Tr>
              )
            })}
            
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}
