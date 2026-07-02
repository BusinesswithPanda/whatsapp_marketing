<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Contact;

class ContactController extends Controller
{
    public function index(Request $request)
    {
        $query = Contact::where('company_id', $request->user()->company_id);

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('phone', 'like', "%{$search}%")
                  ->orWhere('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhere('tags', 'like', "%{$search}%");
            });
        }

        if ($request->filled('tag')) {
            $tag = $request->tag;
            $query->where('tags', 'like', '%"'.$tag.'"%');
        }

        $contacts = $query->orderBy('id', 'desc')->paginate(50)->withQueryString();
        
        // Extract unique tags for the filter dropdown
        $allTagsJson = Contact::where('company_id', $request->user()->company_id)
            ->whereNotNull('tags')
            ->pluck('tags')
            ->toArray();
            
        $uniqueTags = [];
        foreach ($allTagsJson as $json) {
            $arr = json_decode($json, true);
            if (is_array($arr)) {
                foreach ($arr as $t) {
                    $t = trim($t);
                    if (!empty($t) && !in_array($t, $uniqueTags)) {
                        $uniqueTags[] = $t;
                    }
                }
            }
        }
        sort($uniqueTags);
            
        return Inertia::render('WhatsApp/Contacts/Index', [
            'contacts' => $contacts,
            'availableTags' => $uniqueTags,
            'filters' => $request->only('search', 'tag')
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'phone' => 'required|string',
            'first_name' => 'nullable|string',
            'last_name' => 'nullable|string',
            'tags' => 'nullable|array',
            'custom_fields' => 'nullable|array',
        ]);

        Contact::updateOrCreate(
            ['company_id' => $request->user()->company_id, 'phone' => $request->phone],
            [
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'tags' => json_encode($request->tags ?? []),
                'custom_fields' => json_encode($request->custom_fields ?? []),
            ]
        );

        return back()->with('success', 'Contact saved successfully.');
    }

    public function update(Request $request, Contact $contact)
    {
        if ($contact->company_id !== $request->user()->company_id) {
            abort(403);
        }

        $request->validate([
            'phone' => 'required|string',
            'first_name' => 'nullable|string',
            'last_name' => 'nullable|string',
            'tags' => 'nullable|array',
        ]);

        $contact->update([
            'phone' => $request->phone,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'tags' => json_encode($request->tags ?? []),
        ]);

        return back()->with('success', 'Contact updated successfully.');
    }

    public function destroy(Request $request, Contact $contact)
    {
        if ($contact->company_id !== $request->user()->company_id) {
            abort(403);
        }

        $contact->delete();

        return back()->with('success', 'Contact deleted successfully.');
    }

    public function bulkDestroy(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:contacts,id',
        ]);

        Contact::whereIn('id', $request->ids)
            ->where('company_id', $request->user()->company_id)
            ->delete();

        return back()->with('success', 'Selected contacts deleted successfully.');
    }

    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:csv,txt',
        ]);

        $file = $request->file('file');
        $fileHandle = fopen($file->getRealPath(), 'r');
        $rawHeader = fgetcsv($fileHandle);
        
        // Normalize headers: remove BOM, trim whitespace, and make lowercase
        $header = array_map(function($col) {
            $col = preg_replace('/^[\xef\xbb\xbf]+/', '', $col);
            return trim(strtolower($col));
        }, $rawHeader);
        
        while ($row = fgetcsv($fileHandle)) {
            // Trim row values to avoid empty spaces causing issues
            $row = array_map('trim', $row);
            
            if (count($header) == count($row)) {
                $data = array_combine($header, $row);
                
                // Allow 'phone', 'phone number', 'phone_number', etc.
                $phone = $data['phone'] ?? $data['phone_number'] ?? $data['phonenumber'] ?? $data['phone number'] ?? null;
                
                // Handle first_name, last_name or just 'name'
                $firstName = $data['first_name'] ?? $data['firstname'] ?? $data['first name'] ?? null;
                $lastName = $data['last_name'] ?? $data['lastname'] ?? $data['last name'] ?? null;
                
                if (empty($firstName) && empty($lastName) && isset($data['name'])) {
                    $parts = explode(' ', trim($data['name']), 2);
                    $firstName = $parts[0] ?? null;
                    $lastName = $parts[1] ?? null;
                }
                
                // Handle tags
                $tagsRaw = $data['tags'] ?? $data['tag'] ?? null;
                $tagsArr = !empty($tagsRaw) ? array_map('trim', explode(',', $tagsRaw)) : [];
                
                if (!empty($phone)) {
                    Contact::updateOrCreate(
                        ['company_id' => $request->user()->company_id, 'phone' => $phone],
                        [
                            'first_name' => $firstName,
                            'last_name' => $lastName,
                            'tags' => json_encode($tagsArr),
                            'custom_fields' => json_encode(['source' => 'csv_upload']),
                        ]
                    );
                }
            }
        }
        fclose($fileHandle);

        return back()->with('success', 'Contacts imported successfully.');
    }
}
