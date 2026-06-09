<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Room;
use App\Models\User;

class AdminController extends Controller
{
    
    public function dashboard()
{
    //  USERS 
    $totalUsers = User::count();

    //  ROOMS
    // Group by status in ONE query instead of 3 separate queries
    // Result: [{ status: 'available', count: 5 }, ...]
    $roomsByStatus = Room::selectRaw('status, COUNT(*) as count')
        ->groupBy('status')
        ->get()
        ->keyBy('status'); // → { available: {...}, occupied: {...} }

    $totalRooms = Room::count();

    //BOOKINGS
    $totalBookings = Booking::count();

    // Last 5 bookings with user and room (eager loading → no N+1 problem)
    $latestBookings = Booking::with(['user:id,name,email', 'room:id,title'])
        ->latest()
        ->take(5)
        ->get();

    // RESPONSE
    return response()->json([
        'users' => [
            'total' => $totalUsers,
        ],
        'rooms' => [
            'total'       => $totalRooms,
            'available'   => $roomsByStatus->get('available')->count   ?? 0,
            'occupied'    => $roomsByStatus->get('occupied')->count    ?? 0,
            'maintenance' => $roomsByStatus->get('maintenance')->count ?? 0,
        ],
        'bookings' => [
            'total'   => $totalBookings,
            'latest'  => $latestBookings,
        ],
    ]);
}
}
