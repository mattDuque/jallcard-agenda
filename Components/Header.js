import React from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import SearchIcon from '@material-ui/icons/Search'
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import './Styles/Header.css'

function Header() {
    return (
        <div className="header">
            <AccountCircleIcon className="header__logo" />
            <h3 className="header__text">Contatos</h3>
            <div className="header__search">
                <SearchIcon className="header__searchIcon" />
                <input
                    className="header__searchInput"
                    type="text" />
            </div>
            <Link to="/create">
                <Button className="header__button">
                    <AddIcon />
                    <p className="header__buttonText">Criar Contato</p>
                </Button>
            </Link>
            <AccountCircleIcon className="header__user" />
        </div>
    )
}

export default Header
