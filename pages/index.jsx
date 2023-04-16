import styles from "../styles/Home.module.css";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { fetchHistory, fetchItemIn, fetchItemOut, getUserLogin } from "../store/apiCalls";
import LayoutDashboard from "../components/LayoutDashboard";
import StatisticCard from "../components/StatisticCard";
import { Card } from "@mui/material";
import TableItem from "../components/TableItem";
import { Box } from "@mui/system";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  const listItemsIn = useSelector((state) => state.itemIn.listItemsIn)
  const listItemsOut = useSelector((state) => state.itemOut.listItemsOut)

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/auth");
    } else {
      getUserLogin(dispatch);
      fetchItemIn(dispatch)
      fetchItemOut(dispatch)
      fetchHistory(dispatch)
    }
  }, [dispatch, router]);

  return (
    <LayoutDashboard title={"Dashboard"} head={"Dashboard"}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={12}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h4" align="left">
              Warehouse App
            </Typography>
            <Typography align="left">
              sistem inventory yang mudah seperti pemberitahuan & kalkulasi
              produk secara langsung, melacak penjualan produk terbanyak,
              mengimpor data persediaan, memantau bisnis multi cabang, hingga
              mengatur jumlah minimal stok sehingga pemesanan dapat tepat waktu
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <StatisticCard
            title="Statistic Barang"
            total="8"
            lastUpdate="22 April 2023"
            description="Jumlah barang pada database yang perlu diketahui ini masih dalam deskripsi tidak sesuai, perlu disesuaikan."
            color="#1976d2"
            textColor="white"
          />
        </Grid>
        <Grid item xs={4}>
          <StatisticCard
            title="Barang Masuk"
            total={listItemsIn?.length}
            lastUpdate="14 April 2023"
            description="Jumlah barang masuk pada database yang perlu diketahui ini masih dalam deskripsi tidak sesuai, perlu disesuaikan."
            color="#fff7cd"
            textColor="#7a4f01"
            nav="barang_masuk"
          />
        </Grid>
        <Grid item xs={4}>
          <StatisticCard
            title="Barang Keluar"
            total={listItemsOut?.length}
            lastUpdate="7 Mei 2023"
            description="Jumlah barang keluar pada database yang perlu diketahui ini masih dalam deskripsi tidak sesuai, perlu disesuaikan."
            color="#ffe7d9"
            textColor="#7a0c2e"
            nav="barang_keluar"
          />
        </Grid>
        <Grid item xs={8}>
          <TableItem current="history" />
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ p: 2 }}>
            <Typography fontWeight={"bold"} variant="h6">
              Papan Pengumuman
            </Typography>
            <Typography>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </LayoutDashboard>
  );
}
