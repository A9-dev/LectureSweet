import Container from '@mui/material/Container';
import VerticalBar from "./VerticalBar.js";
import ChatList from "./Questions.js";

function App() {
  return (
      <Container maxWidth="sm">
        <VerticalBar/>  
        <br/>
        <ChatList/>  

      </Container>
  );
}

export default App;
