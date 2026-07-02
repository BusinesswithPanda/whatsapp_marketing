<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Workflow extends Model
{
    protected $fillable = [
        'company_id',
        'name',
        'trigger_type',
        'trigger_config',
        'steps',
        'is_active',
    ];

    protected $casts = [
        'trigger_config' => 'array',
        'steps' => 'array',
        'is_active' => 'boolean',
    ];
}
