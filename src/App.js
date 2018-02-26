import React, { Component } from 'react';
import './App.css';
import CreateEditPostPage from "./components/pages/create-edit-post-page/CreateEditPostPage";
import PostListPage from "./components/pages/post-list-page/PostListPage";

class App extends Component {
    constructor(props) {
        super(props)
        const postList = [
            {
                id: 1,
                title: "My First Post title",
                body: "My First Post Body",
            },
            {
                id: 2,
                title: "Another Post title",
                body: "Another Post Body",
            },
            {
                id: 3,
                title: "And another",
                body: "And another",
            },
            {
                id: 4,
                title: "And another",
                body: "And another",
            },
        ]

        this.state = {
            createEditFormVisible: false,
            createEditFormTitle: '',
            postList: postList,
            title: '',
            body: '',
            id: '',
        }
        this.onDeleteClick = this.onDeleteClick.bind(this)
        this.onEditClick = this.onEditClick.bind(this)
        this.onCreateClick = this.onCreateClick.bind(this)
        this.onSaveClick = this.onSaveClick.bind(this)
        this.onCancelClick = this.onCancelClick.bind(this)
        this.onTitleChange = this.onTitleChange.bind(this)
        this.onBodyChange = this.onBodyChange.bind(this)
    }

    onDeleteClick(id) {
        if (window.confirm("Do you really want to delete post #" + id + "?")) {
            const { postList } = this.state
            postList.splice(this.findIndexById(id), 1)
            this.setState({
                postList: postList
            })
        }
    }

    findPostById(id) {
        const { postList } = this.state
        for (let p of postList) {
            if (p.id === id) {
                return p
            }
        }
    }
    findIndexById(id) {
        const { postList } = this.state
        for (let i = 0; i < postList.length; i++) {
            if (postList[i].id === id) {
                return i
            }
        }
    }
    onEditClick(idx) {
        let post = this.findPostById(idx)
        this.setState({
            createEditFormTitle: 'Edit Post: ' + post.title,
            title: post.title,
            body: post.body,
            id: idx
        }, function () {
            this.setState({
                createEditFormVisible: true,
            })
        })
    }
    onCreateClick() {
        this.setState({
            createEditFormVisible: true,
            createEditFormTitle: 'Create Post',
        })
    }

    onCancelClick() {
        this.setState({
            createEditFormVisible: false,
            title: '',
            body: '',
            id: '',
        })
    }

    onSaveClick() {
        const { postList, title, body, id } = this.state

        const newPost = {
            title: title,
            body: body,
            id: postList.length > 0 ? postList[postList.length - 1].id + 1 : 1
        }
        if (id === '') {
            postList.push(newPost)
        } else {
            postList.map(function (post) {
                if (post.id === id) {
                    post.title = title
                    post.body = body
                }
                return true
            })
        }

        this.setState({
            postList: postList
        }, function () {
            this.setState({
                createEditFormVisible: false,
                title: '',
                body: '',
                id: '',
            })
        })
    }

    onTitleChange(e) {
        this.setState({
            title: e.target.value,
        })
    }

    onBodyChange(e) {
        this.setState({
            body: e.target.value,
        })
    }

    render() {
        const { createEditFormVisible, createEditFormTitle, postList, title, body } = this.state
        return (
            <div className="App">
                { createEditFormVisible ?
                    <CreateEditPostPage
                        onCreateClick={this.onCreateClick}
                        onCancelClick={this.onCancelClick}
                        onTitleChange={(e)=>this.onTitleChange(e)}
                        onBodyChange={(e)=>this.onBodyChange(e)}
                        onSaveClick={this.onSaveClick}
                        title={createEditFormTitle}
                        saveButtonEnabled={title.trim() !== '' && body.trim() !== ''}
                        initialTitle={title}
                        initialBody={body}
                    />
                    :
                    <PostListPage
                        postList={postList}
                        onCreateClick={this.onCreateClick}
                        onEditClick={this.onEditClick}
                        onDeleteClick={this.onDeleteClick}
                    />
                }
            </div>
        );
    }
}

export default App;
