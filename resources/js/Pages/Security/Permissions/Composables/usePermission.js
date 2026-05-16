import { router, useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function usePermission(routeName, permission = null, close) {
    const form = useForm({
        id: permission?.id ?? '',
        name: permission?.name ?? '',
    });

    useEffect(() => {
        form.setData({
            id: permission?.id ?? '',
            name: permission?.name ?? '',
        });
        form.clearErrors();
    }, [permission]);

    const storeForm = () => {
        form.post(route(`${routeName}store`), {
            onSuccess: () => {
                form.reset();
                close();
            },
        });
    };

    const updateForm = () => {
        form.put(route(`${routeName}update`, form.data.id), {
            onSuccess: () => {
                form.reset();
                close();
            },
        });
    };

    const destroyPermission = (permissionId) => {
        // if (!confirm('¿Estás seguro de eliminar este permiso?')) return;
        router.delete(route(`${routeName}destroy`, permissionId));
    };

    return {
        form,
        storeForm,
        updateForm,
        destroyPermission,
    };
}