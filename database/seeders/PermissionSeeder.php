<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create(['name' => 'users.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'users.store', 'guard_name' => 'web']);
        Permission::create(['name' => 'users.update', 'guard_name' => 'web']);
        Permission::create(['name' => 'users.delete', 'guard_name' => 'web']);

        Permission::create(['name' => 'roles.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'roles.store', 'guard_name' => 'web']);
        Permission::create(['name' => 'roles.update', 'guard_name' => 'web']);
        Permission::create(['name' => 'roles.delete', 'guard_name' => 'web']);

        Permission::create(['name' => 'permissions.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'permissions.store', 'guard_name' => 'web']);
        Permission::create(['name' => 'permissions.update', 'guard_name' => 'web']);
        Permission::create(['name' => 'permissions.delete', 'guard_name' => 'web']);
    }
}
