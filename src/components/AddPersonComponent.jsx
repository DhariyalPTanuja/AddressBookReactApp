import React, { Component } from 'react'
import Typography from '@mui/material/Typography';
import { Card, CardContent, FormControl, FormGroup, Grid, TextField, Button, MenuItem, Select, InputLabel } from '@mui/material';
import { Box } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

import { useNavigate, useParams } from 'react-router-dom';
import PersonService from '../services/PersonService';


//export useParams and useNavigation Hook
export const withRouter = (WrappedComponent: Component) => (props) => {
    const params = useParams();
    const navigate = useNavigate();
    
    return <WrappedComponent {...props} params = {params} navigate = {navigate} />
}

class AddPersonComponent extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
         id: this.props.params.id,
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            address: '',
            city: '',
            district: '',
            state: '',
            zipCode: '',
            isUpdate: false,
        }
       // this.setUpdateData = this.setUpdateData.bind(this);
        console.log(this.state.id);
         
        

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.saveOrUpdatePerson = this.saveOrUpdatePerson.bind(this);
        this.reset = this.reset.bind(this);
    
    }

    componentDidMount() {
        // to check condition for  emp id 
        if (this.state.id === '_addID') {
            return
        } else {
        PersonService.getDataById(this.state.id).then((res) => {
             let person = res.data.data;
            this.setState({
                firstName: person.firstName,
                lastName: person.lastName,
                email: person.email,
                phoneNumber: person.phoneNumber,
                address: person.address,
                city: person.city,
                district: person.district,
                state: person.state,
                zipCode: person.zipCode,
                isUpdate: true,
            });
            console.log("check update data", person);
            
        });
    }
} 
 
    //save and Update in the same form
    saveOrUpdatePerson = (e) => {
        e.preventDefault();
        let personData = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address,
            city: this.state.city,
            district: this.state.district,
            state: this.state.state,
            zipCode: this.state.zipCode
        };
        console.log("data after click edit" , personData);
           // console.log('person =>' + JSON.stringify(personData));
           if (this.state.id !== '_addID' && this.state.isUpdate) {
            console.log(this.state.id);
            PersonService.updatePersonData(personData, this.state.id).then( res => {
                console.log("data update successfully", res);
                this.props.navigate(`/persons`);
            });
           }
           else {
            PersonService.addPerson(personData).then((response) => {
                console.log("data added successfully", response);
                this.props.navigate('/persons');
            });
           }
        }
  
    
    
    
    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
   
viewUserPage() {
    this.props.navigate('/');
}
reset() {
    console.log("reset value");
    this.setState({ 
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        city: '',
        district: '',
        state: '',
        zipCode: ''
    })
}
getTitle(){
    if(this.state.id === '_addID'){
    return <Typography variant="h6" noWrap component="div"
                                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }} gutterBottom >
                               Add Person Address Form
                            </Typography>
    }
    else {
        return <Typography variant="h6" noWrap component="div"
                                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }} gutterBottom >
                                   Update Person Address Form
                                </Typography> 
    }
}

    render() {
        return (
            <div>
              <Card sx={{ minWidth: 275, margin: 'auto', border: '1px solid black', width: '50%' }}>
                    <CardContent>

                        <Box component="div" sx={{
                            p: 2, border: '1px solid grey', position: 'relative', margin: 'auto',
                            bgcolor: 'blue'
                        }}>
                          {this.getTitle()}  
                            {/* <Typography variant="h6" noWrap component="div"
                                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }} gutterBottom >
                                Person Address Form
                            </Typography> */}
                            <IconButton aria-label="close" sx={{ position: 'absolute', right: 8, top: 8, }} onClick={this.viewUserPage.bind(this)}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        <Box component="div" sx={{ p: 2, border: '1px solid grey', display: 'block' }}>
                            <FormGroup>
                                <FormControl >
                                    <Box component="form" sx={{ '& > :not(style)': { m: 2, width: '30ch' }, }}
                                        noValidate autoComplete="off" >

                                        <TextField id="outlined-basic" label="First Name" variant="outlined" name="firstName" value={this.state.firstName} onChange={this.onChangeHandler} />
                                        <TextField id="outlined-basic" label="Last Name" variant="outlined" name="lastName" value={this.state.lastName} onChange={this.onChangeHandler} />
                                    </Box>
                                </FormControl>
                                <FormControl>
                                    <Box component="form" sx={{ '& > :not(style)': { m: 2, width: '30ch' }, }}
                                        noValidate autoComplete="off" >
                                        <TextField id="outlined-basic" label="Phone Number" variant="outlined" name="phoneNumber" value={this.state.phoneNumber} onChange={this.onChangeHandler} />
                                        <TextField id="outlined-basic" label="Email" variant="outlined" name="email" value={this.state.email} onChange={this.onChangeHandler} />
                                    </Box>

                                </FormControl>

                                <FormControl>
                                    <Box component="form" sx={{ '& > :not(style)': { m: 2, width: '65ch' }, }}
                                        noValidate autoComplete="off" >
                                        <TextField id="outlined-basic" label="Address" variant="outlined" name="address" value={this.state.address} onChange={this.onChangeHandler} />
                                    </Box>
                                </FormControl>
                                <FormControl>
                                    <Box component="form" sx={{ '& > :not(style)': { m: 2, width: '30ch' }, }}
                                        noValidate autoComplete="off" >

                                        <TextField id="city" label="City" variant="outlined" name="city" value={this.state.city} onChange={this.onChangeHandler} />


                                        <TextField id="outlined-basic" label="District" variant="outlined" name="district" value={this.state.district} onChange={this.onChangeHandler} />

                                    </Box>
                                </FormControl>
                                <FormControl>
                                    <Box component="form" sx={{ '& > :not(style)': { m: 2, width: '30ch' }, }}
                                        noValidate autoComplete="off" >

                                        <TextField id="outlined-basic" label="State" variant="outlined" name="state" value={this.state.state} onChange={this.onChangeHandler} />
                                        <TextField id="outlined-basic" label="Zip Code" variant="outlined" name="zipCode" value={this.state.zipCode} onChange={this.onChangeHandler} />
                                    </Box>
                                </FormControl>
                                <FormControl>
                                    <Box component="form" sx={{ '& > :not(style)': { m: 2, width: '20ch' }, }}
                                        noValidate autoComplete="off" >
                                             <Button variant="contained" color="secondary" onClick={this.saveOrUpdatePerson} endIcon={<SendIcon />}>{this.state.isUpdate ? 'Update' : 'Submit'}</Button>
                                        <Button variant="contained" onClick={this.reset} >Reset</Button>
                                       
                                    </Box>
                                </FormControl>
                            </FormGroup>
                        </Box>
                    </CardContent>
                </Card>




            </div>
        )
    }

}
export default withRouter(AddPersonComponent);