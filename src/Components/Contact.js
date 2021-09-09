import React, { useState } from 'react'
import {
    IconButton, Button,
    Dialog, DialogActions,
    DialogTitle
} from '@material-ui/core';
import { Link, useHistory, useParams } from 'react-router-dom'
import { useStateValue } from '../StateProvider'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ContactInfo from './ContactInfo';
import ContactEdit from './ContactEdit';
import axios from '../axios'
import './Styles/Contact.css'

function Contact(props) {

    const history = useHistory()
    const { contactId } = useParams()
    const [{ user }] = useStateValue()
    const [editMode, setEditMode] = useState(false)
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [buttonText, setButtonText] = useState("Editar")

    const currentContact = props.data?.find(obj => obj._id === contactId)

    const handleClickEdit = () => {
        if (editMode) {
            setCancelDialogOpen(true)
        } else {
            setEditMode(true)
            setButtonText("Cancelar")
        }
    }

    const handleEdit = (arg) => {
        if (arg) {
            setCancelDialogOpen(false)
            setButtonText("Editar")
            setEditMode(false)
        } else {
            setCancelDialogOpen(false)
        }
    }

    const handleDelete = (arg) => {
        if (arg) {
            axios.delete('/contacts/delete', {
                headers: {
                    id: currentContact._id,
                    user: user.email,
                    token: user.accessToken,
                }
            }).catch(response => console.log(response))
            setDeleteDialogOpen(false)
            props.onChange()
            history.push('/')
        } else {
            setDeleteDialogOpen(false)
        }
    }

    const handleSave = (newValue) => {
        setEditMode(newValue)
        setButtonText("Editar")
        props.onChange()
    }

    return (
        <div className="contact">
            <div className="contact__header">
                <Link to="/">
                    <div className="contact__back">
                        <IconButton><ArrowBackIcon /></IconButton>
                    </div>
                </Link>
                <div className="contact__picture">
                    <span>{currentContact?.name.charAt(0)}</span>
                </div>
                <div className="contact__name"><span>{currentContact?.name}</span></div>
                <div className="contact__options">
                    <Button
                        className="contact__button"
                        onClick={handleClickEdit}
                    >{buttonText}
                    </Button>
                    <Button
                        className="contact__button"
                        onClick={() => setDeleteDialogOpen(true)}
                    >Deletar
                    </Button>
                </div>
            </div>
            <div className="contact__body">
                {editMode ? (
                    <>
                        <Dialog open={cancelDialogOpen}>
                            <DialogTitle>
                                Desacartar mudanças?
                            </DialogTitle>
                            <DialogActions>
                                <Button onClick={() => { handleEdit(false) }} color="primary">
                                    Não
                                </Button>
                                <Button onClick={() => { handleEdit(true) }} color="primary" autoFocus>
                                    Sim
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <ContactEdit onChange={handleSave} data={currentContact} />
                    </>

                ) : (
                    <ContactInfo data={currentContact} />
                )}
                <Dialog open={deleteDialogOpen}>
                    <DialogTitle>
                        Dejeasa deletar contato?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={() => handleDelete(false)} color="primary" autoFocus>
                            Não
                        </Button>
                        <Button onClick={() => handleDelete(true)} color="primary" >
                            Sim
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default Contact