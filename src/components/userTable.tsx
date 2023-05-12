import { AddLocationAltOutlined, EmailOutlined } from "@mui/icons-material"
import { Avatar, Button, Grid, SvgIcon } from "@mui/material"
import { makeStyles } from "@mui/styles";

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

export const UserTable = ({stringAvatar, user, editUser}: any) => {
    const classes = useStyles();
    return (
        <div>
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
        </div>
    )
}