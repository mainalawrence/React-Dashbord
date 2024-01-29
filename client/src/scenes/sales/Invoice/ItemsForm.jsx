import React from 'react'
import {
    Typography,
    Grid,
  TextField,
    Box,
    PlusIcon,
  } from '@mui/material';
export default function ItemsForm() {
  return (
      <Box sx={{
        margin:'3%',
        display:'flex',
        flexDirection:'column',
        gap:'3',
      }}>
        <Grid  >
        <TextField/>
        <TextField/>
        <TextField/>
        <TextField/>
        </Grid>
        <Grid>
        <TextField/>
        <TextField/>
        <TextField/>
        <TextField/>
        </Grid>
        <Grid>
        <TextField/>
        <TextField/>
        <TextField/>
        <TextField/>
        </Grid>
     
      </Box>
  )
}
