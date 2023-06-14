import React from 'react'
import SignInPage from '@/Components/Login'
import ProtectedRoute from '@/Components/ProtectedRoute'

const ProtectedSignInPage = ProtectedRoute(SignInPage);

export default function Login() {
  return <ProtectedSignInPage />;
}