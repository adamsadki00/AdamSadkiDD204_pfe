<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    $bookings = Booking::with(['user', 'room'])->get();

    return response()->json($bookings);
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'room_id' => 'required|exists:rooms,id',
            'check_in' => 'required|date',
            'check_out' => 'required|date|after:check_in',
        ]);

        // check if room already booked
        $exists = Booking::where('room_id', $request->room_id)
        ->where('status', '!=', 'cancelled')
        ->where(function ($q) use ($request) {
            $q->where('check_in', '<', $request->check_out)
              ->where('check_out', '>', $request->check_in);
        })
        ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'Room already booked in this period'
            ], 409);
        }

        // Calculate total price
        $room = \App\Models\Room::findOrFail($request->room_id);
        $checkIn = new \Carbon\Carbon($request->check_in);
        $checkOut = new \Carbon\Carbon($request->check_out);
        $nights = $checkIn->diffInDays($checkOut);
        $totalPrice = $room->price * $nights;

        $booking = Booking::create([
            'user_id' => $request->user_id,
            'room_id' => $request->room_id,
            'check_in' => $request->check_in,
            'check_out' => $request->check_out,
            'total_price' => $totalPrice,
            'status' => 'pending',
        ]);

        // Load relationships for response
        $booking->load(['user', 'room']);

        return response()->json([
            'message' => 'Booking created successfully',
            'data' => $booking
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Booking $booking)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $booking = Booking::find($id);
        
        if (!$booking) {
            return response()->json(['message' => 'Booking not found'], 404);
        }

        $request->validate([
            'status' => 'sometimes|in:pending,confirmed,cancelled',
        ]);

        $booking->update($request->only(['status']));
        $booking->load(['user', 'room']);

        return response()->json([
            'message' => 'Booking updated successfully',
            'data' => $booking
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
{
    $booking = Booking::find($id);

    if (!$booking) {
        return response()->json(['message' => 'Booking not found'], 404);
    }

    $booking->delete();

    return response()->json([
        'message' => 'Booking deleted successfully'
    ]);
}
}
