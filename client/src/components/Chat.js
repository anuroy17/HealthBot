import React from 'react'
import "./Chat.css"

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import MasksIcon from '@mui/icons-material/Masks';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SendIcon from '@mui/icons-material/Send';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';


const Chat = () => {
  return (
    <div className='main'>
      <div className='nav'>
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: '#53A57D' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MedicalInformationIcon sx={{ color: '#FBF7F4' }} />
              </ListItemIcon>
              <ListItemText primary="Medical History" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MasksIcon sx={{ color: '#FBF7F4' }}/>
              </ListItemIcon>
              <ListItemText primary="Doctor Consultation" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <VaccinesIcon sx={{ color: '#FBF7F4' }} />
              </ListItemIcon>
              <ListItemText primary="Get Medicines" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <BloodtypeIcon sx={{ color: '#FBF7F4' }} />
              </ListItemIcon>
              <ListItemText primary="Lab test" />
            </ListItemButton>
          </ListItem>
          <Divider />
        </List>

        
      </nav>

    </Box>
      </div>
      <div className='bot'>
        <div className='head'>
          <div className='boticon'><SmartToyIcon sx={{ fontSize: 40 }}/></div>
          <h1>HealthBot</h1>
        </div>
        <div className='chat'>

        </div>
        <div className='message'>
        <div className='input'><input type="text"  name="message" id="message" placeholder='Type your query' /></div>
        
        <div className='out'>
        <button className='btn' ><KeyboardVoiceIcon/>Record</button>
        <button className='btn' >Send  <SendIcon/></button>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
