import  React,{useState,useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';



import axios from 'axios';


import Userdetails from "./Userdetails"
import UserEdit from './UserEdit'
import AddUser from './AddUser';

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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



export default function Users() {
        const[users,setUsers] = useState([])
        const[userid,setUserid] = useState('')
        const[editUserid,setEditUserid] = useState('')
        const [page, setPage] = useState(0);
        const [rowsPerPage, setRowsPerPage] = useState(10);

        const [open, setOpen] = React.useState(false);
        const [editOpen, setEditOpen] = React.useState(false);
        const [addOpen, setAddOpen] = React.useState(false);
        const[user,setUser] = useState([])
        const[editUser,setEditUser] = useState([])
        const[addUser,setAddUser] = useState([])
        const [openSnackbar, setOpenSnackbar] = React.useState(false);
        const [openSnackbarAdd, setOpenSnackbarAdd] = React.useState(false);
        const [openSnackbarUpdated, setOpenSnackbarUpdated] = React.useState(false);

        const [value, setValue] = React.useState('recents');
    
        useEffect(()=>{
        axios.get(`https://reqres.in/api/users?page=2`).then((res)=>{

            setUsers(res.data.data)
            

        })
        .catch((err)=>{
            console.log(err)
        });
               

    },[])

   

    const userDeletebyID = (id) => {
        axios.delete(`https://reqres.in/api/users/${id}`)
            .then((res)=>{
                
                    console.log('user deleted', res) 
                    setOpenSnackbar(true); 
                
            })
            .catch((err)=>{
                
                console.log("error ", err)
             
            })
        }



        
  
    
        useEffect(()=>{
            axios.get(`https://reqres.in/api/users/${userid}`).then((res)=>{
    
                setUser(res.data.data)
    
            })
            .catch((err)=>{
                console.log(err)
            });
                   
    
        },[userid])


        const edit = (id) => {
            axios.get(`https://reqres.in/api/users/${id}`).then((res)=>{
    
                setEditUser(res.data.data)
    
            })
            .catch((err)=>{
                console.log(err)
            });
                   
    
        }


        const handleSubmit = (event) => {
            event.preventDefault();  
            const data = new FormData(event.currentTarget);
        
            axios.put(`https://reqres.in/api/users/${editUserid}`, {
                "first_name": data.get('First Name'),
                "last_name": data.get('Last Name'),
                "email": data.get('email'),
              })
              .then((res)=>{
        
                console.log(res.data)
                handleEditClose()
                setOpenSnackbarUpdated(true)
                
        
              })
        
              .catch((err)=>{
        
                console.log(err)
        
              })
            
          };
        

      

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



   





    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

      const handleClickOpen = (id) => {
        setOpen(true);
        setUserid(id)
      };
      const handleClose = () => {
        setOpen(false);
        setUserid('')
      };
    

      const handleEditClickOpen = (id) => {
        edit(id) 
        setEditOpen(true);
        setEditUserid(id)
      };
      const  handleEditClose = () => {
        setEditOpen(false);
        setEditUserid('')
      };
    
      const handleAddClickOpen = () => {
        setAddOpen(true);
      };
      const  handleAddClose = () => {
        setAddOpen(false);
        setValue('')
        setAddUser('')
    
      };



      const handleAddSubmit = (event) => {
        event.preventDefault();  
        const data = new FormData(event.currentTarget);
    
        axios.post(`https://reqres.in/api/users`, {
            "first_name": data.get('First Name'),
            "last_name": data.get('Last Name'),
            "email": data.get('email'),
          })
          .then((res)=>{
    
            console.log(res.data)
            handleAddClose()
            setOpenSnackbarAdd(true)
    
          })
    
          .catch((err)=>{
    
            console.log(err)
    
          })
        
      };

      const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenSnackbar(false);
        setOpenSnackbarAdd(false);
        setOpenSnackbarUpdated(false)
      };

      const action = (
        <React.Fragment>
          <Button color="secondary" size="small" onClick={handleCloseSnackbar }>
            CLOSE
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackbar }
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );
    


  return (
<Paper>
    <Userdetails 
     handleClose={handleClose}
     open={open} 
     user={user}
     />
     <UserEdit
     handleEditClose={handleEditClose}
     editOpen={editOpen} 
     editUser={editUser}
     handleSubmit={handleSubmit}
     setEditUser={setEditUser}
     />
     <AddUser
     handleAddClose={handleAddClose}
     addOpen={addOpen} 
     addUser={addUser}
     handleAddSubmit={handleAddSubmit}
     setAddUser={setAddUser}
     />
     <BottomNavigation sx={{ width: "100%" }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="Recents"
        value="recents"
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        label="Favorites"
        value="favorites"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="Nearby"
        value="nearby"
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction label="Add User" value="Add" onClick={handleAddClickOpen} icon={<AddCircleIcon/>} />
    </BottomNavigation>
    <TableContainer >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="right">FIRST NAME</StyledTableCell>
            <StyledTableCell align="right">LAST NAME</StyledTableCell>
            <StyledTableCell align="right">EMAIL</StyledTableCell>
            <StyledTableCell align="right">ACTION</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell >{row.id}</StyledTableCell>
              <StyledTableCell align="right">{row.first_name}</StyledTableCell>
              <StyledTableCell align="right">{row.last_name}</StyledTableCell>
              <StyledTableCell align="right">{row.email}</StyledTableCell>
              <StyledTableCell align="right">
              <IconButton aria-label="User Details" onClick={()=>handleClickOpen(row.id)}>
        <VisibilityIcon />
      </IconButton>
      <IconButton aria-label="EDIT" onClick={()=>handleEditClickOpen(row.id)}>
        <EditIcon />
      </IconButton>
              <IconButton aria-label="delete" onClick={()=>userDeletebyID(row.id)}>
        <DeleteIcon />
      </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={user.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="successfully deleted"
        action={action}
        
      />
      <Snackbar
        open={openSnackbarAdd}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="successfully Added"
        action={action}
        
      />
      <Snackbar
        open={openSnackbarUpdated}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="successfully Updated"
        action={action}
        
      />
    </Paper>
  );
}
