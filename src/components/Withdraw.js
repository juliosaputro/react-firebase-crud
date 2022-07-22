import React, { useState, useEffect } from 'react'
import db from '../const/firebsae';
import {
    collection,
    getDocs,
    where,
    query,
    onSnapshot,
    updateDoc,
    doc
} from "firebase/firestore"
import {
    Box,
    TableContainer,
    Table,
    Tbody,
    Tr,
    Td,
    Button
} from '@chakra-ui/react'
export default function Withdraw() {
    const [withdraw, setWithdraw] = useState([]);
    const withdrawCollection = collection(db, "money_flow");

    useEffect(() => {
        const getWithdraw = async () => {
            const data = await getDocs(listWithdraw);
            setWithdraw(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        }
        getWithdraw();
    }, []);

    const listWithdraw = query(withdrawCollection, where("is_withdraw", "==", true), where("status", "==", 0))

    onSnapshot(listWithdraw, (snapshot) => {
        const newWithdraw = []
        snapshot.docs.forEach((doc) => {
            newWithdraw.push({ ...doc.data(), id: doc.id })
        })
        // console.log(newWithdraw, 'newWithdraw')
    })


    // update status
    const refreshPage = () => {
        window.location.reload()
    }
    const updateStatus = async (id, status) => {
        const statusDoc = doc(db, "money_flow", id);
        const newStatus = { status: status + 1 }
        await updateDoc(statusDoc, newStatus)
        refreshPage()
    }
    //user
    const [users, setUsers] = useState([])
    const userCollection = collection(db, "user")

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(userCollection);
            setUsers(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        }
        getUsers();
    }, []);

    // console.log(withdraw, "withdraw");


    return (
        <Box borderRadius={"2xl"} background={"whiteAlpha.900"} >
            <h6>Withdraw</h6>
            <TableContainer padding={8}>
                <Table variant='simple'>
                    <Tbody>
                        {withdraw.map((wd) => {
                            const tgl = new Date(wd.created_at).toDateString()
                            return (
                                <Tr>
                                    <Td>{wd.amount}</Td>
                                    <Td>{tgl}</Td>
                                    {users.map((usr) => {
                                        if (wd.id_user === usr.id_user) {

                                            return (

                                                <Td>{usr.name}</Td>
                                            )
                                        }
                                    })}
                                    <Td><Button onClick={() => { updateStatus(wd.id, wd.status) }} colorScheme={'teal'} size={'md'}>Confirm</Button></Td>
                                </Tr>

                            )
                        })

                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}
