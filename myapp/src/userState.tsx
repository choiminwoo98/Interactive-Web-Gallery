import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { Button, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
interface State {
  amount: string;
  password: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
}

const useStyles = makeStyles({
  flexPaper: {
    margin: 16,
    minWidth: 300,
  },
  root: {
    display: "flex",
    flexdirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#ebfaff",
  },
  ul: {
    listStyle: "none",
  },
  ol: {
    listStyle: "none",
  },
  a: { textDecoration: "none" },
  menu: {
    width: "100%",
  },
  section: {
    width: "340px",
    padding: "30px",
    backgroundColor: "#fff",
    margin: "50px auto",
    boxShadow: "10px 10px 30px rgba(0,0,0,0.1)",
    borderRadius: "10px",
    height: "50px",
  },
});
export default function UserState() {
  const classes = useStyles();
  const [values, setValues] = React.useState<State>({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <div className={classes.menu}>
          
          </div>
      </div>
    </div>
  );
}
