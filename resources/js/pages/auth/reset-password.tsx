import { router, Head } from "@inertiajs/react"
import { Loader2, KeyRound } from "lucide-react"
import { useState } from "react"

import InputError from "@/components/input-error"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AuthLayout from "@/layouts/auth-layout"

interface ResetPasswordProps {
  email: string
  status?: string
  errors?: {
    password?: string
    password_confirmation?: string
  }
}

export default function ResetPassword({ email, status, errors }: ResetPasswordProps) {
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [processing, setProcessing] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)
    
    router.post('/reset-password', {
      password,
      password_confirmation: passwordConfirmation,
    }, {
      onFinish: () => setProcessing(false)
    })
  }

  return (
    <AuthLayout
      title="Buat Password Baru"
      description="Buat password yang kuat untuk melindungi akun UMKMBoots AI Anda."
    >
      <Head title="Reset Password" />

      {status && (
        <div className="rounded-xl bg-sky-50 border border-sky-200 p-4 mb-5">
          <p className="text-sm font-medium text-sky-700 text-center">{status}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              className="h-12 bg-gray-100 border-gray-200 text-gray-500"
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password Baru
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              required
              placeholder="Masukkan password baru"
              className="h-12 bg-gray-50 border-gray-200 focus:bg-white"
            />
            <InputError message={errors?.password} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password_confirmation" className="text-sm font-medium text-gray-700">
              Konfirmasi Password Baru
            </Label>
            <Input
              id="password_confirmation"
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
              placeholder="Ulangi password baru"
              className="h-12 bg-gray-50 border-gray-200 focus:bg-white"
            />
            <InputError message={errors?.password_confirmation} />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-12 text-sm font-semibold bg-gray-900 hover:bg-gray-800 text-white"
          disabled={processing}
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
      </form>
    </AuthLayout>
  )
}