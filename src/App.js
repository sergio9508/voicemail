import React from 'react';
import VoicemailTable from 'view/components/table';
import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  app:{
    height: "100vh",
    background: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  title:{
    textAlign: "center",
    color: "#000"
  }
})

function App() {
  const classes = useStyles();
  return (
    <div className="App" className={classes.app}>
      <Container maxWidth="lg">
        <h1 className={classes.title}>VOICEMAIL LIST</h1>
        <VoicemailTable></VoicemailTable>
      </Container>
    </div>
  );
}

export default App;
