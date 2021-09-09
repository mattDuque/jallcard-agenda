import React from 'react'
import {
    TextField, Button,
    FormControl, InputLabel,
    Select, MenuItem
} from '@material-ui/core'
import { useStateValue } from '../StateProvider'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import MaskedInput from 'react-text-mask'
import PropTypes from "prop-types"
import axios from '../axios'
import * as yup from 'yup'
import './Styles/ContactEdit.css'

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

function ContactEdit(props) {

    const [{ user }] = useStateValue()
    const [name, setName] = React.useState(props.data?.name);
    const [lastName, setLastName] = React.useState(props.data?.lastName);
    const [birthdate, setBirthdate] = React.useState(props.data?.birthdate);
    const [phone, setPhone] = React.useState(props.data?.phone);
    const [phone2, setPhone2] = React.useState(props.data?.phone2);
    const [relative, setRelative] = React.useState(props.data?.relative);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const handleChange = (event) => {
        switch (event.target.name) {
            case "name":
                return setName(event.target.value);
            case "lastName":
                return setLastName(event.target.value);
            case "birthdate":
                return setBirthdate(event.target.value);
            case "phone":
                return setPhone(event.target.value);
            case "phone2":
                return setPhone2(event.target.value);
            case "relative":
                return setRelative(event.target.value);
            default:
                return 0

        }
    }
    const onSubmit = (data) => {

        axios.put('/contacts/update', {
            id: props.data._id,
            user: user.email,
            data: data,
            token: user.accessToken
        })
            .catch(response => {
                console.log(response)
            })
        props.onChange(false)
    }

    return (
        <div className="contactEdit">
            <div className="contactEdit__content">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl className="contactEdit__field">
                        <TextField
                            {...register("name")}
                            name="name"
                            label="Nome"
                            variant="outlined"
                            value={name}
                            onChange={handleChange}
                            error={errors.name?.message}
                            helperText={errors.name?.message && "Nome é obrigatório"}
                        />
                    </FormControl>
                    <FormControl className="contactEdit__field">
                        <TextField
                            {...register("lastName")}
                            name="lastName"
                            label="Sobrenome"
                            variant="outlined"
                            value={lastName}
                            onChange={handleChange}
                            error={errors.lastName?.message}
                            helperText={errors.lastName?.message && "Sobrenome é obrigatório"}
                        />
                    </FormControl>
                    <FormControl className="contactEdit__field">
                        <TextField
                            {...register("birthdate")}
                            name="birthdate"
                            label="Data de nascimento"
                            variant="outlined"
                            value={birthdate}
                            onChange={handleChange}
                            error={errors.birthdate?.message}
                            helperText={errors.birthdate?.message && "Data de nascimento é obrigatória"}
                            InputProps={{
                                inputComponent: BirthdateMask
                            }}
                        />
                    </FormControl>
                    <FormControl className="contactEdit__field">
                        <TextField
                            {...register("phone")}
                            name="phone"
                            label="Telefone"
                            variant="outlined"
                            value={phone}
                            onChange={handleChange}
                            error={errors.phone?.message}
                            helperText={errors.phone?.message && "Número de telefone é obrigatório"}
                            InputProps={{
                                inputComponent: PhoneMask
                            }}
                        />
                    </FormControl>
                    <FormControl className="contactEdit__field">
                        <TextField
                            {...register("phone2")}
                            name="phone2"
                            label="2º Telefone"
                            variant="outlined"
                            value={phone2}
                            onChange={handleChange}
                            error={errors.phone2?.message}
                            helperText={errors.phone2?.message && "Número de telefone é obrigatório"}
                            InputProps={{
                                inputComponent: PhoneMask
                            }}
                        />
                    </FormControl>
                    <FormControl className="contactEdit__field">
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
                    <Button type="submit" id="submit" onClick={handleSubmit(onSubmit)}>Salvar</Button>
                </form>
            </div>
        </div>
    )
}

export default ContactEdit