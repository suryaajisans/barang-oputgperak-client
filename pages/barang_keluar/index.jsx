import React, { useEffect, useState } from 'react';
import LayoutDashboard from '../../components/LayoutDashboard';
import TableItem from '../../components/TableItem';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  createItemOut,
  deleteItemOut,
  editItemOut,
  fetchDepartment,
  fetchItem,
  fetchItemOut,
  getUserLogin,
} from '../../store/apiCalls';
import {
  Box,
  Button,
  Fade,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import SearchBar from '../../components/SearchBar';
// import CustomDatePicker from "../../components/DatePicker";
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import ExportPDF from '../../utils/PDF';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const BarangKeluar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const listItems = useSelector((state) => state.item.listItems);
  const listDepartments = useSelector(
    (state) => state.department.listDepartments
  );
  const listItemsOut = useSelector((state) => state.itemOut.listItemsOut)

  const [refresh, setRefresh] = useState(false);
  const [exitItem, setExitItem] = useState({
    id: null,
    date: new Date(),
    item_id: 1,
    item_id_stock: 0,
    total: 0,
    status: '',
    department_id: 1,
  });
  const [openFormExit, setOpenFormExit] = useState(false);
  const [statusForm, setStatusForm] = useState('add');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/auth');
    } else {
      getUserLogin(dispatch);
      fetchItem(dispatch);
      fetchItemOut(dispatch);
      fetchDepartment(dispatch);
    }
  }, [refresh, dispatch, router]);

  const handleSubmitItemOUt = (e) => {
    e.preventDefault();
    const payload = { ...exitItem, total: +exitItem.total };
    if (statusForm === 'add') {
      createItemOut(payload, dispatch);
    } else if (statusForm === 'edit') {
      editItemOut(payload.id, payload);
    }
    clearPayload();
    setOpenFormExit(false);
    setRefresh(!refresh);
  };

  const handleEditExitItem = (e, item) => {
    setOpenFormExit(true);
    setStatusForm('edit');
    setExitItem({
      id: item.id,
      date: new Date(),
      item_id: item.item_id,
      item_id_stock: 0,
      total: item.total,
      status: item.status,
      department_id: item.department_id,
    });
    setRefresh(!refresh);
  };

  const handleDeleteExitItem = (e, id) => {
    deleteItemOut(id);
    setRefresh(!refresh);
  };

  const clearPayload = () => {
    setExitItem({
      id: null,
      date: new Date(),
      item_id: 1,
      item_id_stock: 0,
      total: 0,
      status: '',
      department_id: 1,
    });
  };

  return (
    <LayoutDashboard title="Barang Keluar" head="Barang Keluar">
      <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
        <Grid item xs={10}>
          <SearchBar />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="success"
            sx={{ width: '100%', height: '100%' }}
            onClick={() => {
              setOpenFormExit(true);
              setStatusForm('add');
              clearPayload();
            }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
      <TableItem
        current="itemOut"
        update={handleEditExitItem}
        remove={handleDeleteExitItem}
      />
      <div
        style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}
      >
        <ExportPDF dataTable={listItemsOut} titleReport="Report Barang Keluar" />
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openFormExit}
        onClose={() => setOpenFormExit(!openFormExit)}
        closeAfterTransition
      >
        <Fade in={openFormExit}>
          <Box sx={style} component="form" noValidate>
            <Typography variant="h5" align="center" sx={{ mb: 2 }}>
              Form Barang Keluar
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Barang
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={exitItem.item_id}
                      label="Satuan Barang"
                    >
                      {listItems?.map((el) => (
                        <MenuItem
                          key={el.id}
                          value={el.id}
                          onClick={() =>
                            setExitItem({
                              ...exitItem,
                              item_id: el.id,
                              item_id_stock: el.stock,
                            })
                          }
                        >
                          {el.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <TextField
                    name="total"
                    required
                    fullWidth
                    id="total"
                    label="Total"
                    value={exitItem.total}
                    onChange={(e) =>
                      setExitItem({ ...exitItem, total: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <TextField
                    name="status"
                    fullWidth
                    id="status"
                    label="Status"
                    value={exitItem.status}
                    onChange={(e) =>
                      setExitItem({ ...exitItem, status: e.target.value })
                    }
                  />
                </Grid>

                <Grid item xs={12} sx={{ mt: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Divisi
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={exitItem?.department_id || 1}
                      label="Divisi"
                      onChange={(e) =>
                        setExitItem({
                          ...exitItem,
                          department_id: e.target.value,
                        })
                      }
                    >
                      {listDepartments?.map((el) => (
                        <MenuItem key={el.id} value={el.id}>
                          {el.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid item xs={6}>
                {/* <CustomDatePicker /> */}
                <DayPicker
                  mode="single"
                  selected={exitItem.date}
                  onSelect={(date) => setExitItem({ ...exitItem, date })}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmitItemOUt}
            >
              Submit
            </Button>
          </Box>
        </Fade>
      </Modal>
    </LayoutDashboard>
  );
};

export default BarangKeluar;
