import React, { useState } from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ContactInfo from './ContactInfo';
import ContactEdit from './ContactEdit';
import { Link, useHistory, useParams } from 'react-router-dom'
import {
    IconButton, Button,
    Dialog, DialogActions,
    DialogTitle
} from '@material-ui/core';
import './Styles/Contact.css'

function Contact() {

    const history = useHistory()
    const { contactId } = useParams()
    const [editMode, setEditMode] = useState(false)
    const [saveDialogOpen, setSaveDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [buttonText, setButtonText] = useState("Editar")

    const handleClickEdit = () => {

        if (editMode) {
            setSaveDialogOpen(true)
        } else {
            setEditMode(true)
            setButtonText("Cancelar")
        }
    }

    const handleSave = (arg) => {
        if (arg) {
            setSaveDialogOpen(false)
            setButtonText("Editar")
            setEditMode(false)
        } else {
            setSaveDialogOpen(false)
        }
    }

    const handleDelete = (arg) => {
        if (arg) {
            setDeleteDialogOpen(false)
            history.push('/')
            /* remove from db*/
        } else {
            setDeleteDialogOpen(false)
        }
    }

    const handleChange = (newValue) => {
        setEditMode(newValue)
        setButtonText("Editar")
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
                    <span>A</span>
                </div>
                <div className="contact__name"><span>name</span></div>
                <div className="contact__options">
                    <Button
                        className="contact__button"
                        onClick={handleClickEdit}
                    >{buttonText}
                    </Button>
                    <Button
                        className="contact__button"
                        onClick={() => { setDeleteDialogOpen(true) }}
                    >Deletar
                    </Button>
                </div>
            </div>
            <div className="contact__body">
                {editMode ? (
                    <>
                        <Dialog open={saveDialogOpen}>
                            <DialogTitle>
                                Desacartar mudanças?
                            </DialogTitle>
                            <DialogActions>
                                <Button onClick={() => { handleSave(false) }} color="primary">
                                    Não
                                </Button>
                                <Button onClick={() => { handleSave(true) }} color="primary" autoFocus>
                                    Sim
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <ContactEdit onChange={handleChange} />
                    </>

                ) : (
                    <ContactInfo />
                )}
                <Dialog open={deleteDialogOpen}>
                    <DialogTitle>
                        Dejeasa deletar contato?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={() => { handleDelete(false) }} color="primary">
                            Não
                        </Button>
                        <Button onClick={() => { handleDelete(true) }} color="primary" autoFocus>
                            Sim
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default Contact
