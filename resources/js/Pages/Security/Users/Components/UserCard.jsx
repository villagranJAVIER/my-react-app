import Avatar from '@/Components/Avatar';

export default function UserCard({ user, children }) {
    const getAvatar = () => { return user.image ?? `https://ui-avatars.com/api/?name=${user.name}&background=random&color=fff` }
    const firstRole = user.roles[0]?.name;

    return (
        <div className="flex justify-between items-center border-b hover:shadow-md transition-all duration-200 p-4">
            <div className='flex gap-4'>
                <Avatar src={getAvatar()} alt={user.name} size='md' />
                <div>
                    <div className='flex gap-2'>
                        <h1 className="text-base font-bold">{user.name}</h1>
                        <p className='text-blue-500 font-bold'> {firstRole} </p>
                    </div>
                    <p className="text-sm text-gray-500">{user.email}</p>
                </div>
            </div>
            {children}
        </div>
    );
}