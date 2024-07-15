import PostAuthor from "../post/postAuthor";
import PostTime from "../post/postTime";
import PostReactions from "../post/postReactions";
import { selectPostById } from "./postThunkSlice";
import { useSelector, useDispatch } from "react-redux";
const SinglePost = ({ postId }: { postId: string }) => {
    const post = useSelector((state: any) => selectPostById(state, postId));

    if(!post) {
        return (
            <div>Post Not Found</div>
        )
    }
    return (
        <article className="p-4 border border-black rounded-md w-1/2">
        <h3 className="text-3xl font-semibold capitalize">{post.title}</h3>
        <p>{post.body.substring(0, 100)}</p>
        <p className="postCredit">
            <PostAuthor userId={post.userId} />
            <PostTime timestamp={post.date} />
        </p>
        <PostReactions post={post} fromThunk={true} />
    </article>
    )
}
export default SinglePost;