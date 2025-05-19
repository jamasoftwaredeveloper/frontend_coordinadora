import { BookmarkSquareIcon, UserIcon } from '@heroicons/react/20/solid'
import { CarIcon } from 'lucide-react'
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useUserAuthQuery } from '../hooks/Queries/useAuthQuery'

const allTabs = [
    { name: 'Ordenes de envio', href: '/admin', icon: BookmarkSquareIcon },
    { name: 'Crear envio', href: '/admin/shipping/order', icon: UserIcon },
    { name: 'Crear transporte', href: '/admin/transporter', icon: CarIcon },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function NavigationTabs() {
    const location = useLocation()
    const navigation = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        navigation(e.target.value);
    }
      const { data: user } = useUserAuthQuery();
    const tabs = allTabs.filter(tab => {
        if (tab.name === 'Crear transporte' && user?.role !== 'admin') {
          return false; // esconder esta pestaña si no es admin
        }
        return true;
      });
    return (
        <div className='mb-5'>
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    onChange={handleChange}
                >
                    {tabs.map((tab) => (
                        <option
                            value={tab.href}
                            key={tab.name}
                        >{tab.name}</option>
                    ))}
                </select>
            </div>

            <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <Link
                                key={tab.name}
                                to={tab.href}
                                className={classNames(
                                    location.pathname === tab.href
                                        ? 'border-blue-500 text-blue-500'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                    'group inline-flex items-center border-b-2 py-4 px-1 text-xl'
                                )}
                            >
                                <tab.icon
                                    className={classNames(
                                        location.pathname === tab.href ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500',
                                        '-ml-0.5 mr-2 h-5 w-5'
                                    )}
                                    aria-hidden="true"
                                />
                                <span>{tab.name}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
}