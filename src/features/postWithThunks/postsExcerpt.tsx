import React from 'react'
import PostAuthor from '../post/postAuthor';
import ReactionButtons from '../post/postReactions';
import PostTime from '../post/postTime';
import PostReactions from '../post/postReactions';
import { Link, useNavigate } from 'react-router-dom';
import { deletePost } from "./postThunkSlice";
import { useSelector, useDispatch } from "react-redux";
const PostsExcerpt = ({ post }: any) => {
    // console.log(post,"post");
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const onDelete = () => {
        if (post) {
            dispatch(deletePost({ id: post.id }));
            navigate('/');
        }
    }
    return (
        <article className="p-4 border border-violet-300 rounded-md w-1/2 ">
            {/* <h3 className="text-3xl font-semibold capitalize">{post.title}</h3> */}
            <div className="flex flex-row justify-between">
                <h3 className="text-3xl font-semibold capitalize">{post.title}</h3>
                <span>
                    <button 
                    // className="bg-violet-500 rounded-md text-xl py-1 px-2"
                    type="button"
                    onClick={onDelete}
                    title='Delete Post'
                    >
                        {"\u22EE"}
                    </button>
                </span>
                </div>
            <p>{post.body.substring(0, 100)}</p>
            <p className="postCredit">
                <Link to={`/post/${post.id}`} className="text-blue-500 hover:underline italic">view post</Link>
                <PostAuthor userId={post.userId} />
                <PostTime time={post.date} />
            </p>
            <PostReactions post={post} fromThunk={true} />
        </article>
    )
}
export default PostsExcerpt