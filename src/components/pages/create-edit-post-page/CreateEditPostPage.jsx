import React from 'react'
import Header from "../../header/Header";
import CreateEditForm from "./create-edit-post-form/CreateEditForm";

export default class CreateEditPostPage extends React.Component {

    render() {
        const { title, onCancelClick, onSaveClick, onTitleChange, onBodyChange, initialTitle, initialBody,
            saveButtonEnabled} = this.props

        return (
            <div className="create-edit-post-page">
                <Header title={title}/>
                <CreateEditForm
                    onCancelClick={onCancelClick}
                    onTitleChange={onTitleChange}
                    onBodyChange={onBodyChange}
                    initialTitle={initialTitle}
                    initialBody={initialBody}
                    onSaveClick={onSaveClick}
                    saveButtonEnabled={saveButtonEnabled}
                />

            </div>
        )
    }
}