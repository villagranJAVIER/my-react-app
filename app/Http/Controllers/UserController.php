<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    // use Filterable;
    protected string $routeName;
    protected string $source;
    protected Model $model;

    public function __construct()
    {
        $this->routeName = "users.";
        $this->source    = "Security/Users/";
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

        $users = User::query()->with('roles')
            ->when($filters['search'] ?? null, function ($query) use ($filters) {
                $query->where('name', 'LIKE', '%' . $filters['search'] . '%')
                    ->orWhere('email', 'LIKE', '%' . $filters['search'] . '%');
            })
            ->orderBy('created_at', 'desc')
            ->paginate($filters['rows'] ?? 5)
            ->withQueryString();

        return Inertia::render($this->source . 'Index', [
            'filters' => $filters,
            'title' => "Gestión de usuarios",
            'users' => $users,
            'routeName' => $this->routeName,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render($this->source . 'Create', [
            'title' => "Registrar un nuevo usuario",
            'routeName' => $this->routeName,
            'roles' => Role::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        try {
            $user = User::create($request->validated());
            $user->assignRole($request->roles);

            return redirect()->route($this->routeName . 'index')->with('success', 'Usuario creado exitosamente');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Ocurrio un error inesperado, por favor intenta de nuevo');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        abort(404);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render($this->source . 'Edit', [
            'title' => "Editar usuario",
            'routeName' => $this->routeName,
            'roles' => Role::all(),
            'user' => $user->load('roles'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        try {
            $fields = $request->validated();
            if (!$request->filled('password')) unset($fields['password']);

            $user->update($fields);
            $user->syncRoles($request->roles);

            return redirect()->route($this->routeName . 'index')->with('success', 'Usuario editado exitosamente');
        } catch (\Exception $e) {
            Log::info($e->getMessage());
            return redirect()->back()->with('error', 'Ocurrio un error inesperado, por favor intenta de nuevo');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        try {
            $user->delete();
            return redirect()->route($this->routeName . 'index')->with('success', 'Usuario eliminado exitosamente');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Ocurrio un error inesperado, por favor intenta de nuevo');
        }
    }
}
