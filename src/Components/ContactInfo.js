import React from 'react'
import './Styles/ContactInfo.css'

function ContactInfo(props) {

    return (
        <div className="contactInfo__container">
            <div className="contactInfo__content">
                <h3>Detalhes do contato</h3>
                <div className="contactInfo__fields">
                    <h4>Nome:</h4>
                    <span>{props.data?.name}</span>
                </div>
                <div className="contactInfo__fields">
                    <h4>Sobrenome:</h4>
                    <span>{props.data?.lastName}</span>
                </div>
                <div className="contactInfo__fields">
                    <h4>Data de nascimento:</h4>
                    <span>{props.data?.birthdate}</span>
                </div>
                <div className="contactInfo__fields">
                    <h4>Telefone:</h4>
                    <span>{props.data?.phone}</span>
                </div>
                <div className="contactInfo__fields">
                    <h4> 2º Telefone:</h4>
                    <span>{props.data?.phone2}</span>
                </div>
                <div className="contactInfo__fields">
                    <h4>Grau de parentesco:</h4>
                    <span>{props.data?.relative}</span>
                </div>
            </div>
        </div>
    )
}

export default ContactInfo
