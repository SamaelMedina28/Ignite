<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required',
            'client' => 'required',
            'description' => 'required|min:5',
            'review' => 'nullable|string',
            'type' => 'required|in:branding,rebranding',
            'image_path' => 'required',
        ];
    }
    public function messages(): array
    {
        return [
            'name.required' => 'The name field is required.',
            'client.required' => 'The client field is required.',
            'description.required' => 'The description field is required.',
            'description.min' => 'The description must be at least 5 characters.',
            'review.required' => 'The review field is required.',
            'type.required' => 'The type field is required.',
            'type.in' => 'The type must be branding or rebranding.',
            'image_path.required' => 'The image path field is required.',
        ];
    }
}
