import { Grid, TextField, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles((theme: any) => ({
  wrapper: {
    background: "#fbf1f1",
    padding: "37px",
    "@media (max-width: 420px)": {
      marginTop: "20px !important",
    },
  },
  editBtn: {
    width: "100%",
    backgroundColor: "#353a68 !important",
    fontWeight: "700 !important",
    color: "#fff !important",
    textTransform: "capitalize",
    borderRadius: "10px !important",
    margin: "160px 0 0 0 !important",
    "@media (max-width: 420px)": {
      margin: "30px 0px !important",
    },
  },
  

 

  fullText: {
    width: "100%",
  },
  textWrapper: {
    margin: "0 25px 25px 0",
  },
  errorMessage: {
    color: "red"

  },
  
  updateBtn: {
    margin: "0 200px",
    "@media (max-width: 420px)": {
      margin: "0px 0px !important",
      width: "100%",
      "& button": {
        margin: "5px 0px !important",
      },
    },
  },
}));
interface error {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
}
interface UserFormType {
  onUserChange: (e: any) => void;
  selectedUser: any;
  error: error;
  updateUser : () => void;
}



export const UserForm = ({onUserChange, selectedUser, error, updateUser }: UserFormType) => {
  const classes = useStyles();
  return (
    <div>
      <Grid
        container
        className={classes.wrapper}
        style={{ justifyContent: "center" }}
      >
        <Grid md={6} className={classes.textWrapper}>
          <TextField
            id="outlined-basic"
            label="Firstname"
            variant="outlined"
            name="firstName"
            onChange={onUserChange}
            value={selectedUser?.firstName || ""}
            className={classes.fullText}
          />
          <span className={classes.errorMessage}>{error?.firstName}</span>
        </Grid>
        <Grid md={6} className={classes.textWrapper}>
          <TextField
            id="outlined-basic"
            label="Lastname"
            variant="outlined"
            name="lastName"
            onChange={onUserChange}
            value={selectedUser?.lastName || ""}
            className={classes.fullText}
          />
          <span className={classes.errorMessage}>{error?.lastName}</span>
        </Grid>
        <Grid md={6} className={classes.textWrapper}>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            name="email"
            onChange={onUserChange}
            value={selectedUser?.email || ""}
            className={classes.fullText}
          />
          <span className={classes.errorMessage}>{error?.email}</span>
        </Grid>
        <Grid md={6} className={classes.textWrapper}>
          <TextField
            id="outlined-basic"
            label="City"
            variant="outlined"
            name="city"
            onChange={onUserChange}
            value={selectedUser?.city || ""}
            className={classes.fullText}
          />
          <span className={classes.errorMessage}>{error?.city}</span>
        </Grid>
        <Grid md={12} className={classes.updateBtn}>
          <Button className={classes.editBtn} onClick={() => updateUser()}>
            Update Profile
          </Button>{" "}
        </Grid>
      </Grid>
    </div>
  );
};
