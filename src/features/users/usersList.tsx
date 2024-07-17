import { useSelector } from "react-redux";
import { selectAllUser } from "../users/userSlice";
import { Link } from "react-router-dom";

const UsersList = () => {
    const users = useSelector(selectAllUser);
    const renderedUsers = users.map((user: any) => {
        return (
            <li key={user.id} className="w-1/2 border border-violet-400 rounded-md p-2 flex flex-row justify-center hover:bg-violet-300 hover:underline hover:text-white">
                <Link to={`/users/${user.id}`}>{user.name}</Link>
            </li>
        )
    })
    return (
        <section className="flex flex-col items-center w-full justify-center py-2">
            <h2 className="text-5xl font-medium p-2">Users</h2>
            <ul className="flex gap-4 flex-col w-full  items-center justify-center text-md font-medium">
                {renderedUsers}
            </ul>
        </section>
    )
}
export default UsersList;