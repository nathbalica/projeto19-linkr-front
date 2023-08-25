import axios from "axios";

function configToken(token) {
    return { headers: { Authorization: `Bearer ${token}` } };
}

function singIn(body) {
    const res = axios.post(`${process.env.REACT_APP_API_URL}/signin`, body);
    return res;
}

function signUp(body) {
    const res = axios.post(`${process.env.REACT_APP_API_URL}/signup`, body);
    return res;
}

function logout(token) {
    const config = configToken(token);
    const res = axios.post(
        `${process.env.REACT_APP_API_URL}/logout`,
        {},
        config
    );
    return res;
}

async function timeline(token, page) {
    const config = configToken(token);
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/timeline/${page}`,
            config
        );
        return res.data;
    } catch (error) {
        console.error("Erro ao buscar timeline:", error);
        throw error;
    }
}

async function getUser(id, token) {
    const config = configToken(token);
    console.log(config);
    try {
        const res = axios.get(
            `${process.env.REACT_APP_API_URL}/user/${id}`,
            config
        );
        return res;
    } catch (error) {
        console.error("Erro ao buscar posts do usuário:", error);
        throw error;
    }
}

async function like(id, token) {
    const config = configToken(token);
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/like/${id}`,
            {},
            config
        );
        return res.data;
    } catch (error) {
        console.error("Erro ao curtir post:", error);
        throw error;
    }
}

async function dislike(id, token) {
    const config = configToken(token);
    try {
        const res = await axios.delete(
            `${process.env.REACT_APP_API_URL}/like/${id}`,
            config
        );
        return res.data;
    } catch (error) {
        console.error("Erro ao descurtir post:", error);
        throw error;
    }
}

async function publish(post, token) {
    const config = configToken(token);
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/publish`,
            post,
            config
        );
        return res;
    } catch (error) {
        console.error("Erro ao descurtir post:", error);
        throw error;
    }
}

async function deletePost(post_id, token) {
    const config = configToken(token);
    try {
        const res = await axios.delete(
            `${process.env.REACT_APP_API_URL}/remove/${post_id}`,
            config
        );
        return res;
    } catch (error) {
        console.error("Erro ao deletar post:", error);
        throw error;
    }
}

async function editPost(id, content, token) {
    const config = configToken(token);
    const body = {
        content: content,
    };
    try {
        const res = await axios.put(
            `${process.env.REACT_APP_API_URL}/edit/${id}`,
            body,
            config
        );
        return res;
    } catch (error) {
        console.error("Erro ao editar post:", error);
        throw error;
    }
}

async function getMetaData(url) {
    try {
        const response = await axios.get(
            `https://jsonlink.io/api/extract?url=${url}`
        );
        return response.data;
    } catch (error) {
        throw new Error("Erro ao buscar metadados");
    }
}

async function getHashtags(token) {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/trending`
        );
        return response.data;
    } catch (error) {
        throw new Error("Erro ao buscar metadados");
    }
}

async function getPostTags(nameHashtag, token) {
    const config = configToken(token);
    console.log(config);
    try {
        const res = axios.get(
            `${process.env.REACT_APP_API_URL}/hashtag/${nameHashtag}`,
            config
        );
        return res;
    } catch (error) {
        console.error("Erro ao buscar posts das tags do usuário:", error);
        throw error;
    }
}

async function searchUsers(query, token) {
    const config = configToken(token);
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/search?query=${query}`,
            config
        );
        return res.data;
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        throw error;
    }
}

async function fetchComments(post_id, token) {
    const config = configToken(token);
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/comments/${post_id}`, config
        );
        return res.data;
    } catch (error) {
        console.error("Erro ao buscar comentários:", error);
        throw error;
    }
}

async function postComment(post_id, token, content) {
    const config = configToken(token);
    const body = { content: content };
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/comments/${post_id}`, body, config
        );
        return res.data;
    } catch (error) {
        console.error("Erro ao enviar comentário:", error);
        throw error;
    }
}

async function sharePost(post_id, token) {
    const config = configToken(token);
    try {
        await axios.post(
            `${process.env.REACT_APP_API_URL}/repost/${post_id}`, {}, config
        );
    } catch (error) {
        throw error;
    }
}


async function getPost(post_id, token) {
    const config = configToken(token);
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/post/${post_id}`, config
        );
        return res.data;
    } catch (error) {
        console.error("Erro ao buscar post:", error);
        throw error;
    }
}

const apis = {
    singIn,
    signUp,
    logout,
    timeline,
    getUser,
    like,
    dislike,
    getMetaData,
    getHashtags,
    getPostTags,
    searchUsers,
    publish,
    deletePost,
    editPost,
    fetchComments,
    postComment,
    sharePost,
    getPost
};

export default apis;
