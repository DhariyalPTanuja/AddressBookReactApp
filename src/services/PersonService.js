import axios from "axios";


class PersonService {
    baseUrl =  "http://localhost:8080/persons";
    getAddressBookData(){
        return  axios.get(`${this.baseUrl}/get`);
        }
     addPerson(data) {
         return  axios.post(`${this.baseUrl}/create`, data);
     }
     getDataById(personId){
        return  axios.get(`${this.baseUrl}/get/${personId}`);
    }

    updatePersonData(data, personId){
        return  axios.put(`${this.baseUrl}/update/${personId}`, data);
    }
    deletePersonData(personId){
        return   axios.delete(`${this.baseUrl}/deletePerson/${personId}`);
    }
}
export default new PersonService();