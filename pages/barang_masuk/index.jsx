import React, { useEffect, useState } from 'react';
import LayoutDashboard from '../../components/LayoutDashboard';
import TableItem from '../../components/TableItem';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  createItemIn,
  deleteItemIn,
  editItemIn,
  fetchDepartment,
  fetchItem,
  fetchItemIn,
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
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

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

const BarangMasuk = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const listItems = useSelector((state) => state.item.listItems);
  const listDepartments = useSelector(
    (state) => state.department.listDepartments
  );

  const [refresh, setRefresh] = useState(false);
  const [enterItem, setEnterItem] = useState({
    id: null,
    date: new Date(),
    item_id: 1,
    total: 0,
    status: '',
    department_id: 1,
  });
  const [openFormEnter, setOpenFormEnter] = useState(false);
  const [statusForm, setStatusForm] = useState('add');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/auth');
    } else {
      getUserLogin(dispatch);
      fetchItem(dispatch);
      fetchItemIn(dispatch);
      fetchDepartment(dispatch);
    }
  }, [refresh, dispatch, router]);

  const handleSubmitItemIn = (e) => {
    e.preventDefault();
    const payload = enterItem;
    if (statusForm === 'add') {
      createItemIn(payload, dispatch);
    } else if (statusForm === 'edit') {
      editItemIn(payload.id, payload);
    }
    clearPayload();
    setOpenFormEnter(false);
    setRefresh(!refresh);
  };

  const handleEditEnterItem = (e, item) => {
    setOpenFormEnter(true);
    setStatusForm('edit');
    setEnterItem({
      id: item.id,
      date: new Date(),
      item_id: item.id,
      total: item.total,
      status: item.status,
      department_id: item.department_id,
    });
    setRefresh(!refresh);
  };

  const handleDeleteEnterItem = (e, id) => {
    deleteItemIn(id);
    setRefresh(!refresh);
  };

  const clearPayload = () => {
    setEnterItem({
      id: null,
      date: new Date(),
      item_id: 1,
      total: 0,
      status: '',
      department_id: 1,
    });
  };

  return (
    <LayoutDashboard title="Barang Masuk" head="Barang Masuk">
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
              setOpenFormEnter(true);
              setStatusForm('add');
              clearPayload();
            }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
      <TableItem
        current="itemIn"
        update={handleEditEnterItem}
        remove={handleDeleteEnterItem}
      />

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openFormEnter}
        onClose={() => setOpenFormEnter(!openFormEnter)}
        closeAfterTransition
      >
        <Fade in={openFormEnter}>
          <Box sx={style} component="form" noValidate>
            <Typography variant="h5" align="center" sx={{ mb: 2 }}>
              Form Barang Masuk
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
                      value={enterItem?.item_id}
                      label="Satuan Barang"
                      onChange={(e) =>
                        setEnterItem({ ...enterItem, item_id: e.target.value })
                      }
                    >
                      {listItems?.full?.map((el) => (
                        <MenuItem key={el.id} value={el.id}>
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
                    value={enterItem.total}
                    onChange={(e) =>
                      setEnterItem({ ...enterItem, total: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <TextField
                    name="status"
                    fullWidth
                    id="status"
                    label="Status"
                    value={enterItem.status}
                    onChange={(e) =>
                      setEnterItem({ ...enterItem, status: e.target.value })
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
                      value={enterItem?.department_id || 1}
                      label="Divisi"
                      onChange={(e) =>
                        setEnterItem({
                          ...enterItem,
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
                  selected={enterItem.date}
                  onSelect={(date) => setEnterItem({ ...enterItem, date })}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmitItemIn}
            >
              Submit
            </Button>
          </Box>
        </Fade>
      </Modal>
    </LayoutDashboard>
  );
};

export default BarangMasuk;
