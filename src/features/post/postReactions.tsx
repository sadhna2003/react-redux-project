import { useDispatch } from "react-redux";
import { reactionAdd } from "./postSlice";


const reactionsEmoji = {
    thumbsUp: "👍",
    wow: "😮",
    heart: "❤️",
    rocket: "🚀",
    eyes: "👀",
};
const PostReactions = ({post} : any) => {
       const dispatch = useDispatch();
        const reactionButtons = Object.entries(reactionsEmoji).map(([name, emoji]) => {
            const reaction = name as keyof typeof reactionsEmoji; 
            return (
                <button
                    key={name}
                    type="button"
                    className="m-1 p-2 rounded-lg bg-violet-500 text-lg"
                    onClick={() =>
                        dispatch(reactionAdd({ postId: post.id, reaction }))
                    }
                >
                    {emoji} {post.reactions[name as keyof typeof reactionsEmoji]}
                </button>
            );
        });
        return <div>{reactionButtons}</div>;
    };

export default PostReactions