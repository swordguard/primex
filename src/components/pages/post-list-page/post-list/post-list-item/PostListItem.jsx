import React  from 'react';
import Button from "../../../../buttons/Button";

export default class PostListItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            buttonVisibility: 'hidden'
        }
        this.onMouseOver = this.onMouseOver.bind(this)
        this.onMouseOut = this.onMouseOut.bind(this)
    }
    onMouseOver() {
        this.setState({
            buttonVisibility: 'visible'
        })
    }

    onMouseOut() {
        this.setState({
            buttonVisibility: 'hidden'
        })
    }

    render() {
        const { post, onEditClick, onDeleteClick } = this.props
        const floatRight = {
            float: 'right',
            visibility: this.state.buttonVisibility,
        }

        return (
            <div className="post-list-item" onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
                <div className="item-inner">{post.id}</div>
                <div className="item-inner">{post.title}</div>
                <div className="item-inner-buttons">
                    <div style={floatRight} >
                        <Button title="Edit Post" onClick={() => onEditClick(post.id)}/>
                        <Button title="Delete Post" onClick={() => onDeleteClick(post.id)}/>
                    </div>

                </div>


            </div>
        )
    }
}