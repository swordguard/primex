import React from 'react'

export default class Input extends React.Component {

    render() {
        const { type, onChange, initialValue } = this.props

        return (
            type === 'textarea' ?
            <div>
                <textarea className="post-textarea" onChange={onChange} defaultValue={initialValue}/>
            </div>
                :
                <div>
                    <input type="text" className="post-input" onChange={onChange} defaultValue={initialValue}/>
                </div>
        )
    }
}