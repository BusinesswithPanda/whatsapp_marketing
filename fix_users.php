<?php
use App\Models\User;
use App\Models\Company;

$users = User::whereNull('company_id')->get();
foreach ($users as $u) {
    $c = Company::create(['name' => $u->name . '\'s Company']);
    $u->company_id = $c->id;
    $u->save();
    echo "Assigned company to " . $u->email . "\n";
}
echo "Done.";
