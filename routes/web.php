<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::view('/','app');
// direct all routes to the homepage so that all requests can be made by react
Route::get('{path}', function($path){
    return view('app');
})->where('path','.*');
