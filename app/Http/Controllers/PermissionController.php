<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePermissionRequest;
use App\Http\Requests\UpdatePermissionRequest;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    protected string $routeName;
    protected string $source;
    protected Model $model;

    public function __construct()
    {
        $this->routeName = "permissions.";
        $this->source    = "Security/Permissions/";
        $this->model     = new Permission();

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

        $permissions = Permission::query()
            ->when($filters['search'] ?? null, function ($query) use ($filters) {
                $query->where('name', 'LIKE', '%' . $filters['search'] . '%');
            })
            ->orderBy('created_at', 'desc')
            ->paginate($filters['rows'] ?? 5)
            ->withQueryString();

        return Inertia::render($this->source . 'Index', [
            'filters' => $filters,
            'title' => "Gestión de permisos",
            'permissions' => $permissions,
            'routeName' => $this->routeName,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render($this->source . 'Create', [
            'title' => "Agregar Permiso",
            'routeName' => $this->routeName,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePermissionRequest $request)
    {
        try {
            $fields = $request->validated();

            Permission::create($fields);
            return redirect()->route($this->routeName . 'index')->with('success', 'Permiso creado exitosamente');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Ocurrio un error inesperado, por favor intenta de nuevo');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Permission $permission)
    {
        abort(404);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Permission $permission)
    {
        return Inertia::render($this->source . 'Edit', [
            'title' => "Editar Permiso",
            'routeName' => $this->routeName,
            'permission' => $permission,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePermissionRequest $request, Permission $permission)
    {
        try {
            $permission->update($request->validated());
            return redirect()->route($this->routeName . 'index')->with('success', 'Permiso actualizado exitosamente');
        } catch (\Exception $e) {
            Log::info($e->getMessage());
            return redirect()->back()->with('error', 'Ocurrio un error inesperado, por favor intenta de nuevo');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Permission $permission)
    {
        try {
            $permission->delete();
            return redirect()->route($this->routeName . 'index')->with('success', 'Permiso eliminado exitosamente');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Ocurrio un error inesperado, por favor intenta de nuevo');
        }
    }
}
