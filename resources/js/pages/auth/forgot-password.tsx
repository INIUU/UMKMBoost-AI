import { login } from "@/routes"
import { email } from "@/routes/password"
import { Form, Head } from "@inertiajs/react"
import { Loader2, ArrowLeft, Send } from "lucide-react"

import InputError from "@/components/input-error"
import TextLink from "@/components/text-link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AuthLayout from "@/layouts/auth-layout"

export default function ForgotPassword({ status }: { status?: string }) {
  return (
    <AuthLayout
      title="Lupa Password?"
      description="Jangan khawatir, masukkan email Anda dan kami akan mengirimkan link untuk reset password."
    >
      <Head title="Lupa Password" />

      {status && (
        <div className="rounded-xl bg-sky-50 border border-sky-200 p-4">
          <p className="text-sm font-medium text-sky-700 text-center">{status}</p>
        </div>
      )}

      <Form {...email.form()} className="space-y-5">
        {({ processing, errors }) => (
          <>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                autoFocus
                placeholder="nama@email.com"
                className="h-12 bg-gray-50 border-gray-200 focus:bg-white"
              />
              <InputError message={errors.email} />
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-sm font-semibold bg-gray-900 hover:bg-gray-800 text-white"
              disabled={processing}
              data-test="email-password-reset-link-button"
            >
              {processing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Kirim Link Reset
                </>
              )}
            </Button>

            <div className="text-center">
              <TextLink href={login()} className="inline-flex items-center text-sm text-gray-600 hover:text-sky-600">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali ke halaman login
              </TextLink>
            </div>
          </>
        )}
      </Form>
    </AuthLayout>
  )
}
