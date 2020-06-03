import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  getVoicemail,
  cleanVoiceMail,
  patchVoicemail,
} from "redux/actions/voicemail";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Select, MenuItem, Button, ButtonGroup } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function VoicemailTable() {
  const classes = useStyles();

  const { voicemail, disabled } = useSelector(
    (state) => ({
      voicemail: state.voicemail,
      disabled: state.voicemail.post
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const getVoiceMail = (id) => {
    dispatch(getVoicemail(id));
  };

  useEffect(() => {
    getVoiceMail();
    return dispatch(cleanVoiceMail());
  }, [dispatch]);

  const changeStatus = (status, row) => {
    let data = { data: {} };
    data.data.folder = status;
    dispatch(patchVoicemail(data, row.media_id));
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">From</TableCell>
            <TableCell align="right">To</TableCell>
            <TableCell align="right">Duration</TableCell>
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
                <ButtonGroup variant="text" aria-label="outlined button group">
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
  );
}
