import React, { useState, useEffect } from 'react';
import { firebase } from './../../firebase';
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
} from 'firebase/auth';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getDatabase, ref, child, get } from 'firebase/database';
import Header from '../../components/Header';
import LoadingSpinner from '../../components/loader/loader';
import { Box, Card, Container } from '@material-ui/core';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}
 



const UsersPage = () => {
        // hook to save user data from firebase in array
    const [users,setUsers]=useState([])
    // hook to handle loading spinner
    const [loading,isLoading]=useState(true)

    const classes = useStyles();
    useEffect(() =>   {
        fetchBlogs();
     
    }, []);
    const fetchBlogs=async()=>{
        const response=firebase.firestore().collection('users');
        const data = await response.get();
        var da=[];
        data.docs.forEach(item=>{
         console.log(JSON.stringify(item));
        da.push(item.data());
        })
        setUsers(da);
        isLoading(false);
    }
    return (
        loading? LoadingSpinner(): <div>
             <Box sx={{ m: 2 }} >
                            <Header title="Users" />

             </Box>
               

             
                <Box sx={{ m: 2 }} >
                <div>
                        {users.map((row) => (
    <Box sx={{ m: 2 }} >
  <Card sx={{ p: 10, m:10 }}>
  <Box sx={{ m: 2 }} >
  <h3>{row.fullname}</h3>
                                   <h4>{row.email}</h4>

  </Box>

                                   
                            </Card>
    </Box>
                          
                           
                        ))}
                    </div></Box> 
                    
                 
             
            
        </div>
    );
};

export default UsersPage;
