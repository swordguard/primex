import React from 'react'

export default class Header extends React.Component {

    render() {
        const { title } = this.props

        return (
            <div className="post-header">
                <div className="post-header-inline">{title}</div>
            </div>
        )
    }
}