import Grid from '@mui/material/Grid';
import VerticalBar from "./VerticalBar.js";
import ChatList from "./Questions.js";
import LineChart from "./attentionChart.js"
function App() {
  return (
    <div>


      <Grid container spacing={2}>
        <Grid item xs={6}>

          <VerticalBar />
          <LineChart />

        </Grid>
        <Grid item xs={6}>

          <ChatList />

        </Grid>

      </Grid >
    </div>

  );
}

export default App;
