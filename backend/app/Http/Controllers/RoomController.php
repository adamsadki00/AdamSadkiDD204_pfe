<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RoomController extends Controller
{
    /**
     * Display a listing of all rooms.
     * Using pagination to avoid loading all records at once (performance)
     */
    public function index()
    {
        // paginate(10) → returns 10 rooms per page instead of Room::all()
        $rooms = Room::paginate(10);

        return response()->json($rooms, 200);
    }

    /**
     * Store a newly created room in storage.
     */
    public function store(Request $request)
    {
        // Validate incoming request data
        // 'image' is required here so no need for extra check after
        $request->validate([
    'room_number' => 'required|string|unique:rooms,room_number',
    'description' => 'required|string',
    'price' => 'required|numeric',
    'capacity' => 'required|integer',
    'type' => 'required|string',
    'image' => 'required|image|mimes:jpg,jpeg,png,webp|max:5120', // ✅ zidna webp u kberna size l 5MB
]);

        // Store image in storage/app/public/images
        // asset('storage/...') → generates full public URL for the image
        $imagePath = $request->file('image')->store('images', 'public');
        $imageUrl = asset('storage/'.$imagePath);

        // Create the room record in the database
        $room = Room::create([
            'room_number' => $request->room_number,
            'description' => $request->description,
            'price' => $request->price,
            'capacity' => $request->capacity,
            'type' => $request->type,
            'image' => $imageUrl,
        ]);

        return response()->json([
            'message' => 'Room created successfully',
            'data' => $room,
        ], 201);
    }

    /**
     * Display the specified room by ID.
     */
    public function show($id)
    {
        // Find room by ID — returns null if not found
        $room = Room::find($id);

        // Return 404 if room doesn't exist
        if (! $room) {
            return response()->json(['message' => 'Room not found'], 404);
        }

        return response()->json($room, 200);
    }

    /**
     * Update the specified room in storage.
     */
    public function update(Request $request, $id)
    {
        // Find room by ID — returns null if not found
        $room = Room::find($id);

        // Return 404 if room doesn't exist
        if (! $room) {
            return response()->json(['message' => 'Room not found'], 404);
        }

        // 'sometimes' → field is optional, only validated if present in request
        $request->validate([
            'room_number' => 'sometimes|string|unique:rooms,room_number,'.$id,
            'description' => 'sometimes|string',
            'price' => 'sometimes|numeric',
            'capacity' => 'sometimes|integer',
            'type' => 'sometimes|string',
            'status' => 'sometimes|in:available,occupied,maintenance',
            'image' => 'sometimes|image|mimes:jpg,jpeg,png,webp|max:5120', // ✅ zidna webp u kberna size l 5MB
        ]);

        // Keep the current image URL by default
        $imageUrl = $room->image;

        // If a new image is uploaded → delete old one and store the new one
        if ($request->hasFile('image')) {

            // Delete old image from storage to free up space
            if ($room->image) {
                // Extract relative path from full URL to use with Storage facade
                // e.g. "http://localhost/storage/images/abc.jpg" → "images/abc.jpg"
                $oldPath = str_replace(asset('storage/'), '', $room->image);
                Storage::disk('public')->delete($oldPath);
            }

            // Store new image and generate its public URL
            $imagePath = $request->file('image')->store('images', 'public');
            $imageUrl = asset('storage/'.$imagePath);
        }

        // Update only the fields that were sent in the request
        $room->update([
            'room_number' => $request->room_number ?? $room->room_number,
            'description' => $request->description ?? $room->description,
            'price' => $request->price ?? $room->price,
            'capacity' => $request->capacity ?? $room->capacity,
            'type' => $request->type ?? $room->type,
            'status' => $request->status ?? $room->status,
            'image' => $imageUrl,
        ]);

        return response()->json([
            'message' => 'Room updated successfully',
            'data' => $room,
        ]);
    }

    /**
     * Remove the specified room from storage.
     */
    public function destroy($id)
    {
        // Find room by ID — returns null if not found
        $room = Room::find($id);

        // Return 404 if room doesn't exist
        if (! $room) {
            return response()->json(['message' => 'Room not found'], 404);
        }

        // Delete the image file from storage before deleting the room record
        if ($room->image) {
            // Extract relative path from full URL
            // e.g. "http://localhost/storage/images/abc.jpg" → "images/abc.jpg"
            $imagePath = str_replace(asset('storage/'), '', $room->image);

            // Check if file exists before trying to delete (avoid errors)
            if (Storage::disk('public')->exists($imagePath)) {
                Storage::disk('public')->delete($imagePath);
            }
        }

        // Delete room record from database
        $room->delete();

        return response()->json([
            'message' => 'Room and image deleted successfully',
        ]);
    }
}
