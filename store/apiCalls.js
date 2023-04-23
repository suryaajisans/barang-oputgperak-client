import { baseUrl } from "../api/server";
import axios from "axios";
import { setToken, setUser, updateListHistories, updateListUsers } from "./userSlice";
import { updateListItems } from "./itemSlice";
import { updateListPieceItems } from "./pieceSlice";
import { updateListTypeItems } from "./typeSlice";
import { updateListItemsIn } from "./itemInSlice";
import { updateListItemsOut } from "./itemOutSlice";
import { updateListDepartments } from "./departmentSlice";

export const registerUser = async (payload, dispatch) => {
  try {
    const { data } = await axios({
      url: `${baseUrl}/register`,
      method: "POST",
      data: payload,
    });
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (payload, dispatch) => {
  try {
    const { data } = await axios({
      url: `${baseUrl}/login`,
      method: "POST",
      data: {
        username: payload.username,
        password: payload.password,
      },
    });

    localStorage.setItem("access_token", data.access_token);
    setToken(data.access_token);
  } catch (error) {
    console.log(error);
  }
};

export const fetchUsers = async (dispatch) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const { data } = await axios({
      url: `${baseUrl}/user`,
      method: "GET",
      headers: {
        access_token,
      },
    });

    let result = {
      totalPage: 0,
      list: {}
    }

    result.totalPage = Math.ceil(data.length / 10)
    for(let i = 1; i <= result.totalPage; i ++) {
      result.list[i] = []
    }
    let idPage = 1
    for(let i = 0; i < data.length; i++) {
      result.list[idPage].push(data[i])
      if (i % 10 == 0 && i !== 0) {
        idPage += 1
      }
    }

    dispatch(updateListUsers(result));
  } catch (err) {
    console.log(err);
  }
};

export const getUserLogin = async (dispatch) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const { data } = await axios({
      url: `${baseUrl}/user-login`,
      method: "GET",
      headers: {
        access_token,
      },
    });
    console.log(data, 'user login')

    dispatch(setUser(data));
  } catch (error) {
    console.log(error);
  }
};

