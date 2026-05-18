import { router, useForm } from "@inertiajs/react";

export default function useUser(routeName, user = null) {
    const form = useForm({
        id: user?.id ?? '',
        name: user?.name ?? '',
        email: user?.email ?? '',
        roles: user?.roles?.map(role => role.id) ?? [],
        password: '',
        password_confirmation: '',
    });

    const storeForm = () => {
        form.post(route(`${routeName}store`), {
            onError: () => {
                console.error("Error al guardar el usuario");
            },
        });
    };

    const updateForm = () => {
        form.put(route(`${routeName}update`, form.data.id), {
            onError: () => {
                console.error("Error al actualizar el usuario");
            },
        });
    };

    const destroyUser = (userId) => {
        // if (!confirm('¿Estás seguro de eliminar este usuario?')) return;
        console.log(userId);
        router.delete(route(`${routeName}destroy`, userId));
    };

    return {
        form,
        storeForm,
        updateForm,
        destroyUser,
    };
}