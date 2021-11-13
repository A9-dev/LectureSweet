import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react';


const axios = require('axios');

function ChatList() {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Update the document title using the browser API

        axios.get("http://localhost:5000/get-questions").then(function (response) {

            setMessages(response.data);

        }).catch(function (error) {
            console.log(error);
        })
    }, []);


    return (
        (


            <Box sx={{ border: 1, borderRadius: 1, }}>
                <List>
                    {messages.map((item) => (
                        <ListItem>
                            <ListItemText
                                primary={item.student.displayname}
                                secondary={item.question}
                            />
                        </ListItem>
                    )

                    )}


                    {/* 
                <ListItem>
                <ListItemText
                primary="Henry Pearson (hp1n21)"
                secondary="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                />
                </ListItem>
            <Divider /> */}

                </List>
            </Box >
        )
    );

}
export default ChatList;