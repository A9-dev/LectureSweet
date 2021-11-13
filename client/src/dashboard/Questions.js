import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const chatList = () => {
    <>
        <List>

            <ListItem>
                <ListItemText
                    primary="Single-line item"
                    secondary="Here is my question to the lecturer"
                />
            </ListItem>

        </List>
    </>

}
export default chatList;