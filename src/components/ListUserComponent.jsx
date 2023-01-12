import {
    Table, TableContainer, TableHead, TableRow,
    TableCell, TableBody, Box, Typography, IconButton,
    Card, CardContent, Button
} from '@mui/material'
import React, { Component } from 'react'
import Paper from '@mui/material/Paper';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { useNavigate } from 'react-router';
import PersonService from '../services/PersonService';

export const withNavigation = (Component: Component) => {
    return props => <Component {...props} navigate={useNavigate()} />
}

class ListUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            personData: []
        }
        this.addPersonData = this.addPersonData.bind(this);
        this.editPersonData = this.editPersonData.bind(this);
        this.deletePersonData = this.deletePersonData.bind(this);
    }
// link to Update Person Data Form 
    editPersonData(id) {
        this.props.navigate(`/add-person/${id}`);
    }
    //delete the data
    deletePersonData(id) {
        let personId = id;
        PersonService.deletePersonData(personId).then ((response) => {
            console.log(response);
        });
        window.location.reload();
    }
//fetch the address book data
componentDidMount() {
    PersonService.getAddressBookData().then((response) => {
        console.log(response);
        this.setState({ personData: response.data.data });
    });
}
    addPersonData() {
        this.props.navigate(`/add-person/_addID`);
    }
    

    render() {
        return (
            <div>
                <Card sx={{ minWidth: 275, border: '1px solid black', width: '100%' }}>
                    <CardContent>
                        <Box component="div" sx={{
                            p: 2, border: '1px solid grey', position: 'relative', margin: 'auto',
                        }}>
                            <Typography variant="h6" noWrap component="div"
                                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }} gutterBottom >
                                Person Details
                            </Typography>
                            <Button sx={{ position: 'absolute', right: 8, top: 10 }} variant="contained" color="primary"
                                onClick={this.addPersonData} startIcon={<AddIcon />} >Add Person</Button>

                        </Box>

                        <Box component="div" sx={{
                            p: 2, border: '1px solid grey', position: 'relative', margin: 'auto',
                        }}>
                            <TableContainer component={Paper} >
                                <Table>
                                    <TableHead variant="h4" sx={{bgcolor:'blue' , color: 'white', fontSize: '16px'}}>
                                        <TableRow>
                                            <TableCell> First Name</TableCell>
                                            <TableCell> Last Name</TableCell>
                                            <TableCell> Email Id</TableCell>
                                            <TableCell> Phone Number</TableCell>
                                            <TableCell>Address</TableCell>
                                            <TableCell>City</TableCell>
                                            <TableCell>District</TableCell>
                                            <TableCell>State</TableCell>
                                            <TableCell>Zip Code</TableCell>
                                            <TableCell> Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            this.state.personData.map(
                                               (person)  => (
                                                    <TableRow key={person.id}>
                                                        <TableCell> {person.firstName} </TableCell>
                                                        <TableCell> {person.lastName} </TableCell>
                                                        <TableCell> {person.email} </TableCell>
                                                        <TableCell> {person.phoneNumber} </TableCell>
                                                        <TableCell> {person.address}</TableCell>
                                                        <TableCell> {person.city} </TableCell>
                                                        <TableCell> {person.district} </TableCell>
                                                        <TableCell> {person.state} </TableCell>
                                                        <TableCell> {person.zipCode} </TableCell>

                                                        <TableCell>
                                                        <IconButton aria-label="delete" onClick={() => this.deletePersonData(person.id)}>
                                <DeleteIcon /> </IconButton>
                                <IconButton aria-label="edit"  onClick={() => this.editPersonData(person.id)}>
                                <EditIcon /> </IconButton>
                            
                        
                                                        </TableCell>
                                                    </TableRow>

                                               )) }
                                        
                                        <TableRow>

                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default withNavigation(ListUserComponent);
