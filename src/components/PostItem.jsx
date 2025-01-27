import React from "react";
import MyButton from "./UI/Button/MyButton";
import { useNavigate } from "react-router-dom";

const PostItem = (props) => {
    const [animate, setAnimate] = React.useState(false);

    const navigate = useNavigate();
    const transitToPost = (id) => {
        navigate(`/posts/${id}`, { replace: true });
    };

    const handleClick = () => {
        setAnimate(true);
        setTimeout(() => {
            setAnimate(false);
            props.remove(props.post);
        }, 1000); // Длительность анимации
    };

    return (
        <div className={`post ${animate ? "animate" : ""}`}>
            <div className="post__content">
                <strong>
                    {props.number}. {props.post.title}
                </strong>
                <div>{props.post.body}</div>
            </div>
            <div className="post__btns">
                <MyButton onClick={() => transitToPost(props.post.id)}>Открыть</MyButton>
                <MyButton onClick={handleClick}>Удалить</MyButton>
            </div>
        </div>
    );
};

export default PostItem;
