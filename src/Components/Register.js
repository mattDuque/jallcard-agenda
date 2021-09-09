import React from 'react'
import {
    Card, CardContent, TextField,
    Button, FormControl
} from '@material-ui/core'
import { auth, createUserWithEmailAndPassword } from '../firebase'
import { useStateValue } from '../StateProvider'
import { actionTypes } from '../reducer'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import './Styles/Register.css'

const registerSchema = yup.object().shape({
    userEmail: yup.string().email().required('Email deve ser válido'),
    password: yup.string().min(8).max(30).required(),
    passwordConfirm: yup.string().oneOf([yup.ref("password"), null]).required(),
})

function Regsiter(props) {

    const [state, dispatch] = useStateValue()
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(registerSchema)
    });

    function onSubmit(data) {
        createUserWithEmailAndPassword(auth, data.userEmail, data.password)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl className="register__field">
                            <TextField
                                {...register("userEmail")}
                                name="userEmail"
                                label="Email"
                                variant="outlined"
                                error={errors.userEmail?.message}
                                helperText={errors.userEmail?.message && "Email deve ser válido"}
                            />
                        </FormControl>
                        <FormControl className="register__field">
                            <TextField
                                {...register("password")}
                                name="password"
                                variant="outlined"
                                type="password"
                                label="Senha"
                                error={errors.password?.message}
                                helperText={errors.password?.message && "Senha deve ter no mínimo 8 caracteres"}
                            />
                        </FormControl>
                        <FormControl className="register__field">
                            <TextField
                                {...register("passwordConfirm")}
                                name="passwordConfirm"
                                label="Confirme a senha"
                                variant="outlined"
                                type="password"
                                error={errors.passwordConfirm?.message}
                                helperText={errors.passwordConfirm?.message && "Senhas devem ser identicas"}
                            />
                        </FormControl>
                        <Button onClick={() => props.onChange(false)}>Voltar</Button>
                        <Button type="submit" id="submit">Registrar</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Regsiter