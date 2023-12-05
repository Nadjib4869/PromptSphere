"use client";

import Link from 'next/link';
import Image from 'next/image';
import {useState, useEffect} from 'react';
import {signIn, signOut, useSession, getProviders} from 'next-auth/react';

const Nav = () => {
    const {data: session} = useSession();
    
    const [providers, setProviders] = useState(null);
    const [toogleDropdown, setToogleDropdown] = useState(false);

    useEffect(() => {
        const setUpProviders = async () => {
            const res = await getProviders();
            setProviders(res);
        }
        setUpProviders();
    }, []);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
        <Link className='flex gap-2 flex-center' href="/">
            <Image src="/assets/images/logo.svg" 
            alt='Promptopia logo'
            width={30} 
            height={30}
            className='object-contain' />
            <p className='logo_text'>Promptopia</p>
        </Link>

        {/* Desktop Navigation */}
        <div className='sm:flex hidden'>
            {session?.user ? (
                <div className='flex gap-3 md:gap-5'>
                    <Link href="/create-prompt"
                    className='black_btn'>
                        Create Post
                    </Link>
                    <button type='button'
                    onClick={signOut}
                    className='outline_btn'>
                        Sign Out
                    </button>
                    <Link href="/profile">
                        <Image src={session?.user?.image}
                        alt='Profile'
                        width={37} 
                        height={37}
                        className='rounded-full' />
                    </Link>
                </div>    
            ): (
                <>
                    {providers && Object.values(providers).map((provider) => (
                        <button 
                        type='button' 
                        key={provider.name}
                        onClick={()=> signIn(provider.id)}
                        className='black_btn'>
                            Sign In
                        </button>
                    ))}
                </>
            )}
        </div>

        {/* Mobile Navigation */}
        <div className='sm:hidden flex relative'>
            {session?.user ? (
                <div className='flex'>
                    <Image src={session?.user?.image}
                    alt='Profile'
                    width={37} 
                    height={37}
                    className='rounded-full cursor-pointer'
                    onClick={()=> setToogleDropdown((prev)=>!prev)} />
                    {toogleDropdown && (
                        <div className='dropdown'>
                            <Link href="/profile"
                            className='dropdowm_link'
                            onClick={()=>setToogleDropdown(false)}>
                                My profile
                            </Link>
                            <Link href="/create-prompt"
                            className='dropdowm_link'
                            onClick={()=>setToogleDropdown(false)}>
                                Create Post
                            </Link>
                            <button type='button'
                            onClick={()=>{
                                setToogleDropdown(false);
                                signOut()}}
                            className='black_btn mt-4 w-full'>
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
                ): (
                    <>
                        {providers && Object.values(providers).map((provider) => (
                        <button 
                        type='button' 
                        key={provider.name}
                        onClick={()=> signIn(provider.id)}
                        className='black_btn'>
                            Sign In
                        </button>
                    ))}
                    </>
                )}
        </div>
    </nav>
  )
}

export default Nav