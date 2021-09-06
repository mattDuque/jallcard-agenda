import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import './Styles/ContactList.css'

function ContactsList() {

    const history = useHistory()

    const handleClick = () => {
        history.push(`/contact/${"id"}`)
    }
    return (
        <>
            <TableContainer component={Paper}>
                <Table stickyHeader aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="sticky-cell" align="left">Nome</TableCell>
                            <TableCell align="left"> Número de telefone</TableCell>
                            <TableCell align="left">Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow onClick={() => handleClick("id")}>
                            <TableCell>asdfasdf</TableCell>
                            <TableCell>asdfasdf</TableCell>
                            <TableCell>asdfasdf</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    )
}

export default ContactsList
