import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import React, { useState } from 'react';



function ChatList() {

    const axios = require('axios');
    const [messages, setMessages] = useState([]);

    axios.get("/questions").then(function (response) {
        setMessages(response);
    }).catch(function (error) {
        console.log(error);
    })

    return (
        messages.length ? (


            <Box sx={{ border: 1, borderRadius: 1, }}>
                <List>



                    {/* 
                <ListItem>
                <ListItemText
                primary="Henry Pearson (hp1n21)"
                secondary="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                />
                </ListItem>
            <Divider /> */}

                </List>
            </Box>
        ) : null
    );

}
export default ChatList;