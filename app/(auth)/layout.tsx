import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'
import { isAuthenticated } from '@/lib/actions/auth.action'; // Adjust the import path as necessary

const AuthLayout = async ({children }: {children: ReactNode}) => {
  
  const isUserAuthenticated = await isAuthenticated(); // Replace with actual authentication check
 
  if(!isUserAuthenticated) redirect('/sign-in'); // Redirect to sign-in page if not authenticated
 
  return (
    <div className='auth-layout'>{children}</div>
  )
}

export default AuthLayout