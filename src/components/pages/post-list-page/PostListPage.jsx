import React from 'react'
import Header from "../../header/Header";
import Button from "../../buttons/Button";
import PostList from "./post-list/PostList";

export default class PostListPage extends React.Component {

    render() {
        const { postList, onEditClick, onDeleteClick, onCreateClick } = this.props

        return (
                <div className="post-page">
                    <Header title="Posts"/>
                    <div className="post-page-neck">
                        <div className="neck-button">
                            <Button title="Create Post" type="new" onClick={onCreateClick}/>
                        </div>

                    </div>
                    <PostList postList={postList} onEditClick={onEditClick} onDeleteClick={onDeleteClick}/>
                </div>
        )
    }
}