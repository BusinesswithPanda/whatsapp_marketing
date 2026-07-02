<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WhatsappTemplate extends Model
{
    protected $fillable = [
        'waba_id',
        'element_name',
        'language',
        'category',
        'status',
        'header_type',
        'header_text',
        'header_media_path',
        'body_text',
        'footer_text',
        'buttons',
    ];
}
