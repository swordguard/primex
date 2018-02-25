import React from 'react'

export default class Button extends React.Component {

    render() {
        const { title, onClick, type, align, enable } = this.props
        const clzName = (type === "save" || type === "new") ? "save-button" : "cancel-button"
        const clzNameDisabled = (type === "save" || type === "new") ? "save-button disabled" : "cancel-button disabled"
        const style = {
            textAlign: align ? align : ''
        }

        return (
            <div className="button" style={style}>
                {enable === null || enable === undefined ?
                    <button onClick={onClick} className={clzName} >
                        {title ? title : "Save"}
                    </button>
                    :
                    <button onClick={onClick} className={enable ? clzName : clzNameDisabled} disabled={!enable}>
                        {title ? title : "Save"}
                    </button>
                }

            </div>
        )
    }
}