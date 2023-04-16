import * as React from "react";
import moment from "moment";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { fetchHistory, fetchItemIn, fetchItemOut } from "../store/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
];

export default function TableItem({ current, update, remove }) {
  const dispatch = useDispatch();
  const listItemsIn = useSelector((state) => state.itemIn.listItemsIn);
  const listItemsOut = useSelector((state) => state.itemOut.listItemsOut);
  const listHistories = useSelector((state) => state.user.listHistories);

  React.useEffect(() => {
    if (current === "itemIn") {
      fetchItemIn(dispatch);
    } else if (current === "itemOut") {
      fetchItemOut(dispatch);
    } else if (current === 'history') {
      fetchHistory(dispatch)
    }
  }, [dispatch, current]);

  const renderItemIn = () => {
    return (
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Tanggal</StyledTableCell>
            <StyledTableCell>Barang</StyledTableCell>
            <StyledTableCell>Total</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell>Petugas</StyledTableCell>
            <StyledTableCell>Divisi</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listItemsIn?.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell>{row.id}</StyledTableCell>
              <StyledTableCell>
                {moment(row.date).format("DD MMMM YYYY")}
              </StyledTableCell>
              <StyledTableCell>{row.Item.name}</StyledTableCell>
              <StyledTableCell>{row.total}</StyledTableCell>
              <StyledTableCell>{row.status}</StyledTableCell>
              <StyledTableCell>{row.User.name}</StyledTableCell>
              <StyledTableCell>{row.Department.name}</StyledTableCell>
              <StyledTableCell align="right" sx={{ display: "flex" }}>
                <IconButton onClick={(event) => remove(event, row.id)}>
                  <DeleteIcon />
                </IconButton>
                <Divider orientation="vertical" flexItem />
                <IconButton onClick={(event) => update(event, row)}>
                  <EditIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  const renderItemOut = () => {
    return (
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Tanggal</StyledTableCell>
            <StyledTableCell>Barang</StyledTableCell>
            <StyledTableCell>Total</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell>Petugas</StyledTableCell>
            <StyledTableCell>Divisi</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listItemsOut?.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell>{row.id}</StyledTableCell>
              <StyledTableCell>
                {moment(row.date).format("DD MMMM YYYY")}
              </StyledTableCell>
              <StyledTableCell>{row.Item.name}</StyledTableCell>
              <StyledTableCell>{row.total}</StyledTableCell>
              <StyledTableCell>{row.status}</StyledTableCell>
              <StyledTableCell>{row.User.name}</StyledTableCell>
              <StyledTableCell>{row.Department.name}</StyledTableCell>
              <StyledTableCell align="right" sx={{ display: "flex" }}>
                <IconButton onClick={(event) => remove(event, row.id)}>
                  <DeleteIcon />
                </IconButton>
                <Divider orientation="vertical" flexItem />
                <IconButton onClick={(event) => update(event, row)}>
                  <EditIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  const renderHistory = () => {
    return (
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Tanggal</StyledTableCell>
            <StyledTableCell>Barang</StyledTableCell>
            <StyledTableCell>Jenis</StyledTableCell>
            <StyledTableCell>Satuan</StyledTableCell>
            <StyledTableCell>Jumlah</StyledTableCell>
            <StyledTableCell>Petugas</StyledTableCell>
            <StyledTableCell>Ket</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listHistories?.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell>{row.id}</StyledTableCell>
              <StyledTableCell>
                {moment(row.createdAt).format("DD MMMM YYYY")}</StyledTableCell>
              <StyledTableCell>{row.name_item}</StyledTableCell>
              <StyledTableCell>{row.type}</StyledTableCell>
              <StyledTableCell>{row.piece}</StyledTableCell>
              <StyledTableCell>{row.total}</StyledTableCell>
              <StyledTableCell>{row.username}</StyledTableCell>
              <StyledTableCell>{row.mode}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  const renderDefault = () => {
    return (
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Tanggal</StyledTableCell>
            <StyledTableCell>Nama</StyledTableCell>
            <StyledTableCell>Barang</StyledTableCell>
            <StyledTableCell>Total</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell>Petugas</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell>{row.name}</StyledTableCell>
              <StyledTableCell>{row.calories}</StyledTableCell>
              <StyledTableCell>{row.fat}</StyledTableCell>
              <StyledTableCell>{row.carbs}</StyledTableCell>
              <StyledTableCell>{row.protein}</StyledTableCell>
              <StyledTableCell align="right">Edit Delete</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  const renderBaseType = (type) => {
    let render;
    switch (type) {
      case "itemIn":
        render = renderItemIn();
        break;
      case "itemOut":
        render = renderItemOut();
        break;
      case "history":
        render = renderHistory();
        break;
      default:
        render = renderDefault();
        break
    }
    return render;
  };

  return (
    <TableContainer component={Paper}>{renderBaseType(current)}</TableContainer>
  );
}
