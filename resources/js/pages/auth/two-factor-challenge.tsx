"use client"

import InputError from "@/components/input-error"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { OTP_MAX_LENGTH } from "@/hooks/use-two-factor-auth"
import AuthLayout from "@/layouts/auth-layout"
import { store } from "@/routes/two-factor/login"
import { Form, Head } from "@inertiajs/react"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { useMemo, useState } from "react"
import { Shield, Key, ArrowRight } from "lucide-react"

export default function TwoFactorChallenge() {
  const [showRecoveryInput, setShowRecoveryInput] = useState<boolean>(false)
  const [code, setCode] = useState<string>("")

  const authConfigContent = useMemo<{
    title: string
    description: string
    toggleText: string
  }>(() => {
    if (showRecoveryInput) {
      return {
        title: "Kode Pemulihan",
        description: "Masukkan salah satu kode pemulihan darurat untuk mengakses akun Anda.",
        toggleText: "gunakan kode autentikasi",
      }
    }

    return {
      title: "Verifikasi Dua Langkah",
      description: "Masukkan kode 6 digit dari aplikasi autentikator Anda.",
      toggleText: "gunakan kode pemulihan",
    }
  }, [showRecoveryInput])

  const toggleRecoveryMode = (clearErrors: () => void): void => {
    setShowRecoveryInput(!showRecoveryInput)
    clearErrors()
    setCode("")
  }

  return (
    <AuthLayout title={authConfigContent.title} description={authConfigContent.description}>
      <Head title="Verifikasi Dua Langkah" />

      <div className="space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sky-100">
            {showRecoveryInput ? <Key className="h-8 w-8 text-sky-600" /> : <Shield className="h-8 w-8 text-sky-600" />}
          </div>
        </div>

        <Form {...store.form()} className="space-y-4" resetOnError resetOnSuccess={!showRecoveryInput}>
          {({ errors, processing, clearErrors }) => (
            <>
              {showRecoveryInput ? (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Kode Pemulihan</label>
                  <Input
                    name="recovery_code"
                    type="text"
                    placeholder="Masukkan kode pemulihan"
                    autoFocus={showRecoveryInput}
                    required
                    className="h-12 bg-gray-50 border-gray-200 focus:border-sky-500 focus:ring-sky-500"
                  />
                  <InputError message={errors.recovery_code} />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="flex w-full items-center justify-center">
                    <InputOTP
                      name="code"
                      maxLength={OTP_MAX_LENGTH}
                      value={code}
                      onChange={(value) => setCode(value)}
                      disabled={processing}
                      pattern={REGEXP_ONLY_DIGITS}
                    >
                      <InputOTPGroup className="gap-2">
                        {Array.from({ length: OTP_MAX_LENGTH }, (_, index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className="h-14 w-12 rounded-lg border-gray-200 bg-gray-50 text-lg font-semibold"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <InputError message={errors.code} />
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 bg-gray-900 text-white hover:bg-gray-800"
                disabled={processing}
              >
                Verifikasi
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <div className="text-center text-sm text-gray-500">
                <span>atau Anda dapat </span>
                <button
                  type="button"
                  className="text-sky-600 hover:text-sky-700 font-medium hover:underline"
                  onClick={() => toggleRecoveryMode(clearErrors)}
                >
                  {authConfigContent.toggleText}
                </button>
              </div>
            </>
          )}
        </Form>
      </div>
    </AuthLayout>
  )
}