export const editUser = async (id, payload) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const { data } = await axios({
      url: `${baseUrl}/user/${id}`,
      method: "PUT",
      data: payload,
      headers: { access_token },
    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const softDeleteUser = async (id) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const { data } = await axios({
      url: `${baseUrl}/user/${id}`,
      method: "PUT",
      data: { status: "nonactive" },
      headers: {
        access_token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const { data } = await axios({
      url: `${baseUrl}/user/${id}`,
      method: "DELETE",
      headers: {
        access_token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// ===================================================

export const fetchType = async (dispatch) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const { data } = await axios({
      url: `${baseUrl}/type`,
      method: "GET",
      headers: {
        access_token,
      },
    });

    let result = {
      totalPage: 0,
      list: {},
      full: data
    }
    
    result.totalPage = Math.ceil(data.length / 10)
    for(let i = 1; i <= result.totalPage; i ++) {
      result.list[i] = []
    }
    let idPage = 1
    for(let i = 0; i < data.length; i++) {
      result.list[idPage].push(data[i])
      if (i % 10 == 0 && i !== 0) {
        idPage += 1
      }
    }

    dispatch(updateListTypeItems(result));
  } catch (err) {
    console.log(err);
  }
};

export const createType = async (payload, dispatch) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const { data } = await axios({
      url: `${baseUrl}/type`,
      method: "POST",
      data: payload,
      headers: { access_token },
    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const editType = async (id, payload) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const { data } = await axios({
      url: `${baseUrl}/type/${id}`,
      method: "PUT",
      data: payload,
      headers: { access_token },
    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteType = async (id) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const { data } = await axios({
      url: `${baseUrl}/type/${id}`,
      method: "DELETE",
      headers: {
        access_token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// =======================================================
export const fetchPiece = async (dispatch) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const { data } = await axios({
      url: `${baseUrl}/piece`,
      method: "GET",
      headers: {
        access_token,
      },
    });

    let result = {
      totalPage: 0,
      list: {},
      full: data
    }

    result.totalPage = Math.ceil(data.length / 10)
    for(let i = 1; i <= result.totalPage; i ++) {
      result.list[i] = []
    }
    let idPage = 1
    for(let i = 0; i < data.length; i++) {
      result.list[idPage].push(data[i])
      if (i % 10 == 0 && i !== 0) {
        idPage += 1
      }
    }

    dispatch(updateListPieceItems(result));
  } catch (err) {
    console.log(err);
  }
};

export const createPiece = async (payload, dispatch) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const { data } = await axios({
      url: `${baseUrl}/piece`,
      method: "POST",
      data: payload,
      headers: { access_token },
    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const editPiece = async (id, payload) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const { data } = await axios({
      url: `${baseUrl}/piece/${id}`,
      method: "PUT",
      data: payload,
      headers: { access_token },
    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const deletePiece = async (id) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const { data } = await axios({
      url: `${baseUrl}/piece/${id}`,
      method: "DELETE",
      headers: {
        access_token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// ========================================================
export const fetchItem = async (dispatch) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const { data } = await axios({
      url: `${baseUrl}/item`,
      method: "GET",
      headers: {
        access_token,
      },
    });

    let result = {
      totalPage: 0,
      list: {},
      full: data
    }

    result.totalPage = Math.ceil(data.length / 10)
    for(let i = 1; i <= result.totalPage; i ++) {
      result.list[i] = []
    }
    let idPage = 1
    for(let i = 0; i < data.length; i++) {
      result.list[idPage].push(data[i])
      if (i % 10 == 0 && i !== 0) {
        idPage += 1
      }
    }
    
    dispatch(updateListItems(result));
  } catch (err) {
    console.log(err);
  }
};

export const createItem = async (payload, dispatch) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const { data } = await axios({
      url: `${baseUrl}/item`,
      method: "POST",
      data: payload,
      headers: { access_token },
    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const editItem = async (id, payload) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const { data } = await axios({
      url: `${baseUrl}/item/${id}`,
      method: "PUT",
      data: payload,
      headers: { access_token },
    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteItem = async (id) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const { data } = await axios({
      url: `${baseUrl}/item/${id}`,
      method: "DELETE",
      headers: {
        access_token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// =======================================================
export const fetchItemIn = async (dispatch) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const { data } = await axios({
      url: `${baseUrl}/enter-item`,
      method: "GET",
      headers: {
        access_token,
      },
    });
    
    let result = {
      totalPage: 0,
      list: {},
      full: data
    }

    result.totalPage = Math.ceil(data.length / 10)
    for(let i = 1; i <= result.totalPage; i ++) {
      result.list[i] = []
    }
    let idPage = 1
    for(let i = 0; i < data.length; i++) {
      result.list[idPage].push(data[i])
      if (i % 10 == 0 && i !== 0) {
        idPage += 1
      }
    }

    dispatch(updateListItemsIn(result));
  } catch (err) {
    console.log(err);
  }
};

export const createItemIn = async (payload, dispatch) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const { data } = await axios({
      url: `${baseUrl}/enter-item`,
      method: "POST",
      data: payload,
      headers: { access_token },
    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const editItemIn = async (id, payload) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const { data } = await axios({
      url: `${baseUrl}/enter-item/${id}`,
      method: "PUT",
      data: payload,
      headers: { access_token },
    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteItemIn = async (id) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const { data } = await axios({
      url: `${baseUrl}/enter-item/${id}`,
      method: "DELETE",
      headers: {
        access_token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// =====================================================
export const fetchItemOut = async (dispatch) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const { data } = await axios({
      url: `${baseUrl}/exit-item`,
      method: "GET",
      headers: {
        access_token,
      },
    });

    let result = {
      totalPage: 0,
      list: {},
      full: data
    }

    result.totalPage = Math.ceil(data.length / 10)
    for(let i = 1; i <= result.totalPage; i ++) {
      result.list[i] = []
    }
    let idPage = 1
    for(let i = 0; i < data.length; i++) {
      result.list[idPage].push(data[i])
      if (i % 10 == 0 && i !== 0) {
        idPage += 1
      }
    }

    dispatch(updateListItemsOut(result));
  } catch (err) {
    console.log(err);
  }
};

export const createItemOut = async (payload, dispatch) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const { data } = await axios({
      url: `${baseUrl}/exit-item`,
      method: "POST",
      data: payload,
      headers: { access_token },
    });

    // if (data) {
    //   editItem(payload.item_id, {
    //     stock: payload.item_id_stock - payload.total,
    //   });
    // }

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const editItemOut = async (id, payload) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const { data } = await axios({
      url: `${baseUrl}/exit-item/${id}`,
      method: "PUT",
      data: payload,
      headers: { access_token },
    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteItemOut = async (id) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const { data } = await axios({
      url: `${baseUrl}/exit-item/${id}`,
      method: "DELETE",
      headers: {
        access_token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
// =====================================================
export const fetchDepartment = async (dispatch) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const { data } = await axios({
      url: `${baseUrl}/department`,
      method: "GET",
      headers: {
        access_token,
      },
    });

    console.log(data, "list department");
    dispatch(updateListDepartments(data));
  } catch (err) {
    console.log(err);
  }
};

export const createDepartment = async (payload, dispatch) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const { data } = await axios({
      url: `${baseUrl}/department`,
      method: "POST",
      data: payload,
      headers: { access_token },
    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const editDepartment = async (id, payload) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const { data } = await axios({
      url: `${baseUrl}/department/${id}`,
      method: "PUT",
      data: payload,
      headers: { access_token },
    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteDepartment = async (id) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const { data } = await axios({
      url: `${baseUrl}/department/${id}`,
      method: "DELETE",
      headers: {
        access_token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// =====================================================
export const fetchHistory = async (dispatch) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const { data } = await axios({
      url: `${baseUrl}/history`,
      method: "GET",
      headers: {
        access_token,
      },
    });
    
    let result = {
      totalPage: 0,
      list: {},
      full: data
    }

    result.totalPage = Math.ceil(data.length / 10)
    for(let i = 1; i <= result.totalPage; i ++) {
      result.list[i] = []
    }
    let idPage = 1
    for(let i = 0; i < data.length; i++) {
      result.list[idPage].push(data[i])
      if (i % 10 == 0 && i !== 0) {
        idPage += 1
      }
    }

    dispatch(updateListHistories(result));
  } catch (err) {
    console.log(err);
  }
}
