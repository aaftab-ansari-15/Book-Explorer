import React from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { VIEW_MODES } from '../constants';

interface ViewModeToggleProps {
    currentMode: typeof VIEW_MODES[keyof typeof VIEW_MODES];
    onModeChange: (mode: typeof VIEW_MODES[keyof typeof VIEW_MODES]) => void;
}

export const ViewModeToggle: React.FC<ViewModeToggleProps> = ({ currentMode, onModeChange }) => {
    return (
        <div className="flex justify-end items-center mt-6">
            <button
                onClick={() => onModeChange(VIEW_MODES.GRID)}
                className={`p-2 rounded-md mr-2 ${currentMode === VIEW_MODES.GRID
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-500 hover:text-blue-600'
                    }`}
                aria-label="Grid View"
            >
                <LayoutGrid size={20} />
            </button>
            <button
                onClick={() => onModeChange(VIEW_MODES.LIST)}
                className={`p-2 rounded-md ${currentMode === VIEW_MODES.LIST
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-500 hover:text-blue-600'
                    }`}
                aria-label="List View"
            >
                <List size={20} />
            </button>
        </div>
    );
}; 