'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/types/api.types';

export default function AdminDashboard() {
  const router = useRouter();
  const { loading, isAuthenticated, user } = useAuth();

  // Redirect if not logged in or not an admin
  useEffect(() => {
    if (!loading && isAuthenticated) {
      if (!user) {
        router.push('/login');
      } else if (user.role !== UserRole.ADMIN) {
        router.push('/');
      }
    }
  }, [user, router, isAuthenticated, loading]);

  if (loading) {
    return null; // Don't render anything while checking auth
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl w-full mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-10">Админ хянах самбар</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Users Management Button */}
          <Link href="/admin/users" className="w-full">
            <Button 
              className="w-full h-40 text-xl bg-[#5C9DFF] hover:bg-blue-600 transition-colors"
            >
              Хэрэглэгчид
            </Button>
          </Link>
          
          {/* Organizations Button */}
          <Link href="/admin/organizations" className="w-full">
            <Button 
              className="w-full h-40 text-xl bg-[#5C9DFF] hover:bg-blue-600 transition-colors"
            >
              Байгууллагууд
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Internships Button */}
          <Link href="/admin/internships" className="w-full">
            <Button 
              className="w-full h-40 text-xl bg-[#5C9DFF] hover:bg-blue-600 transition-colors"
            >
              Дадлагууд
            </Button>
          </Link>
          
          {/* Applications Button */}
          <Link href="/admin/applications" className="w-full">
            <Button 
              className="w-full h-40 text-xl bg-[#5C9DFF] hover:bg-blue-600 transition-colors"
            >
              Хүсэлтүүд
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
