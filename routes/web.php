<?php

use App\Http\Controllers\EmailVerificationController;
use App\Http\Controllers\PasswordResetController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\GoogleAuthController;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('landing', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// Google OAuth
Route::get('/auth/google/redirect', [GoogleAuthController::class, 'redirect'])
    ->name('google.redirect');

Route::get('/auth/google/callback', [GoogleAuthController::class, 'callback'])
    ->name('google.callback');

// Email Verification
Route::get('/verify/code', function () {
    $email = request()->query('email', session('email'));
    return Inertia::render('auth/verify-code', [
        'email' => $email,
        'status' => session('status')
    ]);
})->name('verify.code');

Route::post('/verify/code', [EmailVerificationController::class, 'verify'])
    ->name('verify.code.submit');

Route::post('/verify/code/resend', [EmailVerificationController::class, 'resend'])
    ->name('verify.code.resend');

// Password Reset dengan OTP
Route::get('/forgot-password', [PasswordResetController::class, 'requestCode'])
    ->middleware('guest')
    ->name('password.request');

Route::post('/forgot-password', [PasswordResetController::class, 'sendCode'])
    ->middleware('guest')
    ->name('password.email');

Route::get('/password/verify-code', [PasswordResetController::class, 'showVerifyCode'])
    ->middleware('guest')
    ->name('password.verify.code');

Route::post('/password/verify-code', [PasswordResetController::class, 'verifyCode'])
    ->middleware('guest')
    ->name('password.verify.code.submit');

Route::post('/password/resend-code', [PasswordResetController::class, 'resendCode'])
    ->middleware('guest')
    ->name('password.resend.code');

Route::get('/reset-password', [PasswordResetController::class, 'showResetForm'])
    ->middleware('guest')
    ->name('password.reset');

Route::post('/reset-password', [PasswordResetController::class, 'reset'])
    ->middleware('guest')
    ->name('password.update');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';