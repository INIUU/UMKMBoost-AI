<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerifyEmailCodeMail;
use App\Mail\PasswordResetCodeMail;

class User extends Authenticatable
{
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'google_id',
        'email_verified_at',
        'email_verification_code',
        'email_verification_code_expires_at',
        'password_reset_code',
        'password_reset_code_expires_at'
    ];

    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
        'email_verification_code',
        'password_reset_code',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'email_verification_code_expires_at' => 'datetime',
            'password_reset_code_expires_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    // ========== EMAIL VERIFICATION ==========
    
    public function generateEmailVerificationCode(): string
    {
        $code = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        
        $this->update([
            'email_verification_code' => $code,
            'email_verification_code_expires_at' => now()->addMinutes(10),
        ]);

        return $code;
    }

    public function verifyEmailWithCode(string $code): bool
    {
        if ($this->email_verification_code !== $code) {
            return false;
        }

        if ($this->email_verification_code_expires_at && $this->email_verification_code_expires_at->isPast()) {
            return false;
        }

        $this->update([
            'email_verified_at' => now(),
            'email_verification_code' => null,
            'email_verification_code_expires_at' => null,
        ]);

        return true;
    }

    public function sendEmailVerificationCode(): void
    {
        $code = $this->generateEmailVerificationCode();
        Mail::to($this->email)->send(new VerifyEmailCodeMail($code));
    }

    // ========== PASSWORD RESET ==========
    
    public function generatePasswordResetCode(): string
    {
        $code = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        
        $this->update([
            'password_reset_code' => $code,
            'password_reset_code_expires_at' => now()->addMinutes(10),
        ]);

        return $code;
    }

    public function verifyPasswordResetCode(string $code): bool
    {
        if ($this->password_reset_code !== $code) {
            return false;
        }

        if ($this->password_reset_code_expires_at && $this->password_reset_code_expires_at->isPast()) {
            return false;
        }

        return true;
    }

    public function sendPasswordResetCode(): void
    {
        $code = $this->generatePasswordResetCode();
        Mail::to($this->email)->send(new PasswordResetCodeMail($code));
    }

    public function clearPasswordResetCode(): void
    {
        $this->update([
            'password_reset_code' => null,
            'password_reset_code_expires_at' => null,
        ]);
    }
}