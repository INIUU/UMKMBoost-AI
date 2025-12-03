import InputError from "@/components/input-error"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AuthLayout from "@/layouts/auth-layout"
import { store } from "@/routes/password/confirm"
import { Form, Head } from "@inertiajs/react"
import { Loader2, ShieldCheck } from "lucide-react"

export default function ConfirmPassword() {
  return (
    <AuthLayout title="Konfirmasi Password" description="Untuk keamanan akun Anda, silakan verifikasi identitas Anda.">
      <Head title="Konfirmasi Password" />

      <div className="rounded-xl bg-sky-50 border border-sky-200 p-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-sky-600 mt-0.5 shrink-0" />
          <p className="text-sm text-sky-700">
            Ini adalah area aman. Silakan konfirmasi password Anda sebelum melanjutkan.
          </p>
        </div>
      </div>

      <Form {...store.form()} resetOnSuccess={["password"]} className="space-y-5">
        {({ processing, errors }) => (
          <>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Masukkan password Anda"
                autoComplete="current-password"
                autoFocus
                className="h-12 bg-gray-50 border-gray-200 focus:bg-white"
              />
              <InputError message={errors.password} />
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-sm font-semibold bg-gray-900 hover:bg-gray-800 text-white"
              disabled={processing}
              data-test="confirm-password-button"
            >
              {processing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Konfirmasi
                </>
              )}
            </Button>
          </>
        )}
      </Form>
    </AuthLayout>
  )
}
