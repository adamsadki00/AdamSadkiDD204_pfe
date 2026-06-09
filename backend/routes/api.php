<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\IsAdmin;

//  Public Routes
// Auth - registration and login are public
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// Rooms — public read (browse without login)
Route::get('rooms',       [RoomController::class, 'index']);
Route::get('rooms/{id}',  [RoomController::class, 'show']);

//  Authenticated Routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);

    // Bookings
    Route::apiResource('bookings', BookingController::class);
});

// Admin Routes
Route::middleware(['auth:sanctum', IsAdmin::class])->group(function () {
    // Rooms — write access for admin only
    Route::post('rooms',        [RoomController::class, 'store']);
    Route::put('rooms/{id}',    [RoomController::class, 'update']);
    Route::delete('rooms/{id}', [RoomController::class, 'destroy']);

    // Users
    Route::apiResource('users', UserController::class);

    // Dashboard
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);
});