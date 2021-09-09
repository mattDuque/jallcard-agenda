import React from 'react'
import {
    Table, TableBody,
    TableCell, TableContainer,
    TableHead, TableRow,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import './Styles/ContactList.css'

function ContactsList(props) {

    const history = useHistory()

    const handleClick = (id) => {
        history.push(`/contact/${id}`)
    }
    return (
        <>
            <TableContainer>
                <Table stickyHeader aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="sticky-cell" align="left">Nome</TableCell>
                            <TableCell className="sticky-cell" align="left">Sobrenome</TableCell>
                            <TableCell className="sticky-cell" align="left">Data de nascimento</TableCell>
                            <TableCell className="sticky-cell" align="left"> Número de telefone</TableCell>
                            <TableCell className="sticky-cell" align="left">Grau de Parentesco</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.data?.map((e) => (
                            <TableRow onClick={() => handleClick(e._id)} key={e._id}>
                                <TableCell>{e.name}</TableCell>
                                <TableCell>{e.lastName}</TableCell>
                                <TableCell>{e.birthdate}</TableCell>
                                <TableCell>{e.phone}</TableCell>
                                <TableCell>{e.relative}</TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>

        </>
    )
}

export default ContactsList