<?php

use App\Http\Controllers\TradeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post("/trading/add", [TradeController::class, "store"]);
Route::post("/trading/index", [TradeController::class, "index"]);
Route::post("/trading/edit/{id?}", [TradeController::class, "edit"]);
Route::post("/trading/update/{id?}", [TradeController::class, "update"]);
Route::post("/trading/delete/{id?}", [TradeController::class, "destroy"]);
