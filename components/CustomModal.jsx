import React from "react";
import {
  Box,
  Fade,
  Link,
  Modal,
  TextField,
  Typography,
  Button,
  Grid,
} from "@mui/material";

const CustomModal = ({ current }) => {
  const renderUserForm = () => {
    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openAdd}
        onClose={() => setOpenAdd(!openAdd)}
        closeAfterTransition
      >
        <Fade in={openAdd}>
          <Box sx={style} component="form" noValidate onSubmit={handleAddUser}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="fullname"
                  required
                  fullWidth
                  id="fullname"
                  label="Full Name"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add User
            </Button>
          </Box>
        </Fade>
      </Modal>
    );
  };

  const renderBaseType = (type) => {
    let render;
    switch (type) {
      case "user":
        render = renderUserForm();
        break;

      default:
        break;
    }
    return render;
  };

  return <div>{renderBaseType(current)}</div>;
};

export default CustomModal;
