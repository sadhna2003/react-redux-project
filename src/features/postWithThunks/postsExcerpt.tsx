import React from 'react'
import PostAuthor from '../post/postAuthor';
import ReactionButtons from '../post/postReactions';
import PostTime from '../post/postTime';
import PostReactions from '../post/postReactions';

const PostsExcerpt = ({ post }: any) => {
    return (
        <article className="p-4 border border-black rounded-md w-1/2">
            <h3 className="text-3xl font-semibold capitalize">{post.title}</h3>
            <p>{post.body.substring(0, 100)}</p>
            <p className="postCredit">
                <PostAuthor userId={post.userId} />
                <PostTime time={post.date} />
            </p>
            <PostReactions post={post} fromThunk={true} />
        </article>
    )
}
export default PostsExcerpt