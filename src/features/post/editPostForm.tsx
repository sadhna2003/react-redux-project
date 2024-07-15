import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdd } from "./postSlice";
import { selectAllUser } from "../users/userSlice";
import { addNewPost, selectPostById, editPost, deletePost } from "../postWithThunks/postThunkSlice";
import { useParams, useNavigate } from "react-router-dom";
const EditPostForm = ({ fromThunk = false }: { fromThunk: boolean }) => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const post = useSelector((state: any) => selectPostById(state, Number(postId)));
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.body);
    const [userId, setUserId] = useState(post.userId);
    const [addRequestStatus, setAddRequestStatus] = useState('idle');
    const users = useSelector(selectAllUser);
    const dispatch = useDispatch<any>();

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
            dispatch(editPost({ id: post.id, title, body: content, userId, reactions: post.reactions }));
            setTitle('');
            setContent('');
            setUserId('');
            setAddRequestStatus('idle');
            navigate(`/post/${postId}`);
        }
    }

    const onDeletePostClicked = () => {
        try {
            setAddRequestStatus('pending')
            dispatch(deletePost({ id: post.id })).unwrap()

            setTitle('')
            setContent('')
            setUserId('')
            navigate('/')
        } catch (err) {
            console.error('Failed to delete the post', err)
        } finally {
            setAddRequestStatus('idle')
        }
    }

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

    if (!post) {
        return (
            <section className="flex flex-col w-full justify-center items-center py-3 gap-3">
                <h2 className="text-5xl font-medium">Post Not Found</h2>
            </section>
        )
    }
    return (
        <section className="flex flex-col w-full justify-center items-center py-3 gap-3">
            <h2 className="text-5xl font-medium">Edit Post</h2>
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
                {/* <button className="p-4 my-2 bg-slate-500 border border-black"
                    type="button"
                    onClick={onDeletePostClicked}
                >
                    Delete Post
                </button> */}
            </form>
        </section>
    )
}

export default EditPostForm;