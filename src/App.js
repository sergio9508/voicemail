import React from 'react';
import VoicemailTable from 'view/components/table';
import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  app:{
    marginTop: "2em"
  }
})

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <Container maxWidth="lg" className={classes.app}>
        <VoicemailTable></VoicemailTable>
      </Container>
    </div>
  );
}

export default App;
