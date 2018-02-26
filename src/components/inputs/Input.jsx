import React from 'react'

export default class Input extends React.Component {

    render() {
        const { type, onChange, initialValue } = this.props

        return (
            type === 'textarea' ?

                <textarea className="post-textarea" onChange={onChange} defaultValue={initialValue}/>

                :

                    <input type="text" className="post-input" onChange={onChange} defaultValue={initialValue}/>

        )
    }
}