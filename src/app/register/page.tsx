'use client'

import { z, ZodType } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { UserRole } from '@/types/api.types';
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';

const registerSchema = z.object({
  name: z.string().min(1, 'Нэр шаардлагатай'),
  email: z.string().email('Зөв и-мэйл хаяг оруулна уу'),
  phoneNumber: z.string().min(1, 'Утасны дугаар шаардлагатай'),
  password: z.string().min(6, 'Нууц үг дор хаяж 6 тэмдэгт байх ёстой'),
  confirmPassword: z.string(),
  isOrg: z.boolean(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Нууц үгнүүд таарахгүй байна',
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const router = useRouter();
  const { register: registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      isOrg: false,
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: RegisterFormData) => {
    const { confirmPassword, isOrg, ...submitData } = data;

    try {
      await registerUser({
        ...submitData,
        role: isOrg ? UserRole.ORGANISATION : UserRole.STUDENT,
      });
      toast.success("Амжилттай бүртгэгдлээ");
      router.push('/login');
    } catch (err: any) {
      const message = err.response?.data?.message || 'Бүртгэл үүсгэхэд алдаа гарлаа.';
      alert(message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Бүртгүүлэх</CardTitle>
        </CardHeader>
        <CardContent>
         {Object.keys(errors).length > 0 && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Мэдээлэл дутуу байна</AlertTitle>
              <AlertDescription>
                Бүх талбарыг зөв бөглөсөн эсэхийг шалгана уу.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">Нэр</Label>
              <Input id="name" {...register('name')} />
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <Label htmlFor="email">И-мэйл хаяг</Label>
              <Input id="email" type="email" {...register('email')} />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <Label htmlFor="phoneNumber">Утасны дугаар</Label>
              <Input id="phoneNumber" type="tel" {...register('phoneNumber')} />
              {errors.phoneNumber && <p className="text-sm text-red-500 mt-1">{errors.phoneNumber.message}</p>}
            </div>

            <div>
              <Label htmlFor="password">Нууц үг</Label>
              <Input id="password" type="password" {...register('password')} />
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <Label htmlFor="confirmPassword">Нууц үг баталгаажуулах</Label>
              <Input id="confirmPassword" type="password" {...register('confirmPassword')} />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>
            <Controller
              name="isOrg"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <div className="flex gap-2">
                  <Checkbox
                    id="isOrg"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="isOrg">Байгууллага</Label>
                </div>
              )}
            />
            <Button type="submit" className="w-full" disabled={!isValid || isSubmitting}>
              {isSubmitting ? 'Бүртгэж байна...' : 'Бүртгүүлэх'}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Бүртгэлтэй хэрэглэгч үү?{' '}
            <Link href="/login" className="text-primary hover:underline">
              Нэвтрэх
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

