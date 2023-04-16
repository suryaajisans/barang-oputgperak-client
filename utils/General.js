import * as React from 'react'
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getUserLogin } from "../store/apiCalls";

export const checkToken = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token");
  if (!token) {
    router.push("/auth");
  } else {
    getUserLogin(dispatch);
  }
};
