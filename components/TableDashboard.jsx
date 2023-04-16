import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./tabledashboard.module.css";

import { useDispatch, useSelector } from "react-redux";
import { Button, Divider, IconButton } from "@mui/material";

export default function TableDashboard(props) {
  const { current, title, refresh, open, create, update, destroy } = props;
  const dispatch = useDispatch();

  const listUsers = useSelector((state) => state.user.listUsers);
  const listTypeItems = useSelector((state) => state.typeItem.listTypeItems);
  const listPieceItems = useSelector((state) => state.pieceItem.listPieceItems);
  const listItems = useSelector((state) => state.item.listItems);

  const renderUsers = () => {
    return (
      <>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listUsers?.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell sx={{ display: "flex" }}>
                  <IconButton
                    onClick={(event) => open(event, "edit", "user", row)}
                  >
                    <EditIcon />
                  </IconButton>
                  <Divider orientation="vertical" flexItem />
                  <IconButton onClick={(event) => destroy(event, row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          onClick={(event) => open(event, "add", "user")}
          variant="contained"
          sx={{ width: "100%", height: 30, marginTop: 5 }}
        >
          ADD
        </Button>
      </>
    );
  };

  const renderItems = () => {
    return (
      <>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>Jenis</TableCell>
              <TableCell>Satuan</TableCell>
              <TableCell>Stok</TableCell>
              <TableCell>Petugas</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listItems?.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.Type_Item.name}</TableCell>
                <TableCell>{row.Piece_Item.name}</TableCell>
                <TableCell>{row.stock}</TableCell>
                <TableCell>{row.User.name}</TableCell>
                <TableCell sx={{ display: "flex" }}>
                  <IconButton
                    onClick={(event) => open(event, "edit", "item", row)}
                  >
                    <EditIcon />
                  </IconButton>
                  <Divider orientation="vertical" flexItem />
                  <IconButton onClick={(event) => destroy(event, row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          onClick={(event) => open(event, "add", "item")}
          variant="contained"
          sx={{ width: "100%", height: 30, marginTop: 5 }}
        >
          ADD
        </Button>
      </>
    );
  };

  const renderTypeItems = () => {
    return (
      <>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listTypeItems?.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell sx={{ display: "flex" }}>
                  <IconButton
                    onClick={(event) => open(event, "edit", "typeItem", row)}
                  >
                    <EditIcon />
                  </IconButton>
                  <Divider orientation="vertical" flexItem />
                  <IconButton onClick={(event) => destroy(event, row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          onClick={(event) => open(event, "add", "typeItem")}
          variant="contained"
          sx={{ width: "100%", height: 30, marginTop: 5 }}
        >
          ADD
        </Button>
      </>
    );
  };

  const renderPieceItems = () => {
    return (
      <>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listPieceItems?.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell sx={{ display: "flex" }}>
                  <IconButton
                    onClick={(event) => open(event, "edit", "pieceItem", row)}
                  >
                    <EditIcon />
                  </IconButton>
                  <Divider orientation="vertical" flexItem />
                  <IconButton onClick={(event) => destroy(event, row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          onClick={(event) => open(event, "add", "pieceItem")}
          variant="contained"
          sx={{ width: "100%", height: 30, marginTop: 5 }}
        >
          ADD
        </Button>
      </>
    );
  };

  const renderBaseType = (type) => {
    let render;
    switch (type) {
      case "Items":
        render = renderItems();
        break;
      case "Users":
        render = renderUsers();
        break;
      case "TypeItems":
        render = renderTypeItems();
        break;
      case "PieceItems":
        render = renderPieceItems();
        break;
      default:
        break;
    }
    return render;
  };

  return (
    <React.Fragment>
      <h1>List {title}</h1>
      {renderBaseType(current)}
    </React.Fragment>
  );
}
