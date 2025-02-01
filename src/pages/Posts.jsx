import React, { useState, useEffect, useRef } from "react";
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
import { useObserver } from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";
import CloseButton from "../components/UI/Button/CloseButton";

function Posts() {
    const [posts, setPorts] = useState([]);
    const [filter, setFilter] = useState({ sort: "", query: "" });
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    // eslint-disable-next-line no-unused-vars
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const lastElement = useRef()

    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPorts([...posts, ...response.data]);
        const totalCount = response.headers["x-total-count"];
        setTotalPages(getPageCount(totalCount, limit));
    });

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1);
    })

    useEffect(() => {
        fetchPosts(limit, page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, limit]);

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
                <CloseButton
                    onClick={() => setModal(false)}
                >
                    &times;
                </CloseButton>
                <PostForm create={createPost} />
            </MyModal>

            <hr style={{ margin: "15px 0" }} />

            <PostFilter filter={filter} setFilter={setFilter} />

            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue="Кол-во элементов на странице"
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    {value: -1, name: 'Показать все'},
                ]}
            />

            {postError && <h1>Произошла ошибка ${postError}</h1>}

            <PostList
                remove={removePost}
                posts={sortedAndSearchedPosts}
                title="Посты про JavaScript"
            />
            <div ref={lastElement} style={{height: 20, background: 'red'}}/>
            {isPostsLoading && 
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 50,
                    }}
                >
                    <Loader />
                </div>
            }

            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div>
    );
}

export default Posts;
