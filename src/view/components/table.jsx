import React, { useEffect, Fragment, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  cleanVoiceMail,
  patchVoicemail,
  setVoicemailId,
} from "redux/actions/voicemail";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, ButtonGroup, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  text: {
    marginBottom: "1em",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  btn: {
    marginTop: "1em",
  },
}));

export default function VoicemailTable() {
  const classes = useStyles();
  const [step, setStep] = useState(true);
  const dispatch = useDispatch();
  const [mailId, setMailId] = useState("");

  const textChange = (event) => {
    setMailId(event.target.value);
  };
  //CLEAN REDUX STORE WHEN COMPONENT WILL UNMOUNT
  useEffect(() => {
    return () => dispatch(cleanVoiceMail());
  }, [dispatch]);

  const { voicemail, disabled } = useSelector(
    (state) => ({
      voicemail: state.voicemail,
      disabled: state.voicemail.post,
    }),
    shallowEqual
  );

  //SEND VOICEMAIL ID TO REDUX STORE 
  const setVoiceMail = () => {
    setStep(false);
    dispatch(setVoicemailId(mailId));
  };


  // UPDATE STATUUS FROM VOICEMAIL
  const changeStatus = (status, row) => {
    let data = { data: {} };
    data.data.folder = status;
    dispatch(patchVoicemail(data, row.media_id));
  };

  return (
    <Fragment>
      {step ? (
        <div className={classes.form}>
          <TextField
            id="outlined-basic"
            label="voicemail id"
            variant="outlined"
            className={classes.text}
            value={mailId}
            onChange={textChange}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setVoiceMail(mailId);
            }}
          >
            Next
          </Button>
        </div>
      ) : (
        <Fragment>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Status</TableCell>
                  <TableCell align="center">From</TableCell>
                  <TableCell align="center">To</TableCell>
                  <TableCell align="center">Duration</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {voicemail.data.map((row) => (
                  <TableRow key={row.from}>
                    <TableCell align="left">{row.folder}</TableCell>
                    <TableCell align="left">{row.from}</TableCell>
                    <TableCell align="right">{row.to}</TableCell>
                    <TableCell align="right">{`${(row.length / 60).toFixed(
                      2
                    )} minutes`}</TableCell>
                    <TableCell align="center">
                      <ButtonGroup
                        variant="text"
                        aria-label="outlined button group"
                      >
                        <Button
                          color="primary"
                          disabled={disabled}
                          onClick={() => changeStatus("saved", row)}
                        >
                          Saved
                        </Button>
                        <Button
                          color="secondary"
                          disabled={disabled}
                          onClick={() => changeStatus("deleted", row)}
                        >
                          Deleted
                        </Button>
                        <Button
                          disabled={disabled}
                          onClick={() => changeStatus("new", row)}
                        >
                          new
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              dispatch(cleanVoiceMail());
              setStep(true);
            }}
            className={classes.btn}
          >
            Previous
          </Button>
        </Fragment>
      )}
    </Fragment>
  );
}
