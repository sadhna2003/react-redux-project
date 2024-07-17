import { useSelector } from "react-redux";
import { selectUserById } from "./userSlice";
import { Link, useParams } from "react-router-dom";
import { selectAllPosts } from "../postWithThunks/postThunkSlice";

const UserPage = () => {
    const { userId } = useParams();
    const user = useSelector((state: any) => selectUserById(state, Number(userId)));
    const userPosts = useSelector((state: any) => {
        const allPost = selectAllPosts(state);
        return allPost.filter((post: any) => post.userId === Number(userId))
    })

    const postTitles = userPosts.map((post: any) => (
        <li key={post.id} className="w-1/2 border border-violet-400 rounded-md p-2 flex flex-row justify-center hover:bg-violet-300 hover:underline hover:text-white">
            <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
    ));


    return (
        <section className="flex flex-col items-center w-full justify-center py-4">
            <div className="text-center border border-violet-400 py-1 w-1/2 rounded-md">
                <img
                    src="/usericon.jpg"
                    alt={user?.name}
                    className="w-24 h-24 rounded-full mx-auto"
                />
                <h2>{user?.name}</h2>
            </div>
            <ol className="flex gap-4 flex-col w-full  items-center justify-center text-md font-medium py-2">{postTitles}</ol>
        </section>
    )
}

export default UserPage;

