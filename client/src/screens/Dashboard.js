import React from 'react';
import '../App.css';
import jwt from 'jsonwebtoken'
import { useEffect,useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
function Dashboard() {
    const [data, setData] = useState([])
    const history=useHistory()
    async function populateQuote(){
        await axios.get('http://localhost:5000/api/quote',{
            headers:{
                'x-access-token':localStorage.getItem('token')
            }
        }).then(
            (response)=>{
                console.log(response.data)
                setData(response.data)
            }
        )
    }

    
    useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			const user = jwt.decode(token)
			if (!user) {
				localStorage.removeItem('token')
				history.replace('/login')
			} else {
            	populateQuote()
			}
		}
	}, [])

    return (
        <div className="app">
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Contact</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.contact}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Dashboard
