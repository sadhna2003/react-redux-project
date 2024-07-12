import { useSelector } from "react-redux";
import { selectAllUser } from "../users/userSlice";
const PostAuthor = ({userId}: any) => {
    const users = useSelector(selectAllUser);
    const author = users.find((user: any) => user.id === userId);
    return <span className="text-lg font-semibold"> by {author ? author.name : 'Unknown author'}</span>
}

export default PostAuthor;