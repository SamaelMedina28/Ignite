<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'client' => fake()->name(),
            'description' => fake()->text(),
            'review' => fake()->text(),
            'type' => fake()->randomElement(['branding', 'rebranding']),
            'image_path' => fake()->imageUrl(),
        ];
    }
}
