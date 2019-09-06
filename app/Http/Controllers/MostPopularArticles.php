<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\Article;
use App\User;

class MostPopularArticles extends Controller
{
    //
    public function popularArticles(Request $request){

        $user = User::findorfail($request->user('api')->id);
        $average = $user->articles()->avg('views');

    	$articles = Article::where('views','>',$average)->get();

    	return response()->json($articles)->withHeaders(['Content-Type' => 'application/json']);
    }
}
