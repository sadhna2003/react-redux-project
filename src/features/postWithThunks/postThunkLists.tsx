import { useDispatch,useSelector,} from "react-redux";
import { useEffect, useState } from "react";
import { selectAllPosts, fetchPosts,getPostsError,getPostsStatus} from "./postThunkSlice";
import PostsExcerpt from "./postsExcerpt";


 const PostThunkLists =()=>{
    // const posts = useSelector((state: any) => state.posts);
    const dispatch = useDispatch<any>();

    const posts = useSelector(selectAllPosts);
    const postStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch])

    let content;
    if (postStatus === 'loading') {
        content = <p>"Loading..."</p>;
    } else if (postStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((a: any, b:any) => b.date.localeCompare(a.date))
        content = orderedPosts.map((post:any) => <PostsExcerpt key={post.id} post={post} />)
    } else if (postStatus === 'failed') {
        content = <p>{error}</p>;
    }
  
    return (
        <section className="flex flex-col w-full justify-center items-center py-3 gap-3">
            {/* <h2 className="text-5xl font-semibold">Posts</h2> */}
            {content}
        </section>
    )
}

export default PostThunkLists;