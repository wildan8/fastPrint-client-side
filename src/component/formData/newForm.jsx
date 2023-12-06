import React, { useState, useEffect } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { Link } from "react-router-dom";
import Axios from "axios";

import Navbar from "../navbar";

const IndexForm = () => {
  const [status, setStatus] = useState([]);
  const [kategori, setKategori] = useState([]);

  const [formNama, setFormNama] = useState("");
  const [formHarga, setFormHarga] = useState(0);
  const [FormKategori, setFormKategori] = useState("");
  const [FormStatus, setFormStatus] = useState("");
 
  const fetchKategori = async () => {
    try {
      const apiURL = process.env.REACT_APP_URL;
      let response = await Axios.get(`${apiURL}/kategori`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const fetchStatus = async () => {
    try {
      const apiURL = process.env.REACT_APP_URL;
      let response = await Axios.get(`${apiURL}/status`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    async function loadData() {
      const dataKat = await fetchKategori();
      const dataStat = await fetchStatus();
      setKategori(dataKat.dataKategori);
      setStatus(dataStat.dataStatus);
    }
    loadData();
  }, []);

  const handleSubmit = async () => {
    try {
      console.log(formHarga, formNama, FormKategori, FormStatus);
      const apiURL = process.env.REACT_APP_URL;
      const response = await Axios.post(`${apiURL}/produk`, {
        nama_produk: formNama,
        harga: formHarga,
        kategori_id: FormKategori,
        status_id: FormStatus,
      });
      setFormHarga(0);
      setFormNama("");
      setFormKategori("");
      setFormStatus("");
      console.log(response);
      if (response.ok) {
        console.log(response.data.message);
        
        alert(response.data.message);
      } else {
        console.error(response.data.message);
        
        alert(response.data.message);
      }
    } catch (error) {
      console.error(`Error: ${error.response.data.error}`);
      
      alert(error.response.data.error);
    }
  };
  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h2>Form Tambah Produk</h2>
        <Box component="form" noValidate autoComplete="off" sx={{ pt: "25px" }}>
          <div>
            <TextField
              label="Nama Produk"
              id="nama_produk"
              value={formNama}
              onChange={(event) => setFormNama(event.target.value)}
              sx={{ m: 1, width: "75ch" }}
            />
          </div>
          <div>
            <TextField
              label="harga"
              id="harga"
              sx={{ m: 1, width: "75ch" }}
              value={formHarga}
              type="number"
              onChange={(event) => setFormHarga(parseInt(event.target.value))}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Rp.</InputAdornment>
                ),
              }}
            />
          </div>
          <div>
            <TextField
              id="kategori_id"
              select
              label="Kategori"
              value={FormKategori}
              onChange={(event) =>
                setFormKategori(parseInt(event.target.value))
              }
              sx={{ m: 1, width: "75ch" }}
            >
              {kategori.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.nama_kategori}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div>
            <TextField
              id="status_id"
              select
              label="Status"
              value={FormStatus}
              onChange={(event) => setFormStatus(parseInt(event.target.value))}
              sx={{ m: 1, width: "75ch" }}
            >
              {status.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.nama_status}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div style={{ padding: 8 }}>
            <Button
              variant="contained"
              type="button"
              sx={{ marginRight: "10px" }}
              color="primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Link to={`/`}>
              <Button variant="contained" type="button" sx={{}} color="warning">
                Back
              </Button>
            </Link>
          </div>
        </Box>
      </div>
    </>
  );
};

export default IndexForm;
