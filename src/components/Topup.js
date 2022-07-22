import React, { useState, useEffect } from 'react'
import db from '../const/firebsae';
import {
    collection,
    getDocs,
    where,
    query,
    onSnapshot,
    doc,
    updateDoc
} from "firebase/firestore"
import {
    Box,
    TableContainer,
    Table,
    Tbody,
    Tr,
    Td,
    Button,
} from '@chakra-ui/react'


export default function Topup() {

    const [topup, setTopup] = useState([]);
    const topupCollection = collection(db, "money_flow");

    useEffect(() => {
        const getTopup = async () => {
            const data = await getDocs(listTopup);
            setTopup(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        }
        getTopup();
    }, []);

    const listTopup = query(topupCollection, where("is_topup", "==", true), where("status", "==", 0))

    onSnapshot(listTopup, (snapshot) => {
        const newTopup = []
        snapshot.docs.forEach((doc) => {
            newTopup.push({ ...doc.data(), id: doc.id })
        })
        console.log(newTopup, 'newtopup')
    })

    console.log(topup, "topup");

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

    return (
        <Box borderRadius={"2xl"} background={"whiteAlpha.900"} >
            <h6>Topup</h6>
            <TableContainer padding={8}>
                <Table variant='simple'>
                    <Tbody>
                        {topup.map((amt) => {
                            const tgl = new Date(amt.created_at).toDateString()
                            console.log(tgl, 'tgl')
                            return (
                                <Tr>
                                    <Td>{amt.amount}</Td>
                                    <Td>{tgl}</Td>
                                    {users.map((usr) => {
                                        if (amt.id_user === usr.id_user) {
                                            return (            
                                                <Td>{usr.name}</Td>
                                            )
                                        }
                                    })}
                                    <Td><Button onClick={() => { updateStatus(amt.id, amt.status) }} colorScheme={'teal'} size={'md'}>Confirm</Button></Td>
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
