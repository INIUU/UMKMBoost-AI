<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    public function redirect()
    {
        // Simpan intent ke session
        $intent = request()->query('intent', 'login');
        session(['google_auth_intent' => $intent]);
        
        return Socialite::driver('google')->redirect();
    }

    public function callback()
    {
        $googleUser = Socialite::driver('google')->user();
        
        // Ambil intent dari session
        $intent = session('google_auth_intent', 'login');
        
        // Hapus dari session setelah dipakai
        session()->forget('google_auth_intent');

        // Cari user berdasarkan email
        $user = User::where('email', $googleUser->getEmail())->first();

        // LOGIC UNTUK REGISTER
        if ($intent === 'register') {
            if ($user) {
                // Jika user sudah ada, redirect ke login dengan pesan
                return redirect('/login')
                    ->with('error', 'Email sudah terdaftar. Silakan login.');
            }

            // Buat user baru
            $user = User::create([
                'name' => $googleUser->getName(),
                'email' => $googleUser->getEmail(),
                'google_id' => $googleUser->getId(),
                'password' => bcrypt(Str::random(32)),
                'email_verified_at' => now(), // Auto verify untuk Google users
            ]);

            Auth::login($user);
            return redirect()->intended('/dashboard');
        }

        // LOGIC UNTUK LOGIN
        if (!$user) {
            return redirect('/login')
                ->with('error', 'Email belum terdaftar. Silakan register terlebih dahulu.');
        }

        // Update google_id jika belum ada
        if (!$user->google_id) {
            $user->update(['google_id' => $googleUser->getId()]);
        }

        Auth::login($user);
        return redirect()->intended('/dashboard');
    }
}