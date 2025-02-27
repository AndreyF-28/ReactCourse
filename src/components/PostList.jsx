import React from "react";
import PostItem from "./PostItem";

const PostList = ({ posts, title, remove }) => {
    if (!posts.length) {
        return <h1 style={{ textAlign: "center" }}>Посты не найдены!</h1>;
    }

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>{title}</h1>
            <div>
                {posts.map((post, index) => (
                    <React.Fragment key={post.id}>
                        <PostItem
                            remove={remove}
                            number={index + 1}
                            post={post}
                        />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default PostList;
