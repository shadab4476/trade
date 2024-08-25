<?php

namespace App\Http\Controllers;

use App\Models\Trade;
use Illuminate\Http\Request;

class TradeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $trade = Trade::get();
            if ($trade->count() > 0) {
                return response()->json([
                    "status" => true,
                    "data" => $trade,
                ]);
            }
        } catch (\Exception $exception) {
            return response()->json([
                "status" => false,
                "message" => $exception->getMessage() . " Somthing want wrong Please try again..",
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validator = Validator()->make($request->all(), [
            'stock_name' => 'required',
            'owner_name' => 'required',
            'price' => 'required|numeric|min:1',
            'quantity' => 'required|numeric|min:1',
            'date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => false,
                "errors" => $validator->errors()
            ]);
        }
        $trade =  Trade::create([
            "stock_name" => $request->stock_name,
            "owner_name" => $request->owner_name,
            "price" => $request->price,
            "quantity" => $request->quantity,
            "date" => $request->date,
        ]);
        return response()->json([
            "status" => true,
            "data" => $trade,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $id = null)
    {
        try {
            $trade = Trade::findOrFail($id);
            return response()->json([
                "status" => true,
                "data" => $trade,
            ]);
        } catch (\Exception $exception) {
            return response()->json([
                "status" => false,
                "message" => $exception->getMessage(),
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        try {
            $trade = Trade::findOrFail($id);
            $validator = Validator()->make($request->all(), [
                'stock_name' => 'required',
                'owner_name' => 'required',
                'price' => 'required|numeric|min:1',
                'quantity' => 'required|numeric|min:1',
                'date' => 'required|date',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    "status" => false,
                    "errors" => $validator->errors()
                ]);
            }
            $trade->update([
                "stock_name" => $request->stock_name,
                "owner_name" => $request->owner_name,
                "price" => $request->price,
                "quantity" => $request->quantity,
                "date" => $request->date,
            ]);
            return response()->json([
                "status" => true,
                "data" => $trade,
            ]);
        } catch (\Exception $exception) {
            return response()->json([
                "status" => false,
                "errors" => $exception->getMessage(),
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        try {
            $trade = Trade::findOrFail($id);
            $trade->delete();
            return response()->json([
                "status" => true,
                "message" => "Trade deleted successfully",
            ]);
        } catch (\Exception $exception) {
            return response()->json([
                "status" => false,
                "errors" => $exception->getMessage(),
            ]);
        }
    }
}
