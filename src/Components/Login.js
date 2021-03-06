import React, { useState } from 'react'
import {
    Card, CardContent, Button,
    FormControl, TextField
} from '@material-ui/core'
import {
    auth, provider,
    signInWithPopup,
    signInWithEmailAndPassword
} from '../firebase'
import { useStateValue } from '../StateProvider'
import { actionTypes, initialState } from '../reducer'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Register from './Register'
import './Styles/Login.css'

function Login() {

    const [state, dispatch] = useStateValue(initialState)
    const [showRegister, setShowRegister] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const signInPopup = () => {
        signInWithPopup(auth, provider)
            .then((result) => {

                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user
                })

            })
            .catch((error) => {
                alert(error.message)
            })
    }

    const signInEmail = () => {
        signInWithEmailAndPassword(auth, email, password)

            .then((result) => {
                console.log(result.user.email)
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user
                })
            })
            .catch((error) => {
                alert(error.message)
            })
    }

    const handleChange = (newValue) => {
        setShowRegister(newValue);
    }

    return (
        <div className="login">
            {!showRegister ? (
                <Card className="login__container">
                    <CardContent className="login__content">
                        <AccountCircleIcon className="login__logo" />
                        <h1> Faça Login na sua agenda</h1>
                        <form>
                            <FormControl className="login__email">
                                <TextField
                                    onChange={(e) => setEmail(e.target.value)}
                                    id="user-email"
                                    label="Email"
                                    variant="outlined"
                                />
                            </FormControl>
                            <FormControl className="login__password">
                                <TextField
                                    onChange={(e) => setPassword(e.target.value)}
                                    id="password"
                                    label="Senha"
                                    variant="outlined"
                                    type="password"
                                />
                            </FormControl>
                        </form>
                        <Button className="login__button" onClick={signInPopup}>Entrar com Google</Button>
                        <Button className="login__button" onClick={signInEmail}>Entrar com Email</Button>
                        <p onClick={() => { setShowRegister(true) }}>criar conta</p>
                    </CardContent>
                </Card>
            ) : (
                <Register onChange={handleChange} />
            )}

        </div>
    )
}

export default Login