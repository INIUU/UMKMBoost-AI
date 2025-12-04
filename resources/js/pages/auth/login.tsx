import GoogleButton from '@/components/google-button';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { Form, Head } from '@inertiajs/react';
import { ArrowRight, Loader2 } from 'lucide-react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
    error?: string;
}

export default function Login({
    status,
    canResetPassword,
    canRegister,
    error,
}: LoginProps) {
    return (
        <AuthLayout
            title="Selamat Datang Kembali!"
            description="Kami membantu UMKM Indonesia berkembang dengan teknologi AI yang mudah digunakan."
        >
            <Head title="Masuk" />

            {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                    <p className="text-center text-sm font-medium text-red-700">
                        {error}
                    </p>
                </div>
            )}
            {status && (
                <div className="rounded-xl border border-sky-200 bg-sky-50 p-4">
                    <p className="text-center text-sm font-medium text-sky-700">
                        {status}
                    </p>
                </div>
            )}

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="space-y-5"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label
                                        htmlFor="email"
                                        className="text-sm font-medium text-gray-700"
                                    >
                                        Email
                                    </Label>
                                </div>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="nama@email.com"
                                    className="h-12 border-gray-200 bg-gray-50 focus:bg-white"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label
                                        htmlFor="password"
                                        className="text-sm font-medium text-gray-700"
                                    >
                                        Password
                                    </Label>
                                    <TextLink
                                        href="/forgot-password"
                                        className="text-xs text-gray-500 hover:text-sky-600"
                                        tabIndex={5}
                                    >
                                        Lupa password?
                                    </TextLink>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Masukkan password"
                                    className="h-12 border-gray-200 bg-gray-50 focus:bg-white"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                />
                                <Label
                                    htmlFor="remember"
                                    className="cursor-pointer text-sm text-gray-600"
                                >
                                    Ingat saya
                                </Label>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="h-12 w-full bg-gray-900 text-sm font-semibold text-white hover:bg-gray-800"
                            tabIndex={4}
                            disabled={processing}
                            data-test="login-button"
                        >
                            {processing ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <>
                                    Masuk
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="bg-white px-3 text-gray-500">
                                    atau
                                </span>
                            </div>
                        </div>

                        <GoogleButton
                            text="Masuk dengan Google"
                            href="/auth/google/redirect?intent=login"
                        />

                        {canRegister && (
                            <p className="text-center text-sm text-gray-600">
                                Belum punya akun?{' '}
                                <TextLink
                                    href={register()}
                                    tabIndex={5}
                                    className="font-semibold text-sky-600 hover:text-sky-700"
                                >
                                    Daftar sekarang
                                </TextLink>
                            </p>
                        )}
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
