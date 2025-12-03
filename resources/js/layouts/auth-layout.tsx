import type { ReactNode } from "react"
import { TrendingUp, Users, Sparkles, MessageCircle, Rocket, ShieldCheck, BarChart3, Zap } from "lucide-react"
import { Link } from "@inertiajs/react"

interface AuthLayoutProps {
  children: ReactNode
  title: string
  description: string
  variant?: "login" | "register"
}

export default function AuthLayout({ children, title, description, variant = "login" }: AuthLayoutProps) {
  const isRegister = variant === "register"

  return (
    <div className="min-h-screen flex justify-center items-center bg-white relative overflow-hidden gap-35 px-8">
      {/* Background decorative elements - blue sky effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sky-100 rounded-full blur-3xl opacity-60 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-blue-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-sky-50 rounded-full blur-3xl opacity-70 translate-x-1/3 translate-y-1/3" />

      {/* Left Panel - Form - Centered vertically with proper constraints */}
      <div className="relative z-10 flex flex-col justify-center py-12 lg:max-w-[480px] w-full">
        <div className="w-full max-w-[420px] mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <Link href="/">
              <img src="/logo.png" alt="UMKMBoots AI Logo" className="h-15 w-auto object-contain cursor-pointer" />
            </Link>
          </div>

          {/* Title & Description */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">{title}</h1>
            <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
          </div>

          {/* Form Content */}
          <div className="space-y-5">{children}</div>
        </div>
      </div>

      {/* Right Panel - Different content based on variant */}
      <div className="hidden lg:flex items-center justify-center relative">
        <div className="relative w-full max-w-[400px] group cursor-pointer">
          {isRegister ? (
            <>
              {/* Register variant cards */}
              {/* Rocket/Start card - top right */}
              <div className="absolute -top-4 -right-8 z-20 animate-[float_4s_ease-in-out_infinite] transition-all duration-500 ease-out group-hover:-translate-y-3 group-hover:translate-x-3">
                <div className="bg-white rounded-2xl px-4 py-3 shadow-xl border border-gray-100 transition-shadow duration-500 group-hover:shadow-2xl">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Rocket className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Mulai Gratis</p>
                      <p className="text-sm font-semibold text-gray-900">14 Hari Trial</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security card - left side */}
              <div className="absolute -left-12 top-20 z-20 animate-[float_3s_ease-in-out_infinite] transition-all duration-500 ease-out group-hover:-translate-x-4 group-hover:-translate-y-2">
                <div className="bg-white rounded-2xl px-4 py-3 shadow-xl border border-gray-100 transition-shadow duration-500 group-hover:shadow-2xl">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Data Aman</p>
                      <p className="text-sm font-semibold text-gray-900">100% Terenkripsi</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main image - Register uses different image */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-gray-100 aspect-[3/4] min-h-[580px] transition-all duration-500 ease-out group-hover:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.25)] group-hover:scale-[1.02]">
                <img
                  src="/assets/con.jpeg"
                  alt="Pengusaha UMKM Sukses"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>

              {/* Analytics card - bottom left */}
              <div className="absolute -left-10 bottom-28 z-20 animate-[float_3.5s_ease-in-out_infinite_0.3s] transition-all duration-500 ease-out group-hover:-translate-x-4 group-hover:translate-y-2">
                <div className="bg-white rounded-2xl px-4 py-3 shadow-xl border border-gray-100 transition-shadow duration-500 group-hover:shadow-2xl">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Analisis Bisnis</p>
                      <p className="text-sm font-semibold text-gray-900">Real-time</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick setup card - bottom right */}
              <div className="absolute -right-10 -bottom-2 z-20 animate-[float_4s_ease-in-out_infinite_0.5s] transition-all duration-500 ease-out group-hover:translate-x-4 group-hover:translate-y-3">
                <div className="bg-white rounded-2xl p-4 shadow-xl border border-gray-100 max-w-[200px] transition-shadow duration-500 group-hover:shadow-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-amber-500" />
                    <span className="text-xs font-medium text-amber-600">Cepat & Mudah</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-3">
                    "Daftar hanya 2 menit dan langsung bisa kelola bisnis dengan AI!"
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-amber-600">B</span>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-900">Budi Santoso</p>
                      <p className="text-[10px] text-gray-400">Warung Kopi, Surabaya</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Login variant cards (existing) */}
              {/* AI Sparkles card - top right */}
              <div className="absolute -top-4 -right-8 z-20 animate-[float_4s_ease-in-out_infinite] transition-all duration-500 ease-out group-hover:-translate-y-3 group-hover:translate-x-3">
                <div className="bg-white rounded-2xl px-4 py-3 shadow-xl border border-gray-100 transition-shadow duration-500 group-hover:shadow-2xl">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-sky-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">AI Assistant</p>
                      <p className="text-sm font-semibold text-gray-900">24/7 Aktif</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sales increase card - left side */}
              <div className="absolute -left-12 top-20 z-20 animate-[float_3s_ease-in-out_infinite] transition-all duration-500 ease-out group-hover:-translate-x-4 group-hover:-translate-y-2">
                <div className="bg-white rounded-2xl px-4 py-3 shadow-xl border border-gray-100 transition-shadow duration-500 group-hover:shadow-2xl">
                  <p className="text-xs text-gray-500 mb-1">Peningkatan Penjualan</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-900">+85%</span>
                    <TrendingUp className="h-5 w-5 text-emerald-500" />
                  </div>
                </div>
              </div>

              {/* Main image container */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-gray-100 aspect-[3/4] min-h-[580px] transition-all duration-500 ease-out group-hover:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.25)] group-hover:scale-[1.02]">
                <img
                  src="/assets/conc.jpeg"
                  alt="Pelaku UMKM Sukses"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>

              {/* Users/Community card - bottom left */}
              <div className="absolute -left-10 bottom-28 z-20 animate-[float_3.5s_ease-in-out_infinite_0.3s] transition-all duration-500 ease-out group-hover:-translate-x-4 group-hover:translate-y-2">
                <div className="bg-white rounded-2xl px-4 py-3 shadow-xl border border-gray-100 transition-shadow duration-500 group-hover:shadow-2xl">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Users className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">UMKM Tergabung</p>
                      <p className="text-sm font-semibold text-gray-900">2,500+</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial card - bottom right */}
              <div className="absolute -right-10 -bottom-2 z-20 animate-[float_4s_ease-in-out_infinite_0.5s] transition-all duration-500 ease-out group-hover:translate-x-4 group-hover:translate-y-3">
                <div className="bg-white rounded-2xl p-4 shadow-xl border border-gray-100 max-w-[200px] transition-shadow duration-500 group-hover:shadow-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageCircle className="h-4 w-4 text-sky-500" />
                    <span className="text-xs font-medium text-sky-600">Testimoni</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-3">
                    "Bisnis saya naik 2x lipat sejak pakai UMKMBoots AI!"
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-sky-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-sky-600">A</span>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-900">Ani Wijaya</p>
                      <p className="text-[10px] text-gray-400">Toko Kue, Jakarta</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Footer */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t">
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} UMKMBoots AI. All rights reserved.
        </p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  )
}
