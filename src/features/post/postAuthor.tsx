import { useSelector } from "react-redux";
import { selectAllUser } from "../users/userSlice";
const PostAuthor = ({userId}: any) => {
    const users = useSelector(selectAllUser);
    const author = users.find((user: any) => user.id === Number(userId));//convert this in number if fetching from fake api otherwise string
    return <span className="text-lg font-semibold"> by {author ? author.name : 'Unknown author'}</span>
}

export default PostAuthor;