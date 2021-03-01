import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Api = () => {
  
    const [ users, setUsers ] = useState([]);
    useEffect(()=>{
        const result = axios.get('/api/users/all').then((result)=>setUsers(result.data))
    })


    return (
        <div>
            { users.map(user=>
                <p>{user.name}</p>
                )}
        </div>
    )
}

export default Api
