<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\StudentController;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::get('/teachers',[TeacherController::class,'index'])->name('teachers.index');
    Route::post('/teachers',[TeacherController::class,'store'])->name('teachers.store');
    Route::put('/teachers/{id}',[TeacherController::class,'update'])->name('teachers.update');
    Route::delete('/teachers/{id}',[TeacherController::class,'destroy'])->name('teachers.destroy');

    Route::get('students',[StudentController::class,'index'])->name('students.index');
    Route::post('students',[StudentController::class,'store'])->name('students.store');
    Route::put('students/{id}',[StudentController::class,'update'])->name('students.update');
    Route::delete('students/{id}',[StudentController::class,'destroy'])->name('students.destroy');

});

require __DIR__.'/settings.php';
