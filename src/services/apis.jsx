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

async function timeline(token) {
    const config = configToken(token);
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/timeline`,
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
        return res;
    } catch (error) {
        console.error("Erro ao descurtir post:", error);
        throw error;
    }
}

async function getMetaData(url) {
  try {
      const response = await axios.get(`https://jsonlink.io/api/extract?url=${url}`);
      return response.data;
  } catch (error) {
      throw new Error("Erro ao buscar metadados");
  }
}

async function getHashtags(token) {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/trending`);
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
    getPostTags
};

export default apis;
