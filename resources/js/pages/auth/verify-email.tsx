import TextLink from "@/components/text-link"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import AuthLayout from "@/layouts/auth-layout"
import { logout } from "@/routes"
import { send } from "@/routes/verification"
import { Form, Head } from "@inertiajs/react"
import { Mail, LogOut, CheckCircle } from "lucide-react"

export default function VerifyEmail({ status }: { status?: string }) {
  return (
    <AuthLayout
      title="Verifikasi Email Anda"
      description="Silakan verifikasi alamat email Anda dengan mengklik link yang baru saja kami kirimkan."
    >
      <Head title="Verifikasi Email" />

      <div className="space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sky-100">
            <Mail className="h-8 w-8 text-sky-600" />
          </div>
        </div>

        {/* Success Message */}
        {status === "verification-link-sent" && (
          <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
            <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />
            <p className="text-sm text-green-700">
              Link verifikasi baru telah dikirim ke alamat email yang Anda daftarkan.
            </p>
          </div>
        )}

        <Form {...send.form()} className="space-y-4">
          {({ processing }) => (
            <>
              <Button disabled={processing} className="w-full bg-gray-900 text-white hover:bg-gray-800">
                {processing && <Spinner className="mr-2" />}
                <Mail className="mr-2 h-4 w-4" />
                Kirim Ulang Email Verifikasi
              </Button>

              <div className="text-center">
                <TextLink
                  href={logout()}
                  className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
                >
                  <LogOut className="h-4 w-4" />
                  Keluar
                </TextLink>
              </div>
            </>
          )}
        </Form>
      </div>
    </AuthLayout>
  )
}
