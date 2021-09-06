import React from 'react'
import {
    TextField, Button, IconButton,
    FormControl, InputLabel,
    Select, MenuItem
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MaskedInput from 'react-text-mask';
import PropTypes from "prop-types";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useHistory } from 'react-router-dom'
import * as yup from 'yup'
import './Styles/ContactCreate.css'

const schema = yup.object().shape({
    name: yup.string().required(),
    lastName: yup.string().required(),
    phone: yup.string().min(11).required(),
    birthdate: yup.string().min(8).required(),
    relative: yup.number().integer().nullable(true)
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
    const [relative, setRelative] = React.useState(0);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const handleChange = (event) => {
        setRelative(event.target.value);
    };

    const onSubmit = (e) => {
        console.log(e)
        /*props.onChange(false)*/
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
                        <InputLabel className="MuiInputLabel-outlined">Parentesco</InputLabel>
                        <Select
                            {...register("relative")}
                            name="relative"
                            label="parentesco"
                            variant="outlined"
                            value={relative}
                            onChange={handleChange}
                        >
                            <MenuItem value={0}>Nenhum</MenuItem>
                            <MenuItem value={1}>Pai</MenuItem>
                            <MenuItem value={2}>Mãe</MenuItem>
                            <MenuItem value={3}>Tio(a)</MenuItem>
                            <MenuItem value={4}>Irmã(o)</MenuItem>
                            <MenuItem value={5}>Avós</MenuItem>
                            <MenuItem value={6}>Outro</MenuItem>
                        </Select>

                    </FormControl>
                    <Button type="submit" id="submit">Salvar</Button>
                </form>
            </div>
        </div>
    )
}

export default ContactCreate