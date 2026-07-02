<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>
        <link id="dynamic-favicon" rel="icon" type="image/png" href="/images/pp.png">
        <script>
            // Dynamically crop the logo to a perfect square to remove the text and fix squishing
            const img = new Image();
            img.src = '/images/pp.png';
            img.onload = function() {
                const canvas = document.createElement('canvas');
                // Assume the "C" swirl icon is a square on the far left side
                const size = img.height; 
                canvas.width = size;
                canvas.height = size;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, size, size, 0, 0, size, size);
                document.getElementById('dynamic-favicon').href = canvas.toDataURL('image/png');
            };
        </script>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
