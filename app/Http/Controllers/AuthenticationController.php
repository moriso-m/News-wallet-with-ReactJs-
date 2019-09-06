<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;

class AuthenticationController extends Controller
{
    //show the register form

    public function registerForm(){

        return view('register');
    }

    // register new user
    public function register(Request $request){

        $this->validate($request, [
            'name' => 'required|string',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        //  create access token
        $tokenResult = $user->createToken('wallet-token',['create','delete','edit']);
        $token = $tokenResult->accessToken;

        return response()->json(['token' => $token, 'success'=>'AUTHENTICATED'],200);
    }

    public function login(Request $request){

        $credentials = [
            'email' => $request->email,
            'password' => $request->password
        ];

        if(Auth::attempt($credentials)){
            // create access tokens with scopes
            $tokenResult = Auth::user()->createToken('wallet-token',['create','delete','edit']);
            $token = $tokenResult->accessToken;

            // Carbon class is an API extension to be used to manipulate date and time
            return response()->json([
                'token' => $token,
                'user' => Auth::user()->name,
            ],200);
        }
        else{

            return response()->json(['error' => 'Wrong email or password'], 401);
        }
    }

    public function logout(Request $request){
        if($request->user('api')){
            $access_token = $request->user('api')->token();
            // revoke token
            $access_token->revoke();
            return response()->json($access_token,200);
            $this->cookie->queue($this->cookie->forget(self::REFRESH_TOKEN));
        }
        else{
            return response()->json(['error' => 'Invalid request','user' => Auth::user('api')],404);
        }
    }
}
