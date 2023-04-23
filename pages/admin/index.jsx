import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TableDashboard from "../../components/TableDashboard";
import LayoutDashboard from "../../components/LayoutDashboard";
import {
  Box,
  Fade,
  Link,
  Modal,
  TextField,
  Typography,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { checkToken } from "../../utils/General";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItem,
  deletePiece,
  deleteType,
  deleteUser,
  editUser,
  fetchItem,
  fetchPiece,
  fetchType,
  fetchUsers,
  getUserLogin,
  registerUser,
  softDeleteUser,
} from "../../store/apiCalls";
import { createType } from "../../store/apiCalls";
import { createPiece } from "../../store/apiCalls";
import { createItem } from "../../store/apiCalls";
import { editItem } from "../../store/apiCalls";
import { editType } from "../../store/apiCalls";
import { editPiece } from "../../store/apiCalls";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function AdminContent() {
  const router = useRouter();
  const dispatch = useDispatch();
  const listTypeItems = useSelector((state) => state.typeItem.listTypeItems);
  const listPieceItems = useSelector((state) => state.pieceItem.listPieceItems);
  const userDetail = useSelector((state) => state.user.userDetail);

  const [refresh, setRefresh] = React.useState(false);
  const [statusForm, setStatusForm] = React.useState(null);
  const [user, setUser] = React.useState({
    id: null,
    name: "",
    email: "",
    password: "",
    phone: "",
    photo: "",
    role: "",
    status: "",
  });
  const [typeItem, setTypeItem] = React.useState({ id: null, name: "" });
  const [pieceItem, setPieceItem] = React.useState({ id: null, name: "" });
  const [item, setItem] = React.useState({
    id: null,
    name: "",
    type_id: 1,
    piece_id: 1,
    stock: 0,
  });
  const [openFormUser, setOpenFormUser] = React.useState(false);
  const [openFormType, setOpenFormType] = React.useState(false);
  const [openFormPiece, setOpenFormPiece] = React.useState(false);
  const [openFormItem, setOpenFormItem] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/auth");
    } else {
      getUserLogin(dispatch);
      fetchUsers(dispatch);
      fetchPiece(dispatch);
      fetchType(dispatch);
      fetchItem(dispatch);
    }
  }, [refresh, dispatch, router]);

  const handleOpenModal = (e, type, set, item) => {
    if (type === "add") {
      setStatusForm("add");
      switch (set) {
        case "user":
          setOpenFormUser(true);
          break;
        case "typeItem":
          setOpenFormType(true);
          break;
        case "pieceItem":
          setOpenFormPiece(true);
          break;
        case "item":
          setOpenFormItem(true);
          break;
      }

      clearPayload();
    } else if (type === "edit") {
      setStatusForm("edit");
      switch (set) {
        case "user":
          setUser({
            id: item.id,
            name: item.name,
            email: item.email,
            phone: item.phone,
            photo: item.photo,
            role: item.role,
            status: item.status,
          });
          setOpenFormUser(true);
          break;
        case "typeItem":
          setTypeItem({ id: item.id, name: item.name });
          setOpenFormType(true);
          break;
        case "pieceItem":
          setPieceItem({ id: item.id, name: item.name });
          setOpenFormPiece(true);
          break;
        case "item":
          setOpenFormItem(true);
          setItem({
            id: item.id,
            name: item.name,
            type_id: item.type_id,
            piece_id: item.piece_id,
            stock: item.stock,
          });
          break;
      }
    }
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const payload = { ...user, status: "active" };
    registerUser(payload, dispatch);
    setOpenFormUser(false);
    setRefresh(!refresh);
  };

  const handleEditUser = (e, data) => {
    e.preventDefault();
    editUser(user.id, user);
    setOpenFormUser(false);
    setRefresh(!refresh);
  };

  const handleRemoveUser = (e, id) => {
    deleteUser(id);
    setRefresh(!refresh);
  };

  const handleAddTypeItem = (e) => {
    e.preventDefault();
    const payload = { name: typeItem.name };
    console.log("add", payload);
    createType(payload, dispatch);
    setOpenFormType(false);
    setRefresh(!refresh);
  };

  const handleEditTypeItem = (e, data) => {
    e.preventDefault();
    console.log("edit", typeItem);
    editType(typeItem.id, typeItem);
    setOpenFormType(false);
    setRefresh(!refresh);
  };

  const handleRemoveTypeItem = (e, id) => {
    deleteType(id);
    setRefresh(!refresh);
  };

  const handleAddPieceItem = (e) => {
    e.preventDefault();
    const payload = pieceItem;
    createPiece(payload, dispatch);
    setOpenFormPiece(false);
    setRefresh(!refresh);
  };

  const handleEditPieceItem = (e, data) => {
    e.preventDefault();
    editPiece(pieceItem.id, pieceItem);
    setOpenFormPiece(false);
    setRefresh(!refresh);
  };

  const handleRemovePieceItem = (e, id) => {
    deletePiece(id);
    setRefresh(!refresh);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    const payload = item;
    createItem(payload, dispatch);
    setOpenFormItem(false);
    setRefresh(!refresh);
  };

  const handleEditItem = (e, data) => {
    e.preventDefault();
    editItem(item.id, item);
    setOpenFormItem(false);
    setRefresh(!refresh);
  };

  const handleRemoveItem = (e, id) => {
    deleteItem(id);
    setRefresh(!refresh);
  };

  const clearPayload = () => {
    setUser({
      id: null,
      name: "",
      email: "",
      password: "",
      phone: "",
      photo: "",
      role: "",
      status: "",
    });
    setTypeItem({ id: null, name: "" });
    setPieceItem({ id: null, name: "" });
    setItem({ id: null, name: "", type_id: null, piece_id: null, stock: 0 });
  };

  return (
    <LayoutDashboard title="Admin Dashboard" head="Admin">
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <TableDashboard
                current="Users"
                title="Akun"
                create={handleAddUser}
                open={handleOpenModal}
                update={handleEditUser}
                destroy={handleRemoveUser}
                refresh={refresh}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <TableDashboard
                current="Items"
                title="Barang"
                create={handleAddItem}
                open={handleOpenModal}
                update={handleEditItem}
                destroy={handleRemoveItem}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <TableDashboard
                current="TypeItems"
                title="Jenis Barang"
                create={handleAddTypeItem}
                open={handleOpenModal}
                update={handleEditTypeItem}
                destroy={handleRemoveTypeItem}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <TableDashboard
                current="PieceItems"
                title="Satuan Barang"
                create={handleAddPieceItem}
                open={handleOpenModal}
                update={handleEditPieceItem}
                destroy={handleRemovePieceItem}
              />
            </Paper>
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openFormUser}
        onClose={() => setOpenFormUser(!openFormUser)}
        closeAfterTransition
      >
        <Fade in={openFormUser}>
          <Box sx={style} component="form" noValidate>
            <Typography variant="h5" align="center" sx={{ mb: 2 }}>
              Form User
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  autoFocus
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </Grid>
              {statusForm === "add" ? (
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                </Grid>
              ) : null}
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={user.role}
                    label="Role"
                    onChange={(e) => setUser({ ...user, role: e.target.value })}
                  >
                    <MenuItem value={"admin"}>Admin</MenuItem>
                    <MenuItem value={"user"}>User</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="phone"
                  label="Phone"
                  type="phone"
                  id="phone"
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="photo"
                  label="photo"
                  type="photo"
                  id="photo"
                  placeholder="url: http://......"
                  value={user.photo}
                  onChange={(e) => setUser({ ...user, photo: e.target.value })}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={statusForm === "add" ? handleAddUser : handleEditUser}
            >
              Submit
            </Button>
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openFormType}
        onClose={() => setOpenFormType(!openFormType)}
        closeAfterTransition
      >
        <Fade in={openFormType}>
          <Box sx={style} component="form" noValidate>
            <Typography variant="h5" align="center" sx={{ mb: 2 }}>
              Form Jenis Barang
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name Jenis Barang"
                  autoFocus
                  value={typeItem.name}
                  onChange={(e) =>
                    setTypeItem({ ...typeItem, name: e.target.value })
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={
                statusForm === "add" ? handleAddTypeItem : handleEditTypeItem
              }
            >
              Submit
            </Button>
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openFormPiece}
        onClose={() => setOpenFormPiece(!openFormPiece)}
        closeAfterTransition
      >
        <Fade in={openFormPiece}>
          <Box sx={style} component="form" noValidate>
            <Typography variant="h5" align="center" sx={{ mb: 2 }}>
              Form Satuan Barang
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name Satuan Barang"
                  autoFocus
                  value={pieceItem.name}
                  onChange={(e) =>
                    setPieceItem({ ...pieceItem, name: e.target.value })
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={
                statusForm === "add" ? handleAddPieceItem : handleEditPieceItem
              }
            >
              Submit
            </Button>
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openFormItem}
        onClose={() => setOpenFormItem(!openFormItem)}
        closeAfterTransition
      >
        <Fade in={openFormItem}>
          <Box sx={style} component="form" noValidate>
            <Typography variant="h5" align="center" sx={{ mb: 2 }}>
              Form Barang
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nama Barang"
                  autoFocus
                  value={item.name}
                  onChange={(e) => setItem({ ...item, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Jenis</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={item.type_id}
                    label="Jenis Barang"
                    onChange={(e) =>
                      setItem({ ...item, type_id: e.target.value })
                    }
                  >
                    {listTypeItems?.full?.map((el) => (
                      <MenuItem key={el.id} value={el.id}>
                        {el.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Satuan</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={item.piece_id}
                    label="Satuan Barang"
                    onChange={(e) =>
                      setItem({ ...item, piece_id: e.target.value })
                    }
                  >
                    {listPieceItems?.full?.map((el) => (
                      <MenuItem key={el.id} value={el.id}>
                        {el.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="stock"
                  required
                  fullWidth
                  id="stock"
                  label="Stok Barang"
                  value={item.stock}
                  onChange={(e) => setItem({ ...item, stock: e.target.value })}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={statusForm === "add" ? handleAddItem : handleEditItem}
            >
              Submit
            </Button>
          </Box>
        </Fade>
      </Modal>
    </LayoutDashboard>
  );
}

export default AdminContent;
