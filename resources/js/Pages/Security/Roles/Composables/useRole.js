import { router, useForm } from "@inertiajs/react";

export default function useRole(routeName, role = null) {
    const form = useForm({
        id: role?.id ?? '',
        name: role?.name ?? '',
        permissions: role?.permissions.map((permission) => permission.id) ?? [],
    });

    const storeForm = () => {
        form.post(route(`${routeName}store`), {
            onError: () => {
                console.error("Error al guardar el rol");
            },
        });
    };

    const updateForm = () => {
        form.put(route(`${routeName}update`, form.data.id), {
            onError: () => {
                console.error("Error al actualizar el rol");
            },
        });
    };

    const destroyRole = (roleId) => {
        // if (!confirm('¿Estás seguro de eliminar este rol?')) return;
        router.delete(route(`${routeName}destroy`, roleId));
    };

    return {
        form,
        storeForm,
        updateForm,
        destroyRole,
    };
}