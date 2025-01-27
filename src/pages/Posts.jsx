import React, { useState, useEffect } from "react";
import MyModal from "../components/UI/Modal/MyModal";
import { useFetching } from "../hooks/useFetching";
import { usePosts } from "../hooks/usePosts";
import PostService from "../API/PostService";
import { getPageCount } from "../utils/pages";
import MyButton from "../components/UI/Button/MyButton";
import PostForm from "../components/PostForm";
import Loader from "../components/UI/Loader/Loader";
import PostList from "../components/PostList";
import Pagination from "../components/UI/Pagination/Pagination";
import PostFilter from "../components/PostFilter";

function Posts() {
    const [posts, setPorts] = useState([]);
    const [filter, setFilter] = useState({ sort: "", query: "" });
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPorts(response.data);
        const totalCount = response.headers["x-total-count"];
        setTotalPages(getPageCount(totalCount, limit));
    });

    useEffect(() => {
        fetchPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const createPost = (newPost) => {
        setPorts([...posts, newPost]);
        setModal(false);
    };

    const removePost = (post) => {
        setPorts(posts.filter((p) => p.id !== post.id));
    };

    const changePage = (page) => {
        setPage(page);
    };

    return (
        <div className="App">
            <MyButton
                style={{ marginTop: "20px" }}
                onClick={() => setModal(true)}
            >
                Создать пост
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>

            <hr style={{ margin: "15px 0" }} />

            <PostFilter filter={filter} setFilter={setFilter} />

            {postError && <h1>Произошла ошибка ${postError}</h1>}
            {isPostsLoading ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 50,
                    }}
                >
                    <Loader />
                </div>
            ) : (
                <PostList
                    remove={removePost}
                    posts={sortedAndSearchedPosts}
                    title="Посты про JavaScript"
                />
            )}

            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div>
    );
}

export default Posts;
