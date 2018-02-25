import React from 'react'
import Input from "../../../inputs/Input";
import Button from "../../../buttons/Button";

export default class CreateEditForm extends React.Component {

    render() {
        const { onCancelClick, onSaveClick, onTitleChange, onBodyChange, initialTitle, initialBody,
            saveButtonEnabled} = this.props

        return (
        <div>
            <div className="post-create-edit-form">
                <div className="input-title">
                    Title
                    <Input type="text" onChange={onTitleChange} initialValue={initialTitle}/>
                </div>
                <div className="input-body">
                    Body
                    <Input type="textarea" onChange={onBodyChange} initialValue={initialBody}/>
                </div>

            </div>
            <div className="create-edit-post-buttons">
                <Button  onClick={onCancelClick} title="Cancel"/>
                <Button  onClick={onSaveClick} title="Save Post" type="save" enable={saveButtonEnabled}/>
            </div>
        </div>

        )
    }
}