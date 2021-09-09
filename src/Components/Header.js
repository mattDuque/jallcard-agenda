import React from 'react'
import {
    Search, Add,
    AccountCircle
} from '@material-ui/icons'
import { useStateValue } from '../StateProvider'
import { actionTypes } from '../reducer'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import './Styles/Header.css'

function Header() {

    const [state, dispatch] = useStateValue()
    return (
        <div className="header">
            <Link to='/'>
                <AccountCircle className="header__logo" />
                <h3 className="header__text">Contatos</h3>
            </Link>

            <div className="header__search">
                <Search className="header__searchIcon" />
                <input
                    className="header__searchInput"
                    type="text" />
            </div>
            <Link to="/create">
                <Button className="header__button">
                    <Add />
                    <p className="header__buttonText">Criar Contato</p>
                </Button>
            </Link>
            <Link to='/'>
                <Button className="header__button" onClick={() => {
                    dispatch({
                        type: actionTypes.SET_USER,
                        user: null
                    })
                }}>
                    <p className="header__buttonText">Sair</p>
                </Button>
            </Link>

            <AccountCircle className="header__user" />
        </div>
    )
}

export default Header