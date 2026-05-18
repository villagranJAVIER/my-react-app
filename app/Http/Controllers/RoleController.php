<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRoleRequest;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateRoleRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    // use Filterable;
    protected string $routeName;
    protected string $source;
    protected Model $model;

    public function __construct()
    {
        $this->routeName = "roles.";
        $this->source    = "Security/Roles/";
        $this->model     = new User();

        $this->middleware("permission:{$this->routeName}index")->only(['index', 'show']);
        $this->middleware("permission:{$this->routeName}store")->only(['store', 'create']);
        $this->middleware("permission:{$this->routeName}update")->only(['edit', 'update']);
        $this->middleware("permission:{$this->routeName}delete")->only(['destroy']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filters = $request->query();

        $roles = Role::query()
            ->when($filters['search'] ?? null, function ($query) use ($filters) {
                $query->where('name', 'LIKE', '%' . $filters['search'] . '%');
            })
            ->orderBy('created_at', 'desc')
            ->paginate($filters['rows'] ?? 5)
            ->withQueryString();

        return Inertia::render($this->source . 'Index', [
            'filters' => $filters,
            'title' => "Gestión de roles",
            'roles' => $roles,
            'routeName' => $this->routeName,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render($this->source . 'Create', [
            'title' => "Agregar Rol",
            'routeName' => $this->routeName,
            'permissions' => Permission::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRoleRequest $request)
    {
        try {
            $fields = $request->validated();

            $role = Role::create($fields);
            $role->givePermissionTo($fields['permissions']);
            return redirect()->route($this->routeName . 'index')->with('success', 'Rol creado exitosamente');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Ocurrio un error inesperado, por favor intenta de nuevo');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role)
    {
        abort(404);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        return Inertia::render($this->source . 'Edit', [
            'title' => "Editar Rol",
            'routeName' => $this->routeName,
            'permissions' => Permission::all(),
            'role' => $role->load('permissions'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoleRequest $request, Role $role)
    {
        try {
            $fields = $request->validated();

            $role->update($fields);
            $role->syncPermissions($fields['permissions']);
            return redirect()->route($this->routeName . 'index')->with('success', 'Rol actualizado exitosamente');
        } catch (\Exception $e) {
            Log::info($e->getMessage());
            return redirect()->back()->with('error', 'Ocurrio un error inesperado, por favor intenta de nuevo');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        try {
            $role->delete();
            return redirect()->route($this->routeName . 'index')->with('success', 'Rol eliminado exitosamente');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Ocurrio un error inesperado, por favor intenta de nuevo');
        }
    }
}
