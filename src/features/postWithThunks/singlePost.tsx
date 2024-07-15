import PostAuthor from "../post/postAuthor";
import PostTime from "../post/postTime";
import PostReactions from "../post/postReactions";
import { selectPostById } from "./postThunkSlice";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { deletePost } from "./postThunkSlice";
const SinglePost = () => {
    const { postId } = useParams();
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const post = useSelector((state: any) => selectPostById(state, Number(postId)));

    const onDelete = () => {
        if (post) {
            dispatch(deletePost({ id: post.id }));
            navigate('/');
        }
    }

    if (!post) {
        return (
            <div>Post Not Found</div>
        )
    }
    return (
        <div className="p-4 flex flex-row w-full justify-center">
            <article className="p-4 border border-black rounded-md w-2/3">
            <div className="flex flex-row justify-between">
                <h3 className="text-3xl font-semibold capitalize">{post.title}</h3>
                <span>
                    <button 
                    // className="bg-violet-500 rounded-md text-xl py-1 px-2"
                    type="button"
                    onClick={onDelete}
                    title="Delete Post"
                    >
                        {"\u22EE"}
                    </button>
                </span>
                </div>
                <p>{post.body.substring(0, 100)}</p>
                <p className="postCredit">
                    <Link to={`/post/edit/${post.id}`} className="text-blue-500 italic hover:underline">edit post</Link>
                    <PostAuthor userId={post.userId} />
                    <PostTime timestamp={post.date} />
                </p>
                <PostReactions post={post} fromThunk={true} />
            </article>
        </div>
    )
}
export default SinglePost;