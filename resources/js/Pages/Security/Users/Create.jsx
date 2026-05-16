import PrimaryButton from "@/Components/PrimaryButton";
import CardBox from "@/Components/ui/card-box/CardBox";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeft, Check, PencilIcon } from "lucide-react";
import useUser from "./Composables/useUser";
import UserForm from "./Components/UserForm";

export default function Create({ title, routeName, roles }) {
    const { form, storeForm } = useUser(routeName);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {title}
                </h2>
            }
        >
            <Head title={title} />
            <CardBox
                footer={
                    <div className="flex gap-6 items-center w-full">
                        <Link href={route(`${routeName}index`)}>
                            <PrimaryButton color='white'>
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Regresar
                            </PrimaryButton>
                        </Link>
                        <PrimaryButton color='black' onClick={storeForm} disabled={form.processing} >
                            <Check className="w-4 h-4 mr-2" />
                            Guardar
                        </PrimaryButton>
                    </div>
                }
            >
                <UserForm form={form} roles={roles} />
            </CardBox>
        </AuthenticatedLayout>
    );
}