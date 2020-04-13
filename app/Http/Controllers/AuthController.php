<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $this->validate($request, [
            'email' => 'required',
            'password' => 'required'
        ]);


        $auth = $request->except(['remember_me']);

        
        if(auth()->attempt($auth,$request->remember_me)) {
            
            auth()->user()->update(['api_token' => Str::random(40)]);

            return response()->json(['status' => 'success' ,'data' => auth()->user()->api_token],200);
        }

        return response()->json(['status' => 'failed']);
    }
}
