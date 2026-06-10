<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Room;
use App\Models\User;

class AdminController extends Controller
{
    public function dashboard()
    {
        // USERS
        $totalUsers = User::count();

        // ROOMS
        $roomsByStatus = Room::selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->get()
            ->keyBy('status');

        $totalRooms = Room::count();

        // BOOKINGS
        $totalBookings = Booking::count();

        $latestBookings = Booking::with(['user:id,name,email', 'room:id,room_number'])
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
                'available'   => (int)($roomsByStatus->get('available')->count ?? 0),
                'occupied'    => (int)($roomsByStatus->get('occupied')->count ?? 0),
                'maintenance' => (int)($roomsByStatus->get('maintenance')->count ?? 0),
            ],
            'bookings' => [
                'total'  => $totalBookings,
                'latest' => $latestBookings,
            ],
        ]);
    }
}