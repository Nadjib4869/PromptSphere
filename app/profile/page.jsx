"use client";

import { useState, useEffect } from 'react';
import {useSession} from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';
const MyProfile = () => {
    const {data: session} = useSession();
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        const fetchPosts = async () => {
            try{
              const res = await fetch('/api/users/${session?.user.id}/posts');
              const data = await res.json();
        
              setPosts(data);
            
            }catch(err){
              console.error(err);
            }
        }

        if (session?.user.id) fetchPosts();
    }, []);

    const handleEdit = () => {
        
    }

    const handleDelete = async () => {
        
    }

  return (
    <Profile 
        name="My"
        desc="Welcome to my profile!"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile