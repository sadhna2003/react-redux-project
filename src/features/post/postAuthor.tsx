import { useSelector } from "react-redux";
import { selectAllUser } from "../users/userSlice";
import { Link } from "react-router-dom";
const PostAuthor = ({userId}: any) => {
    const users = useSelector(selectAllUser);
    const author = users.find((user: any) => user.id === Number(userId));//convert this in number if fetching from fake api otherwise string
    return <span className="text-lg font-semibold"> by {" "}
    <Link to={`/users/${userId}`} className="hover:underline">{author ? author.name : 'Unknown author'}</Link>
    </span>
}

export default PostAuthor;