<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SendPasswordResetCode extends Notification
{
    use Queueable;

    public function __construct(public string $code)
    {
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Kode Reset Password - ' . config('app.name'))
            ->greeting('Halo ' . $notifiable->name . '!')
            ->line('Anda menerima email ini karena kami menerima permintaan reset password untuk akun Anda.')
            ->line('Kode reset password Anda adalah:')
            ->line('**' . $this->code . '**')
            ->line('Kode ini akan kadaluarsa dalam 10 menit.')
            ->line('Jika Anda tidak melakukan permintaan reset password, abaikan email ini.')
            ->salutation('Terima kasih, ' . config('app.name'));
    }
}