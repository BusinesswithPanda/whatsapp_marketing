<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;
use App\Models\Workflow;

class WorkflowController extends Controller
{
    public function index(Request $request)
    {
        $workflows = Workflow::where('company_id', $request->user()->company_id)
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('WhatsApp/Automations/Index', [
            'workflows' => $workflows
        ]);
    }

    public function create()
    {
        return Inertia::render('WhatsApp/Automations/Builder', [
            'workflow' => null
        ]);
    }

    public function edit(Request $request, Workflow $workflow)
    {
        if ($workflow->company_id !== $request->user()->company_id) {
            abort(403);
        }

        return Inertia::render('WhatsApp/Automations/Builder', [
            'workflow' => $workflow
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'trigger_type' => 'required|string',
            'trigger_config' => 'nullable|array',
            'steps' => 'nullable|array',
        ]);

        $workflow = Workflow::create([
            'company_id' => $request->user()->company_id,
            'name' => $request->name,
            'trigger_type' => $request->trigger_type,
            'trigger_config' => $request->trigger_config ?? [],
            'steps' => $request->steps ?? [],
            'is_active' => true,
        ]);

        return redirect()->route('whatsapp.automations.index')->with('success', 'Automation workflow created successfully.');
    }

    public function update(Request $request, Workflow $workflow)
    {
        if ($workflow->company_id !== $request->user()->company_id) {
            abort(403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'trigger_type' => 'required|string',
            'trigger_config' => 'nullable|array',
            'steps' => 'nullable|array',
            'is_active' => 'nullable|boolean',
        ]);

        $workflow->update([
            'name' => $request->name,
            'trigger_type' => $request->trigger_type,
            'trigger_config' => $request->trigger_config ?? [],
            'steps' => $request->steps ?? [],
            'is_active' => $request->has('is_active') ? $request->is_active : $workflow->is_active,
        ]);

        return redirect()->route('whatsapp.automations.index')->with('success', 'Automation workflow updated successfully.');
    }

    public function destroy(Request $request, Workflow $workflow)
    {
        if ($workflow->company_id !== $request->user()->company_id) {
            abort(403);
        }

        $workflow->delete();

        return back()->with('success', 'Automation workflow deleted successfully.');
    }
}
