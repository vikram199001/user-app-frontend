import React, { useEffect, useState } from "react";
import { Loader } from './components/loader'
import { makeStyles } from "@mui/styles";
import { getById, updateUserService } from "./services/usersService";
import { UserTable } from './components/userTable';
import { UserForm } from './components/userForm';
import "./App.css";

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
    fetchUser(1);
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
    debugger
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
    else if((name ==='firstName' || name === 'lastName' || name ==='city') && !regName.test(value))   
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
            <Loader />
          ) : (
            <UserTable stringAvatar={stringAvatar} user={user}  editUser={editUser}/>
          )}
        </div>
      )}

      {isEditing && (
        <UserForm onUserChange={onUserChange} error={error} selectedUser={selectedUser} updateUser={updateUser} />
      )}
    </div>
  );
}

export default App;
