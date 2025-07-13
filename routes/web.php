<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProjectController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('projects',[ProjectController::class, 'index'])->name('projects.index');
    Route::delete('projects/{project}', [ProjectController::class, 'destroy'])->name('projects.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
