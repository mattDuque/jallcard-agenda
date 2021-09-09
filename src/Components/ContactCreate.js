import React from 'react'
import {
    TextField, Button, IconButton,
    FormControl, InputLabel,
    Select, MenuItem
} from '@material-ui/core'
import { useStateValue } from '../StateProvider'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useHistory } from 'react-router-dom'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import MaskedInput from 'react-text-mask'
import PropTypes from "prop-types"
import axios from '../axios'
import * as yup from 'yup'
import './Styles/ContactCreate.css'

const schema = yup.object().shape({
    name: yup.string().required(),
    lastName: yup.string().required(),
    phone: yup.string().min(11).required(),
    phone2: yup.string(),
    birthdate: yup.string().min(8).required(),
    relative: yup.string()
})
function PhoneMask(props) {

    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={ref => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={"\u2000"}
            guide
            keepCharPositions
        />
    );
}
function BirthdateMask(props) {

    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={ref => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={"\u2000"}
            guide
            keepCharPositions
        />
    );
}

BirthdateMask.propTypes = {
    inputRef: PropTypes.func.isRequired
};

PhoneMask.propTypes = {
    inputRef: PropTypes.func.isRequired
};

function ContactCreate(props) {

    const history = useHistory()
    const [{ user }] = useStateValue()
    const [relative, setRelative] = React.useState('Nenhum');
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const handleChange = (event) => {
        setRelative(event.target.value);
    };

    const onSubmit = (data) => {
        axios.post('/contact/create', {
            user: user.email,
            data: data,
            token: user.accessToken
        })
            .then(response => {
                console.log(response)
            })
        props.onChange()
        history.push('/')
    }

    return (
        <div className="contactCreate">
            <div className="contactCreate__header">
                <Link to="/">
                    <div className="contactCreate__back">
                        <IconButton><ArrowBackIcon /></IconButton>
                    </div>
                </Link>
                <div className="contactCreate__picture">
                    <span></span>
                </div>
            </div>
            <div className="contactCreate__content">

                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl className="contactCreate__field">
                        <TextField
                            {...register("name")}
                            name="name"
                            label="Nome"
                            variant="outlined"
                            error={errors.name?.message}
                            helperText={errors.name?.message && "Nome é obrigatório"}
                        />
                    </FormControl>
                    <FormControl className="contactCreate__field">
                        <TextField
                            {...register("lastName")}
                            name="lastName"
                            label="Sobrenome"
                            variant="outlined"
                            error={errors.lastName?.message}
                            helperText={errors.lastName?.message && "Sobrenome é obrigatório"}
                        />
                    </FormControl>
                    <FormControl className="contactCreate__field">
                        <TextField
                            {...register("birthdate")}
                            name="birthdate"
                            label="Data de nascimento"
                            variant="outlined"
                            error={errors.birthdate?.message}
                            helperText={errors.birthdate?.message && "Data de nascimento é obrigatória"}
                            InputProps={{
                                inputComponent: BirthdateMask
                            }}
                        />
                    </FormControl>
                    <FormControl className="contactCreate__field">
                        <TextField
                            {...register("phone")}
                            name="phone"
                            label="Telefone"
                            variant="outlined"
                            error={errors.phone?.message}
                            helperText={errors.phone?.message && "Número de telefone é obrigatório"}
                            InputProps={{
                                inputComponent: PhoneMask
                            }}
                        />
                    </FormControl>
                    <FormControl className="contactCreate__field">
                        <TextField
                            {...register("phone2")}
                            name="phone2"
                            label="2º Telefone"
                            variant="outlined"
                            error={errors.phone2?.message}
                            helperText={errors.phone2?.message}
                            InputProps={{
                                inputComponent: PhoneMask
                            }}
                        />
                    </FormControl>
                    <FormControl className="contactCreate__field">
                        <InputLabel className="MuiInputLabel-outlined">Parentesco</InputLabel>
                        <Select
                            {...register("relative")}
                            name="relative"
                            label="parentesco"
                            variant="outlined"
                            value={relative}
                            onChange={handleChange}
                        >
                            <MenuItem value={"Nenhum"}>Nenhum</MenuItem>
                            <MenuItem value={"Pai"}>Pai</MenuItem>
                            <MenuItem value={"Mãe"}>Mãe</MenuItem>
                            <MenuItem value={"Tio(a)"}>Tio(a)</MenuItem>
                            <MenuItem value={"Irmã(o)"}>Irmã(o)</MenuItem>
                            <MenuItem value={"Avós"}>Avós</MenuItem>
                            <MenuItem value={"Outro"}>Outro</MenuItem>
                        </Select>

                    </FormControl>
                    <Button type="submit" id="submit">Salvar</Button>
                </form>
            </div>
        </div>
    )
}

export default ContactCreate