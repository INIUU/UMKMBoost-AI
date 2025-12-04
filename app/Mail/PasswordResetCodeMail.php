<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PasswordResetCodeMail extends Mailable
{
    use Queueable, SerializesModels;

    public $code;

    /**
     * Create a new message instance.
     *
     * @param  string|int  $code
     */
    public function __construct($code)
    {
        $this->code = $code;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->subject('Kode Reset Password - UMKMBoost AI')
                    ->view('emails.password-reset-code')
                    ->with([
                        'code' => $this->code,
                    ]);
    }
}