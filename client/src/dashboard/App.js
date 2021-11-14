import Grid from '@mui/material/Grid';
import VerticalBar from "./VerticalBar.js";
import ChatList from "./Questions.js";

function App() {
  return (
    <div>


      <Grid container spacing={2}>
        <Grid item xs={6}>

          <VerticalBar />

        </Grid>
        <Grid item xs={6}>

          <ChatList />

        </Grid>

      </Grid >
    </div>

  );
}

export default App;
