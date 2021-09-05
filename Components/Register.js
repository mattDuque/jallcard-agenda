import React, { useState } from 'react'
import {
    Card, CardContent, TextField,
    Button, FormControl
} from '@material-ui/core'
import { auth, createUserWithEmailAndPassword } from '../firebase'
import { useStateValue } from '../StateProvider'
import { actionTypes } from '../reducer'
import './Styles/Register.css'

function Regsiter(props) {

    const [state, dispatch] = useStateValue()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [passwordConfirm, setPasswordConfirm] = useState()
    const [passwordCheck, setPasswordCheck] = useState()

    function handleSubmit(e) {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch({
                    type: actionTypes.SET_USER,
                    user: user
                })
                props.onChange(false)
            })
            .catch((error) => {
                alert(error)
            });
    }

    return (
        <div className="register">
            <Card className="register__container">
                <CardContent className="register__content">
                    <p>Crie sua conta</p>
                    <form>
                        <FormControl className="register__field">
                            <TextField
                                onChange={(e) => setEmail(e.target.value)}
                                id="user-email"
                                label="Email"
                                variant="outlined"
                            />
                        </FormControl>
                        <FormControl className="register__field">
                            <TextField
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                label="Senha"
                                variant="outlined"
                                type="password"
                            />
                        </FormControl>
                        <FormControl className="register__field">
                            <TextField
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                id="password-confirm"
                                label="Confirme a senha"
                                variant="outlined"
                                type="password"
                            />
                        </FormControl>
                    </form>
                    <Button disabled={passwordCheck} onClick={handleSubmit}>Registrar</Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default Regsiter