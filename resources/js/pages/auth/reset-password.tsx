import { update } from "@/routes/password"
import { Form, Head } from "@inertiajs/react"
import { Loader2, KeyRound } from "lucide-react"

import InputError from "@/components/input-error"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AuthLayout from "@/layouts/auth-layout"

interface ResetPasswordProps {
  token: string
  email: string
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
  return (
    <AuthLayout
      title="Buat Password Baru"
      description="Buat password yang kuat untuk melindungi akun UMKMBoots AI Anda."
    >
      <Head title="Reset Password" />

      <Form
        {...update.form()}
        transform={(data) => ({ ...data, token, email })}
        resetOnSuccess={["password", "password_confirmation"]}
        className="space-y-5"
      >
        {({ processing, errors }) => (
          <>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  className="h-12 bg-gray-100 border-gray-200 text-gray-500"
                  readOnly
                />
                <InputError message={errors.email} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password Baru
                </Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  autoFocus
                  placeholder="Masukkan password baru"
                  className="h-12 bg-gray-50 border-gray-200 focus:bg-white"
                />
                <InputError message={errors.password} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password_confirmation" className="text-sm font-medium text-gray-700">
                  Konfirmasi Password Baru
                </Label>
                <Input
                  id="password_confirmation"
                  type="password"
                  name="password_confirmation"
                  autoComplete="new-password"
                  placeholder="Ulangi password baru"
                  className="h-12 bg-gray-50 border-gray-200 focus:bg-white"
                />
                <InputError message={errors.password_confirmation} />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-sm font-semibold bg-gray-900 hover:bg-gray-800 text-white"
              disabled={processing}
              data-test="reset-password-button"
            >
              {processing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <KeyRound className="mr-2 h-4 w-4" />
                  Reset Password
                </>
              )}
            </Button>
          </>
        )}
      </Form>
    </AuthLayout>
  )
}
