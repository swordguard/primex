import React from 'react'

export default class CancelButton extends React.Component {

    render() {
        const { title, onClick } = this.props

        return (
            <div className="cancel-button">
                <button onClick={onClick}>{title ? title : "Cancel"}</button>
            </div>
        )
    }
}