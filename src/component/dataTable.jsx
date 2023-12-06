import React, { useState, useEffect } from "react";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TableContainer from "@mui/material/TableContainer";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Axios from "axios";
import { Link } from "react-router-dom";

// ICON
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const ProdukTable = () => {
  const [produk, setProduk] = useState([]);
  const [status, setStatus] = useState("");

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const [DialogOpen, setDialogOpen] = useState(false);
  const [DeleteId, setDeleteId] = useState(null);

  const openDialog = (id) => {
    setDeleteId(id);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDeleteId(null);
    setDialogOpen(false);
  };

  const handleFormDelete = async () => {
    closeDialog();

    setProduk((prevProduk) =>
      prevProduk.filter((item) => item.id !== DeleteId)
    );

    try {
      const apiURL = process.env.REACT_APP_URL;
      const response = await Axios.delete(`${apiURL}/produk/${DeleteId}`);

      if (response.status === 200) {
        alert("Successfully deleted");
      } else {
        throw new Error("Server error");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete");
    }
  };

  const fetchData = async () => {
    try {
      const apiURL = process.env.REACT_APP_URL;
      let response = await Axios.get(`${apiURL}/produk?nama_status=${status}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    async function loadData() {
      const data = await fetchData();
      setProduk(data.dataProduk);
    }
    loadData();
  }, [status]);

  const handleAPI = async () => {
    try {
      const apiURL = process.env.REACT_APP_URL;
      await Axios.get(`${apiURL}/`);
      
    } catch (error) {
      console.error(error);
    }
    // window.location.reload();
  };

  return (
    <>
      <div style={{ marginTop: "15px", marginBottom:"15px"}}>
        <Link
          to={`/produk/addData`}
          style={{ marginRight: "10px" }}
        >
          <Button variant="contained">Tambah Data</Button>
        </Link>

        <Button variant="contained" onClick={() => handleAPI()}>
          Get Data from API
        </Button>
      </div>

      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">sort</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            label="status"
            onChange={handleChange}
          >
            <MenuItem value={""}>Semua</MenuItem>
            <MenuItem value={"bisa%20dijual"}>Bisa Dijual</MenuItem>
            <MenuItem value={"tidak%20bisa%20dijual"}>
              Tidak Bisa Dijual
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper} sx={{ marginTop: "15px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nama</TableCell>
              <TableCell align="center">Kategori</TableCell>
              <TableCell align="center">Harga</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produk.map((row) => (
              <TableRow
                key={row.nama_produk}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.nama_produk}
                </TableCell>
                <TableCell align="center">{row.kategori.nama_kategori}</TableCell>
                <TableCell align="center">{row.harga}</TableCell>
                <TableCell align="center">{row.status.nama_status}</TableCell>
                <TableCell align="center">
                  <Link to={`/produk/${row.id}/editData`}>
                    <EditIcon style={{ marginRight: "10px" }} />
                  </Link>

                  <DeleteForeverIcon
                    method="delete"
                    action="destroy"
                    onClick={() => openDialog(row.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={DialogOpen}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>No</Button>
          <Button onClick={handleFormDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default ProdukTable;
