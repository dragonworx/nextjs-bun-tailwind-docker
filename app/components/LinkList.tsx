'use client'

import Link from 'next/link'

interface LinkItem {
  href: string
  label: string
  description?: string
}

interface LinkListProps {
  items: LinkItem[]
}

export default function LinkList({ items }: LinkListProps) {
  return (
    <ul className="list-none p-0 m-0 space-y-3">
      {items.map((item, index) => (
        <li key={index}>
          <Link 
            href={item.href}
            className="group block p-4 rounded-xl no-underline transition-all duration-300 bg-gradient-to-r from-indigo-50/80 to-purple-50/80 border border-indigo-100/60 hover:from-indigo-100/90 hover:to-purple-100/90 hover:border-indigo-200 hover:shadow-lg hover:scale-[1.02] transform"
          >
            <div className="text-indigo-600 font-semibold text-base group-hover:text-indigo-700 transition-colors duration-200 flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-400 rounded-full group-hover:bg-indigo-500 transition-colors duration-200"></div>
              {item.label}
            </div>
            {item.description && (
              <div className="text-gray-600 text-sm mt-1 pl-4 group-hover:text-gray-700 transition-colors duration-200">
                {item.description}
              </div>
            )}
          </Link>
        </li>
      ))}
    </ul>
  )
}
