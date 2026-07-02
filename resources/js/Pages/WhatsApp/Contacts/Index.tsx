import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { FormEventHandler, useState, useRef, useEffect } from 'react';
import { Upload, Users, Plus, Search, Edit2, Trash2, Filter } from 'lucide-react';
import Modal from '@/Components/Modal';

export default function ContactsIndex({ contacts, availableTags = [], filters }: { contacts: any, availableTags?: string[], filters?: any }) {
    const [searchQuery, setSearchQuery] = useState(filters?.search || '');
    const [selectedTag, setSelectedTag] = useState(filters?.tag || '');
    const [isAddContactModalOpen, setAddContactModalOpen] = useState(false);
    const [isEditContactModalOpen, setEditContactModalOpen] = useState(false);
    const [editingContactId, setEditingContactId] = useState<number | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const fileInput = useRef<HTMLInputElement>(null);
    const { data: uploadData, setData: setUploadData, post: uploadPost, processing: uploading } = useForm({
        file: null as File | null
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (searchQuery !== (filters?.search || '') || selectedTag !== (filters?.tag || '')) {
                router.get(route('whatsapp.contacts.index'), { search: searchQuery, tag: selectedTag }, {
                    preserveState: true,
                    replace: true,
                });
            }
        }, 300);
        return () => clearTimeout(timeout);
    }, [searchQuery, selectedTag]);

    const handleUpload: FormEventHandler = (e) => {
        e.preventDefault();
        uploadPost(route('whatsapp.contacts.upload'), {
            onSuccess: () => {
                if (fileInput.current) fileInput.current.value = '';
                setUploadData('file', null);
            }
        });
    };

    const { data: addData, setData: setAddData, post: addPost, processing: adding, reset: resetAdd, errors: addErrors, transform } = useForm({
        phone: '',
        first_name: '',
        last_name: '',
        tags: ''
    });

    transform((data) => ({
        ...data,
        tags: data.tags ? data.tags.split(',').map(t => t.trim()).filter(Boolean) : []
    }));

    const handleAddContact: FormEventHandler = (e) => {
        e.preventDefault();
        addPost(route('whatsapp.contacts.store'), {
            onSuccess: () => {
                setAddContactModalOpen(false);
                resetAdd();
            }
        });
    };

    const { data: editData, setData: setEditData, put: editPut, processing: editing, reset: resetEdit, errors: editErrors, transform: transformEdit } = useForm({
        phone: '',
        first_name: '',
        last_name: '',
        tags: ''
    });

    transformEdit((data) => ({
        ...data,
        tags: data.tags ? data.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : []
    }));

    const openEditModal = (contact: any) => {
        setEditingContactId(contact.id);
        setEditData({
            phone: contact.phone || '',
            first_name: contact.first_name || '',
            last_name: contact.last_name || '',
            tags: JSON.parse(contact.tags || '[]').join(', ')
        });
        setEditContactModalOpen(true);
    };

    const handleEditContact: FormEventHandler = (e) => {
        e.preventDefault();
        if (!editingContactId) return;
        editPut(route('whatsapp.contacts.update', editingContactId), {
            onSuccess: () => {
                setEditContactModalOpen(false);
                resetEdit();
                setEditingContactId(null);
            }
        });
    };

    const handleDeleteContact = (contactId: number) => {
        if (confirm('Are you sure you want to delete this contact?')) {
            router.delete(route('whatsapp.contacts.destroy', contactId));
        }
    };

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedIds(contacts.data.map((c: any) => c.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelect = (id: number) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(i => i !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const handleBulkDelete = () => {
        if (selectedIds.length === 0) return;
        if (confirm(`Are you sure you want to delete ${selectedIds.length} selected contacts?`)) {
            router.post(route('whatsapp.contacts.bulk-delete'), { ids: selectedIds }, {
                onSuccess: () => setSelectedIds([])
            });
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Contact CRM</h2>}>
            <Head title="Contacts CRM" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4 bg-white p-6 shadow sm:rounded-lg dark:bg-gray-800">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Audience Segments</h3>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Upload a CSV file (phone, first_name, last_name, tags) to bulk import contacts.
                            </p>
                        </div>
                        <form onSubmit={handleUpload} className="flex items-center gap-4">
                            <input 
                                type="file" 
                                ref={fileInput}
                                accept=".csv,.txt"
                                onChange={e => setUploadData('file', e.target.files ? e.target.files[0] : null)}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 dark:text-gray-400 dark:file:bg-gray-700 dark:file:text-emerald-400" 
                            />
                            <button 
                                disabled={uploading || !uploadData.file} 
                                className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-bold text-white shadow-[0_4px_15px_rgba(228,15,122,0.2)] hover:shadow-[0_6px_20px_rgba(228,15,122,0.3)] hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none"
                                style={{ background: 'linear-gradient(to right, #FDB337, #FC5247, #E40F7A, #D150D7, #235BDD, #2ABCFB)' }}
                            >
                                <Upload className="-ml-0.5 mr-1.5 h-4 w-4" />
                                Import
                            </button>
                        </form>
                    </div>

                    <div className="bg-white shadow sm:rounded-lg dark:bg-gray-800 overflow-hidden">
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
                            <div className="relative flex-1 max-w-sm flex gap-2">
                                <div className="relative flex-1">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Search className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input 
                                        type="text" 
                                        className="block w-full rounded-md border-gray-300 pl-10 focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white" 
                                        placeholder="Search by name, phone, or tags..." 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <div className="relative w-48">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Filter className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <select
                                        className="block w-full rounded-md border-gray-300 pl-10 pr-8 focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                        value={selectedTag}
                                        onChange={(e) => setSelectedTag(e.target.value)}
                                    >
                                        <option value="">All Tags</option>
                                        {availableTags.map((tag, idx) => (
                                            <option key={idx} value={tag}>{tag}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {selectedIds.length > 0 && (
                                    <button 
                                        onClick={handleBulkDelete}
                                        className="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 transition-colors"
                                    >
                                        <Trash2 className="-ml-0.5 mr-1.5 h-4 w-4" />
                                        Delete Selected ({selectedIds.length})
                                    </button>
                                )}
                                <button 
                                    onClick={() => setAddContactModalOpen(true)}
                                    className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-bold text-white shadow-[0_4px_15px_rgba(228,15,122,0.2)] hover:shadow-[0_6px_20px_rgba(228,15,122,0.3)] hover:-translate-y-0.5 transition-all duration-200"
                                    style={{ background: 'linear-gradient(to right, #FDB337, #FC5247, #E40F7A, #D150D7, #235BDD, #2ABCFB)' }}
                                >
                                    <Plus className="-ml-0.5 mr-1.5 h-4 w-4" />
                                    Add Contact
                                </button>
                            </div>
                        </div>
                        <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-900">
                                <tr>
                                    <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
                                        <input
                                            type="checkbox"
                                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            checked={contacts.data.length > 0 && selectedIds.length === contacts.data.length}
                                            onChange={handleSelectAll}
                                        />
                                    </th>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-0">Name</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Phone Number</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Tags (JSON)</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                                {contacts.data.map((contact: any) => (
                                    <tr key={contact.id} className={selectedIds.includes(contact.id) ? 'bg-gray-50 dark:bg-gray-800/50' : ''}>
                                        <td className="relative px-7 sm:w-12 sm:px-6">
                                            {selectedIds.includes(contact.id) && (
                                                <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                                            )}
                                            <input
                                                type="checkbox"
                                                className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                checked={selectedIds.includes(contact.id)}
                                                onChange={() => handleSelect(contact.id)}
                                            />
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-0">
                                            {contact.first_name} {contact.last_name}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{contact.phone}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                                            <div className="flex gap-1">
                                                {JSON.parse(contact.tags || '[]').map((tag: string, i: number) => (
                                                    <span key={i} className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/30 dark:text-blue-400">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                                            {contact.is_blocked ? (
                                                <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 dark:bg-red-900/30 dark:text-red-400">Opted Out</span>
                                            ) : (
                                                <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/10 dark:bg-emerald-900/30 dark:text-emerald-400">Active</span>
                                            )}
                                        </td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <div className="flex justify-end gap-3">
                                                <button onClick={() => openEditModal(contact)} className="text-[#235BDD] hover:text-[#2ABCFB] dark:text-[#2ABCFB] dark:hover:text-blue-300 transition-colors">
                                                    <Edit2 className="h-4 w-4" />
                                                </button>
                                                <button onClick={() => handleDeleteContact(contact.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal show={isAddContactModalOpen} onClose={() => setAddContactModalOpen(false)}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Add New Contact
                    </h2>

                    <form onSubmit={handleAddContact} className="mt-6 space-y-6">
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number (with country code)</label>
                            <input
                                id="phone"
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                value={addData.phone}
                                onChange={(e) => setAddData('phone', e.target.value)}
                                placeholder="e.g. 1234567890"
                                required
                            />
                            {addErrors.phone && <div className="mt-2 text-sm text-red-600">{addErrors.phone}</div>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                                <input
                                    id="first_name"
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                    value={addData.first_name}
                                    onChange={(e) => setAddData('first_name', e.target.value)}
                                />
                                {addErrors.first_name && <div className="mt-2 text-sm text-red-600">{addErrors.first_name}</div>}
                            </div>
                            <div>
                                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                                <input
                                    id="last_name"
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                    value={addData.last_name}
                                    onChange={(e) => setAddData('last_name', e.target.value)}
                                />
                                {addErrors.last_name && <div className="mt-2 text-sm text-red-600">{addErrors.last_name}</div>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tags (comma separated)</label>
                            <input
                                id="tags"
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                value={addData.tags}
                                onChange={(e) => setAddData('tags', e.target.value)}
                                placeholder="VIP, Newsletter, Customer"
                            />
                            {addErrors.tags && <div className="mt-2 text-sm text-red-600">{addErrors.tags}</div>}
                        </div>

                        <div className="mt-6 flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => setAddContactModalOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={adding}
                                className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-bold text-white shadow-[0_4px_15px_rgba(228,15,122,0.2)] hover:shadow-[0_6px_20px_rgba(228,15,122,0.3)] hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none"
                                style={{ background: 'linear-gradient(to right, #FDB337, #FC5247, #E40F7A, #D150D7, #235BDD, #2ABCFB)' }}
                            >
                                Save Contact
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>

            <Modal show={isEditContactModalOpen} onClose={() => setEditContactModalOpen(false)}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Edit Contact
                    </h2>

                    <form onSubmit={handleEditContact} className="mt-6 space-y-6">
                        <div>
                            <label htmlFor="edit_phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number (with country code)</label>
                            <input
                                id="edit_phone"
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                value={editData.phone}
                                onChange={(e) => setEditData('phone', e.target.value)}
                                required
                            />
                            {editErrors.phone && <div className="mt-2 text-sm text-red-600">{editErrors.phone}</div>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="edit_first_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                                <input
                                    id="edit_first_name"
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                    value={editData.first_name}
                                    onChange={(e) => setEditData('first_name', e.target.value)}
                                />
                                {editErrors.first_name && <div className="mt-2 text-sm text-red-600">{editErrors.first_name}</div>}
                            </div>
                            <div>
                                <label htmlFor="edit_last_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                                <input
                                    id="edit_last_name"
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                    value={editData.last_name}
                                    onChange={(e) => setEditData('last_name', e.target.value)}
                                />
                                {editErrors.last_name && <div className="mt-2 text-sm text-red-600">{editErrors.last_name}</div>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="edit_tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tags (comma separated)</label>
                            <input
                                id="edit_tags"
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                value={editData.tags}
                                onChange={(e) => setEditData('tags', e.target.value)}
                            />
                            {editErrors.tags && <div className="mt-2 text-sm text-red-600">{editErrors.tags}</div>}
                        </div>

                        <div className="mt-6 flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => setEditContactModalOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={editing}
                                className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-bold text-white shadow-[0_4px_15px_rgba(228,15,122,0.2)] hover:shadow-[0_6px_20px_rgba(228,15,122,0.3)] hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none"
                                style={{ background: 'linear-gradient(to right, #FDB337, #FC5247, #E40F7A, #D150D7, #235BDD, #2ABCFB)' }}
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
