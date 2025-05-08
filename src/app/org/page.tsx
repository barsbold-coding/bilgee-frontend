'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/types/api.types';

export default function OrganizationDashboard() {
  const router = useRouter();
  const { loading, isAuthenticated, user } = useAuth();

  // Redirect if not logged in or not an organization
  useEffect(() => {
    if (!loading && isAuthenticated) {
      if (!user) {
        router.push('/login');
      } else if (user.role !== UserRole.ORGANISATION) {
        router.push('/');
      }
    }
  }, [user, router, isAuthenticated, loading]);

  if (loading) {
    return null; // Don't render anything while checking auth
  }

  if (!user?.verified) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 py-12">
        Та админ таны бүртгэлийг баталгаажуулах хүртэл түр хүлээнэ үү.
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl w-full mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-10">Байгууллагын хянах самбар</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Applications Button */}
          <Link href="/org/applications" className="w-full">
            <Button 
              className="w-full h-40 text-xl bg-[#5C9DFF] hover:bg-blue-600 transition-colors"
            >
              Хүсэлтүүд
            </Button>
          </Link>
          
          {/* Internships Button */}
          <Link href="/org/internships" className="w-full">
            <Button 
              className="w-full h-40 text-xl bg-[#5C9DFF] hover:bg-blue-600 transition-colors"
            >
              Дадлагууд
            </Button>
          </Link>
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-gray-600">
            Шинэ дадлага нэмэх бол{' '}
            <Link href="/org/internships/create" className="text-blue-600 hover:text-blue-700 underline">
              энд дарна уу
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
