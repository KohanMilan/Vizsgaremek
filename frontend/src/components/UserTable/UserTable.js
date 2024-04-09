import "./UserTable.css"
import { useState } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import { Modal } from "@mui/base";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { UserEdit } from "../UserEdit/UserEdit";
import { Checkbox } from '@mui/material';


/*Felhasználók táblázata*/
export function UserTable({ rows, setRows, username }) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    'max-height': 'calc(100vh - 100px)',
    overflow: 'auto',
  };


  let [isModalOpen, setIsModalOpen] = useState(false);
  let [clickedUser, setClickedUser] = useState({});
  let [isEditModalOpen, setIsEditModalOpen] = useState(false);


  const closeModal = function () {
    setIsModalOpen(false);
  }
  const closeEditModal = function () {
    setIsEditModalOpen(false);
  }

  const saveEditModal = function (saved) {
    let index = rows.indexOf(rows.find((x) => { return x.id == saved.id }))
    rows[index] = saved
    setRows(rows.concat([]))
    setIsEditModalOpen(false);
  }

  return (
    <>
      <Modal open={isEditModalOpen}>
        <Box sx={style}>
          <UserEdit save={saveEditModal} inputUser={clickedUser} closeModal={closeEditModal} ></UserEdit>
        </Box>
      </Modal>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow style={{ borderBottom: '5px solid black', borderTop: '1px solid black' }}>
              <TableCell style={{ borderRight: '1px solid black' }} align="right">ID</TableCell>
              <TableCell style={{ borderRight: '1px solid black' }} align="right">Username</TableCell>
              <TableCell style={{ borderRight: '1px solid black' }} align="right">Email</TableCell>
              <TableCell style={{ borderRight: '1px solid black' }} align="right">Enabled</TableCell>
              <TableCell style={{ borderRight: '1px solid black' }} align="right">Firstname</TableCell>
              <TableCell style={{ borderRight: '1px solid black' }} align="right">Lastname</TableCell>
              <TableCell style={{ borderRight: '1px solid black' }} align="right">Admin</TableCell>
              <TableCell style={{ borderRight: '1px solid black' }} align="right">Delete</TableCell>
              <TableCell align="right">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow style={{ background: index % 2 == 0 ? 'silver' : 'transparent' }}
                onClick={() => {
                  if (!isEditModalOpen) {
                    setIsModalOpen(true);
                    setClickedUser(row);
                  }

                }}
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >

                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right">{row.username}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">
                  <Checkbox checked={row.enabled}></Checkbox>
                </TableCell>
                <TableCell align="right">{row.firstname}</TableCell>
                <TableCell align="right">{row.lastname}</TableCell>
                <TableCell align="right">
                  <Checkbox checked={row.admin}></Checkbox>
                </TableCell>
                <TableCell align="right">< DeleteIcon style={{ opacity: row.username != username ? '1' : '0.3' }} onClick={(e) => {
                  if (row.username == username) return
                  e.stopPropagation()
                  if (window.confirm('Are you sure you want to delete?')) {
                    axios.delete(`/user/${row.id}`).then((response) => {

                      setRows(rows.filter((x) => {
                        return x.id != row.id;
                      }))
                    }).catch((error) => {
                      if (error.response.data.status == 500) {
                        alert('User uploaded an image, please remove related images first.')
                      }
                    })
                  }
                }

                }
                ></DeleteIcon></TableCell>
                <TableCell align="right"><EditIcon onClick={(e) => {

                  e.stopPropagation();
                  if (!isModalOpen) {
                    console.log(row)
                    setClickedUser(row);
                    setTimeout(() => {
                      console.log("clicked user")
                      console.log(clickedUser)
                      setIsEditModalOpen(true);
                    }, 500)

                  }

                }

                }></EditIcon></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}