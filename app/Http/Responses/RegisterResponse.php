<?php

namespace App\Http\Responses;

use Laravel\Fortify\Contracts\RegisterResponse as RegisterResponseContract;
use Illuminate\Http\JsonResponse;

class RegisterResponse implements RegisterResponseContract
{
    /**
     * Create an HTTP response that represents the object.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function toResponse($request)
    {
        $email = $request->input('email');
               
        if ($request->wantsJson()) {
            return new JsonResponse([
                'message' => 'Registration successful. Please verify your email.',
                'email' => $email
            ], 201);
        }

        // Redirect ke halaman verifikasi dengan email sebagai query parameter
        return redirect()->route('verify.code', ['email' => $email])
            ->with('status', 'Kode verifikasi telah dikirim ke email Anda.');
    }
}