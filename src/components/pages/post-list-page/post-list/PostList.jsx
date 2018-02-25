import React from 'react'
import PostListItem from "./post-list-item/PostListItem";

export default class PostList extends React.Component {

    render() {
        const { postList, onEditClick, onDeleteClick } = this.props

        return (
            <div className="post-list">
                {postList ? postList.map((post, id) => {
                    return <PostListItem key={id}
                        post={post}
                        onEditClick={onEditClick}
                        onDeleteClick={onDeleteClick}
                    />
                })
                : null}
            </div>
        )
    }
}