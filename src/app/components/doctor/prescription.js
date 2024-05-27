import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { CreateBookingContext } from "@/app/context/newbookingcontext";
import { Grid } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PrescriptionPage({ data }) {
  const { prescriptionPage, setPrescriptionPage } =
    React.useContext(CreateBookingContext);

  const handleClose = () => {
    setPrescriptionPage(false);
  };

  return (
    <Dialog
      fullScreen
      open={prescriptionPage}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar sx={{ backgroundColor: "white" }}>
          <IconButton
            autoFocus
            edge="start"
            color="error"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1, color:'green' }} variant="h6" component="div">
            Token No : {data.TokenNo}
          </Typography>
          <Button color="error" onClick={handleClose}>
            Reject
          </Button>
          <Button color="success" onClick={handleClose}>
            To Pharmacy
          </Button>
        </Toolbar>
      </AppBar>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        padding={2}
      >
        <Grid item xs={3} padding={2}>
          <Typography
            sx={{ ml: 2, flex: 1 }}
            variant="button"
            component="div"
          >
            Name : {data.Patient.PatientName}
          </Typography>
        </Grid>
        <Grid item xs={3} padding={2}>
          <Typography
            sx={{ ml: 2, flex: 1 }}
            variant="button"
            component="div"
          >
            Place : {data.Patient.Place}
          </Typography>
        </Grid>
        <Grid item xs={3} padding={2}>
          <Typography
            sx={{ ml: 2, flex: 1 }}
            variant="button"
            component="div"
          >
            Contact : {data.Patient.ContactNo}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      
    </Dialog>
  );
}
