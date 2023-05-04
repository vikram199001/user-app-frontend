import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Avatar,
  Box,
  Button,
  Container,
  GlobalStyles,
  Grid,
  SvgIcon,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { EmailOutlined, AddLocationAltOutlined, Email } from "@mui/icons-material";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PhoneIcon from "@mui/icons-material/Phone";
import { BorderAll, Margin } from "@mui/icons-material";
import { getById, updateUserService } from "./services/usersService";
interface userType {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
}
const useStyles = makeStyles((theme: any) => ({
  main: {
    height: "100%",
    alignItem: "center",
    justifyContent: "center",
    display: "flex",
    margin: "100px",
    "@media (max-width: 420px)": {
      margin: "0px",
    },
  },
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
  customGrid: {
    display: "flex",
    margin: "50px  0 0 0 !important",
    "@media (max-width: 420px)": {
      marginLeft: "50px !important",
    },
  },
  title: {
    color: "#bbb3b3",
    fontSize: "16px",
  },
  desc: {
    color: "#000000",
    fontSize: "17px",
    fontWeight: 500,
  },
  icons: {
    color: "gray",
    fontSize: "15px !important",
    margin: "0 15px 0 0 !important",
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

function App() {
  const classes = useStyles();
  const [user, setUser] = useState<userType>();
  const [loader, setLoader] = useState<Boolean>(false);
  const [selectedUser, setSelectedUser] = useState<userType | any>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [error, setError] = useState<userType | any>();
 
  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  useEffect(() => {
    fetchUser(10);
  }, []);

  const fetchUser = (id: number | undefined) => {
    setLoader(true);
    getById(id)
      .then((response) => {
        if (response.data && response.data.code == "500") {
          alert("error");
          setLoader(false);
        } else {
          setUser(response.data.data[0]);
          setLoader(false);
        }
      })
      .catch((err) => {
        alert(err);
        setLoader(false);
      });
  };

  const updateUser = () => {
    const {firstName, lastName, email, city} = error;
    if((!firstName && !lastName && !email && !city)) {
    updateUserService(selectedUser)
      .then((response) => {
        if (response.data && response.data.code == "500") {
          alert("error");
        } else {
          setIsEditing(false);
          fetchUser(selectedUser?.id);
        }
      })
      .catch((err) => {
        alert(err);
        setLoader(false);
      });
    } else {
      alert('Something went wrong!!!')
    }
  };

  const editUser = (user: userType | undefined) => {
    setIsEditing(true);
    setSelectedUser(user);
  };
  const regName = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const onUserChange = (e: any) => {
    const { name, value } = e.target;
    if(value === '')
      setError({ ...error, [name]: `${name} is required.`});
    else if((name==='firstName' || name === 'lastName') && !regName.test(value))   
      setError({ ...error, [name]: `${name} is invalid.`});    
    else if(name === 'email' && !regEmail.test(value))
      setError({ ...error, [name]: `${name} is invalid.`});    
    else
      setError({ ...error, [name]: "" });
    
    setSelectedUser({ ...selectedUser, [name]: value });
  };
  return (
    <div className={classes.main}>
      {!isEditing && (
        <div>
          {loader ? (
            <h1>Loader</h1>
          ) : (
            <Grid container spacing={2} className={classes.wrapper}>
              <Grid md={2} xs={2}>
                <Avatar
                  {...stringAvatar(user?.firstName + " " + user?.lastName)}
                />
              </Grid>
              <Grid md={8} xs={8}>
                <div className={classes.title}>Name</div>
                <div className={classes.desc}>
                  {user?.firstName} {user?.lastName}{" "}
                </div>
              </Grid>
              <Grid md={2} xs={2}>
                <SvgIcon>
                  <path
                    fill="#444"
                    d="M4 8a2 2 0 1 1-3.999.001A2 2 0 0 1 4 8zM10 8a2 2 0 1 1-3.999.001A2 2 0 0 1 10 8zM16 8a2 2 0 1 1-3.999.001A2 2 0 0 1 16 8z"
                  ></path>
                </SvgIcon>
              </Grid>
              <Grid md={6} xs={12} className={classes.customGrid}>
                <Grid md={2}>
                  <AddLocationAltOutlined className={classes.icons} />
                </Grid>
                <Grid md={4}>
                  <Grid>
                    <div className={classes.title}>Address</div>
                  </Grid>
                  <Grid>
                    <div className={classes.desc}>{user?.city}</div>
                  </Grid>
                </Grid>
              </Grid>

              <Grid md={6} xs={12} className={classes.customGrid}>
                <Grid md={2}>
                  <EmailOutlined className={classes.icons} />
                </Grid>
                <Grid md={10}>
                  <Grid className={classes.title}>Email Address</Grid>
                  <Grid className={classes.desc}>{user?.email}</Grid>
                </Grid>
              </Grid>

              <Grid md={12} xs={12}>
                <Button
                  className={classes.editBtn}
                  onClick={() => editUser(user)}
                >
                  Edit Profile
                </Button>{" "}
              </Grid>
            </Grid>
          )}
        </div>
      )}

      {isEditing && (
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
      )}
    </div>
  );
}

export default App;
