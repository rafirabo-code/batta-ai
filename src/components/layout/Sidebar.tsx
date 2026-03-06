import { NavLink, useLocation } from 'react-router';
import { LayoutDashboard, ShieldCheck, List, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useStore } from '@/store';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/inventory', icon: List, label: 'Inventory' },
];

export function Sidebar() {
  const location = useLocation();
  const { sidebarCollapsed, toggleSidebar } = useStore();

  return (
    <aside
      className={`h-screen bg-stone-50 border-r border-stone-200 flex flex-col shrink-0 transition-all duration-300 ${
        sidebarCollapsed ? 'w-16' : 'w-60'
      }`}
    >
      <div className={`py-5 border-b border-stone-200/60 ${sidebarCollapsed ? 'px-3' : 'px-5'}`}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-batta-400 to-batta-600 flex items-center justify-center shadow-sm shrink-0">
            <ShieldCheck className="w-4.5 h-4.5 text-white" />
          </div>
          {!sidebarCollapsed && (
            <div>
              <span className="text-lg font-bold text-stone-900 tracking-tight">Batta</span>
              <span className="text-lg font-bold text-batta-500 tracking-tight">.ai</span>
            </div>
          )}
        </div>
      </div>

      <nav className={`flex-1 py-4 space-y-0.5 ${sidebarCollapsed ? 'px-2' : 'px-3'}`}>
        {navItems.map((item) => {
          const isActive =
            item.to === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.to);
          return (
            <NavLink
              key={item.to}
              to={item.to}
              title={sidebarCollapsed ? item.label : undefined}
              className={`flex items-center gap-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                sidebarCollapsed ? 'justify-center px-0' : 'px-3'
              } ${
                isActive
                  ? 'bg-batta-50 text-batta-600 shadow-sm shadow-batta-100'
                  : 'text-stone-500 hover:bg-stone-100 hover:text-stone-800'
              }`}
            >
              <item.icon className={`w-[18px] h-[18px] shrink-0 ${isActive ? 'text-batta-500' : 'text-stone-400'}`} />
              {!sidebarCollapsed && item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={toggleSidebar}
        className={`mx-auto mb-2 p-2 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors ${
          sidebarCollapsed ? '' : 'ml-3'
        }`}
        title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {sidebarCollapsed ? (
          <PanelLeftOpen className="w-4 h-4" />
        ) : (
          <PanelLeftClose className="w-4 h-4" />
        )}
      </button>

      <div className={`py-4 border-t border-stone-200/60 ${sidebarCollapsed ? 'px-3' : 'px-4'}`}>
        <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center text-xs font-semibold text-stone-600 shrink-0">
            SC
          </div>
          {!sidebarCollapsed && (
            <div className="min-w-0">
              <div className="text-sm font-medium text-stone-700 truncate">Sarah Chen</div>
              <div className="text-xs text-stone-400">Security Architect</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
