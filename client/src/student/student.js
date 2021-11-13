import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function Student() {
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
            <ButtonGroup variant="outlined" aria-label="outlined button group">
                <Button>One</Button>
                <Button>Two</Button>
                <Button>Three</Button>
                <Button>Four</Button>
                <Button>Five</Button>
            </ButtonGroup>
            <br />
            <TextField fullWidth multiine variant="filled" id="outlined-multiline-static" label="Question" />

        </Box>
    );
}

export default Student;
