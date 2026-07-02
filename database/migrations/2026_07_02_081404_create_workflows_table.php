<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('workflows', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('trigger_type'); // welcome, keyword, tag_added, abandoned_cart
            $table->json('trigger_config')->nullable(); // e.g. {"keyword": "price", "match_type": "contains"}
            $table->json('steps')->nullable(); // array of steps: [{"id": "s1", "type": "message", "data": {"body": "hello"}}, ...]
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('workflows');
    }
};
