import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { BookOpen, Save, FileText, Download, Printer, Image as ImageIcon, List, Bold, Italic, Link as LinkIcon, Plus } from 'lucide-react';
import { useState } from 'react';

const SECTIONS = [
    'Introduction',
    'Getting Started',
    'Campaign Creation',
    'Contact Management',
    'Template Creation',
    'Automation Setup',
    'Reports & Analytics',
    'FAQ'
];

export default function ManualBuilder() {
    const [activeSection, setActiveSection] = useState(SECTIONS[0]);
    const [content, setContent] = useState('');

    const handlePrint = () => {
        window.print();
    };

    return (
        <AuthenticatedLayout header={
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold leading-tight text-gray-800 dark:text-gray-200 tracking-tight flex items-center">
                    <BookOpen className="w-6 h-6 mr-3 text-indigo-500" /> User Manual Builder
                </h2>
                <div className="flex space-x-3">
                    <button onClick={handlePrint} className="inline-flex items-center justify-center rounded-xl bg-white/50 backdrop-blur-md px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-white dark:bg-gray-800/50 dark:text-gray-200 dark:ring-gray-700 dark:hover:bg-gray-800 transition-all">
                        <Printer className="mr-2 h-4 w-4" /> Print
                    </button>
                    <button className="inline-flex items-center justify-center rounded-xl bg-white/50 backdrop-blur-md px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-white dark:bg-gray-800/50 dark:text-gray-200 dark:ring-gray-700 dark:hover:bg-gray-800 transition-all">
                        <Download className="mr-2 h-4 w-4" /> Export PDF
                    </button>
                    <button className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 transition-all">
                        <Save className="mr-2 h-4 w-4" /> Save Changes
                    </button>
                </div>
            </div>
        }>
            <Head title="User Manual Builder" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col md:flex-row gap-6 h-[calc(100vh-12rem)]">
                    
                    {/* Sidebar Sections */}
                    <div className="w-full md:w-64 flex-shrink-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden flex flex-col shadow-sm">
                        <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
                            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                                <FileText className="w-4 h-4 mr-2 text-gray-500" /> Document Sections
                            </h3>
                        </div>
                        <div className="flex-1 overflow-y-auto p-2 space-y-1">
                            {SECTIONS.map(section => (
                                <button
                                    key={section}
                                    onClick={() => setActiveSection(section)}
                                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                                        activeSection === section 
                                        ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300' 
                                        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700/50'
                                    }`}
                                >
                                    {section}
                                </button>
                            ))}
                        </div>
                        <div className="p-3 border-t border-gray-100 dark:border-gray-700">
                            <button className="w-full flex items-center justify-center text-sm font-medium text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                <Plus className="w-4 h-4 mr-1" /> Add Custom Section
                            </button>
                        </div>
                    </div>

                    {/* Main Editor Area */}
                    <div className="flex-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm flex flex-col overflow-hidden">
                        {/* Editor Toolbar */}
                        <div className="border-b border-gray-200 dark:border-gray-700 p-2 flex flex-wrap gap-1 bg-gray-50/50 dark:bg-gray-900/50">
                            <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"><Bold className="w-4 h-4" /></button>
                            <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"><Italic className="w-4 h-4" /></button>
                            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 my-auto mx-1"></div>
                            <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 flex items-center"><List className="w-4 h-4 mr-1" /> <span className="text-xs font-medium">Steps</span></button>
                            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 my-auto mx-1"></div>
                            <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 flex items-center"><ImageIcon className="w-4 h-4 mr-1" /> <span className="text-xs font-medium">Screenshot</span></button>
                            <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"><LinkIcon className="w-4 h-4" /></button>
                        </div>
                        
                        {/* Content Area */}
                        <div className="flex-1 overflow-y-auto p-8 lg:p-12">
                            <div className="max-w-3xl mx-auto">
                                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6 focus:outline-none" contentEditable suppressContentEditableWarning>
                                    {activeSection}
                                </h1>
                                
                                <div className="prose prose-indigo dark:prose-invert max-w-none focus:outline-none min-h-[400px]" contentEditable suppressContentEditableWarning>
                                    <p className="text-lg text-gray-500 dark:text-gray-400">
                                        Start typing the content for the {activeSection.toLowerCase()} section here. You can paste screenshots directly into this editor.
                                    </p>
                                    <br/>
                                    <h3>Step-by-Step Guide</h3>
                                    <ol>
                                        <li>First step description...</li>
                                        <li>Second step description...</li>
                                        <li>Final result...</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
