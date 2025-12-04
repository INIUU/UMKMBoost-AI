import { useState } from 'react'
import { router, Head } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AuthLayout from '@/layouts/auth-layout'
import { Loader2, KeyRound, ArrowLeft } from 'lucide-react'
import TextLink from '@/components/text-link'
import { login } from '@/routes'

interface VerifyResetCodeProps {
  email: string
  status?: string
  errors?: {
    code?: string
    email?: string
  }
}

export default function VerifyResetCode({ email, status, errors }: VerifyResetCodeProps) {
  const [code, setCode] = useState('')
  const [processing, setProcessing] = useState(false)
  const [resending, setResending] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)
    
    router.post('/password/verify-code', { email, code }, {
      onFinish: () => setProcessing(false)
    })
  }

  const handleResend = () => {
    setResending(true)
    
    router.post('/password/resend-code', { email }, {
      onFinish: () => setResending(false)
    })
  }

  return (
    <AuthLayout
      title="Verifikasi Reset Password"
      description={`Masukkan kode 6 digit yang telah dikirim ke ${email}`}
    >
      <Head title="Verifikasi Kode Reset" />

      {status && (
        <div className="rounded-xl bg-sky-50 border border-sky-200 p-4 mb-5">
          <p className="text-sm font-medium text-sky-700 text-center">{status}</p>
        </div>
      )}

      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
          <KeyRound className="w-8 h-8 text-amber-600" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="code" className="text-sm font-medium text-gray-700">
            Kode Verifikasi
          </Label>
          <Input
            id="code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            required
            autoFocus
            maxLength={6}
            placeholder="000000"
            className="h-12 bg-gray-50 border-gray-200 focus:bg-white text-center text-2xl font-semibold tracking-widest"
          />
          {errors?.code && (
            <p className="text-sm text-red-600">{errors.code}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-12 text-sm font-semibold bg-gray-900 hover:bg-gray-800 text-white"
          disabled={processing || code.length !== 6}
        >
          {processing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            'Verifikasi Kode'
          )}
        </Button>

        <div className="space-y-3">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Tidak menerima kode?{' '}
              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                className="text-sky-600 hover:text-sky-700 font-semibold disabled:opacity-50"
              >
                {resending ? 'Mengirim...' : 'Kirim ulang'}
              </button>
            </p>
          </div>

          <div className="text-center">
            <TextLink href={login()} className="inline-flex items-center text-sm text-gray-600 hover:text-sky-600">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke halaman login
            </TextLink>
          </div>
        </div>
      </form>
    </AuthLayout>
  )
}