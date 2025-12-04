<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class PasswordResetController extends Controller
{
    // Halaman input email
    public function requestCode()
    {
        return Inertia::render('auth/forgot-password');
    }

    // Kirim kode ke email
    public function sendCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return back()->withErrors([
                'email' => 'Email tidak ditemukan.',
            ]);
        }

        $user->sendPasswordResetCode();

        return redirect()->route('password.verify.code', ['email' => $request->email])
            ->with('status', 'Kode reset password telah dikirim ke email Anda.');
    }

    // Halaman input kode OTP
    public function showVerifyCode(Request $request)
    {
        $email = $request->query('email');

        if (!$email) {
            return redirect()->route('password.request');
        }

        return Inertia::render('auth/verify-reset-code', [
            'email' => $email,
        ]);
    }

    // Verifikasi kode OTP
    public function verifyCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required|string|size:6',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !$user->verifyPasswordResetCode($request->code)) {
            return back()->withErrors([
                'code' => 'Kode verifikasi salah atau sudah kadaluarsa.',
            ]);
        }

        // Simpan token di session untuk halaman reset password
        session([
            'password_reset_email' => $user->email,
            'password_reset_verified' => true,
        ]);

        return redirect()->route('password.reset')
            ->with('status', 'Kode berhasil diverifikasi. Silakan buat password baru.');
    }

    // Resend kode
    public function resendCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return back()->withErrors([
                'email' => 'Email tidak ditemukan.',
            ]);
        }

        $user->sendPasswordResetCode();

        return back()->with('status', 'Kode reset password baru telah dikirim!');
    }

    // Halaman buat password baru
    public function showResetForm()
    {
        if (!session('password_reset_verified')) {
            return redirect()->route('password.request');
        }

        return Inertia::render('auth/reset-password', [
            'email' => session('password_reset_email'),
        ]);
    }

    // Reset password
    public function reset(Request $request)
    {
        if (!session('password_reset_verified')) {
            return redirect()->route('password.request');
        }

        $request->validate([
            'password' => ['required', 'string', Password::default(), 'confirmed'],
        ]);

        $user = User::where('email', session('password_reset_email'))->first();

        if (!$user) {
            return redirect()->route('password.request')
                ->withErrors(['email' => 'User tidak ditemukan.']);
        }

        $user->forceFill([
            'password' => Hash::make($request->password),
        ])->save();

        $user->clearPasswordResetCode();

        // Clear session
        session()->forget(['password_reset_email', 'password_reset_verified']);

        return redirect()->route('login')
            ->with('status', 'Password berhasil direset! Silakan login dengan password baru.');
    }
}