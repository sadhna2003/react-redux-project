import { Link } from "react-router-dom"

const Header = () => {
    return (
        <header className="flex flex-col p-4 w-full bg-violet-300 h-28 text-white sticky top-0">
            <h1 className="text-5xl font-bold">Redux Blog</h1>
            <nav className="">
                <ul className="flex gap-4 flex-row w-full justify-start text-md font-medium">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="post">Post</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header