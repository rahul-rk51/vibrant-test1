
import  React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { Button, DialogContent } from '@mui/material';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function UserEdit({handleEditClose,editOpen,editUser,handleSubmit,setEditUser}) {



  
  return (
    <div>
      <BootstrapDialog
        onClose={handleEditClose}
        aria-labelledby="customized-dialog-title"
        open={editOpen}
      >
        <DialogContent>
        <form onSubmit={handleSubmit} >
        <TextField
              margin="normal"
              required
              fullWidth
              id="first_name"
              value={editUser.first_name}
              onChange={e=>setEditUser({...editUser,first_name:e.target.value})}
              label="First Name"
              name="First Name"
              autoComplete="First Name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={editUser.last_name}
              onChange={e=>setEditUser({...editUser,last_name:e.target.value})}
              id="last_name"
              label="Last Name"
              name="Last Name"
              autoComplete="Last Name"
              autoFocus
            />
         
             <TextField
              margin="normal"
              required
              fullWidth
              value={editUser.email}
              onChange={e=>setEditUser({...editUser,email:e.target.value})}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
           
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             Edit
            </Button>
          </form>
    </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
