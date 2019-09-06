<?php

namespace App\Http\Controllers;

use App\Model\Category;
use Illuminate\Http\Request;
use App\Model\Article;

class AllCategories extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $categories = Category::withCount('articles')->get();

        return response()->json($categories);
    }

    public function articles(Request $request, $id){

        // get all articles related to a given topic
        $category = Category::findorfail($id);
        if($category->articles()->exists()){
            $articles = Article::where('category_id',$category->id)
                ->withCount('category')
                ->get();
            return response()->json($articles,200);
        }

        return response()->json(['error' => 'No records are associated with this category'],404);
    }
    public function allArticles(Request $request){

        // get all articles related to a given topic
        $articles = Article::with('category')->get();
        return response()->json($articles,200);
    }

}
