import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import axios from 'axios';

function submitButtonClicked(q, u, s1, s2, s3, username) {
    console.log(q);
    console.log(u);
    axios.post("http://localhost:5000/send-question", { question: q, username: username }).then((r) => {
        console.log(r);
    }).catch(function (error) {
        console.log(error);
    });
    if (u > 0) {
        axios.post("http://localhost:5000/insert-data", { understanding: u, username: username  })

    }
    s1(-1);
    s2("");
    s3("");


}
function Student() {
    const [questionText, setQuestionText] = useState("");
    const [usernameText, setUsernameText] = useState("");
    const [understandingValue, setUnderstanding] = useState(-1);




    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& > *': {
                    m: 1,
                },
                mx: "auto",
                width: "50%"
            }}
        >

            <Typography>
                On a scale of 1-5, how much do you understand the content currently being presented?

            </Typography>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
                <Button onClick={e => setUnderstanding(1)}>One</Button>
                <Button onClick={e => setUnderstanding(2)}>Two</Button>
                <Button onClick={e => setUnderstanding(3)}>Three</Button>
                <Button onClick={e => setUnderstanding(4)}>Four</Button>
                <Button onClick={e => setUnderstanding(5)}>Five</Button>
            </ButtonGroup>

            <br />
            <Typography>
                Enter question for the lecturer here:
            </Typography>
            <TextField fullWidth multiline variant="filled" value={usernameText} id="outlined-multiline-static" label="Username" onChange={e => setUsernameText(e.target.value)} />
            <br />
            <TextField fullWidth multiline variant="filled" value={questionText} id="outlined-multiline-static" label="Question" onChange={e => setQuestionText(e.target.value)} />
            <br />
            <Button variant="outlined" onClick={() => submitButtonClicked(questionText, understandingValue, setUnderstanding, setQuestionText, setUsernameText, usernameText)} >Submit</Button>

        </Box >
    );
}

export default Student;
