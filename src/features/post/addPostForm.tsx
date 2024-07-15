import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdd } from "./postSlice";
import { selectAllUser } from "../users/userSlice";
const AddPostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    const users = useSelector(selectAllUser);
    const dispatch = useDispatch();

    const onTitleChange = (e: any) => {
        setTitle(e.target.value);
    };

    const onContentChange = (e: any) => {
        setContent(e.target.value);
    }

    const onAuthorChange = (e: any) => {
        setUserId(e.target.value);
    }
    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(postAdd(title, content, userId));
            setTitle('');
            setContent('');
            setUserId('');
        }
    }

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId);
    return (
        <section className="flex flex-col w-full justify-center items-center py-3 gap-3">
            <h2 className="text-5xl font-medium">Add Post</h2>
            <form className="flex flex-col w-1/2">
                <label>Title</label>
                <input
                    id="postTitle"
                    name="postTitle"
                    type="text"
                    value={title}
                    onChange={onTitleChange}
                    className="border border-black rounded-md px-2 py-2"
                />
                <label>Author</label>
                <select
                    id="postAuthor"
                    name="postAuthor"
                    value={userId}
                    onChange={onAuthorChange}
                    className="border border-black rounded-md py-2 px-2"
                >
                    <option value="">Select User</option>
                    {users.map((user: any) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
                <label>Content</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChange}
                    className="border border-black rounded-md px-2 py-2"
                />
                <button className="p-4 my-2 bg-slate-500 border border-black"
                    disabled={!canSave}
                    type="button"
                    onClick={onSavePostClicked}>
                    Add
                </button>
            </form>
        </section>
    )
}

export default AddPostForm;