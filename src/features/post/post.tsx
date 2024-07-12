import { useDispatch,useSelector } from "react-redux";
import { selectAllPost } from "./postSlice";
import PostAuthor from "./postAuthor";
import PostTime from "./postTime";
import PostReactions from "./postReactions";
 const Post =()=>{
    // const posts = useSelector((state: any) => state.posts);
    const posts = useSelector(selectAllPost);
    const dispatch = useDispatch();
    const orderedPosts = posts.slice().sort((a: any, b: any) => b.date.localeCompare(a.date));
    const renderPost = orderedPosts.map((post: any) => 
    {
        return (
            <article key={post.id} className="p-4 border border-black rounded-md w-1/2">
                <h1 className="text-3xl font-semibold">{post.title}</h1>
                <p className="text-lg">{post.content}</p>
                 <p>
                    <PostAuthor userId={post.userId} />
                    <PostTime time={post.date} />
                </p>
                <PostReactions post={post} />
            </article>
        )
    }
    );
    return (
        <section className="flex flex-col w-full justify-center items-center py-3 gap-3">
            <h2 className="text-5xl font-semibold">Posts</h2>
            {renderPost}
        </section>
    )
}

export default Post;