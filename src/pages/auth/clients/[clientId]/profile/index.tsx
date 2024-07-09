import { SortingState, createColumnHelper } from '@tanstack/react-table';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../../../../hooks/auth';
import { addClient, addClientNote, deleteById, deleteClientNote, getClientNote, getClientNotes, getQuery, getQueryData, userStatusChange } from '@/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button, CheckBox, NewTable, PageTitle, SidePanel } from '@/components';
import Search from '@/components/search';
import Head from 'next/head';
import { APP_NAME } from '@/constants';
import NoteForm from './noteForm';
import { format } from 'date-fns';
import Modal from '@/components/modal';
import ClientForm from '../../clientForm';

function index() {
    const router = useRouter()
    const { clientId } = router.query
    const [query, setQuery] = useState<string>("");
    const [sorting, setSorting] = useState<SortingState>([{
        id: 'created_at',
        desc: true
    }])
    const [profileEdit, setProfileEdit] = useState(true)

    const [page, setPage] = useState<number>(1);
    const columnHelper = createColumnHelper<any>();
    const [isVisible, setSidePanelShow] = React.useState(false);
    const [sidePanelShowProfile, setSidePanelShowProfile] = React.useState(false);

    const [tableData, setTableData] = React.useState<any>([]);
    const [showClientNote, setShowClientNote] = useState<boolean>(false)
    const [showModal, setShowModal] = React.useState(false);
    const [formerrors, setFormErrors] = React.useState<any>({});
    const [state, setState] = useState<any>({
        name: '',
        note: '',
        clientId: clientId,
        noteId: 0
    })
    const [client, setClient] = useState({
        id: 0,
        name: '',
        email: '',
        dob: '',
        phone: '',
        is_active: false,
        image: '',
        profile_image_path: ''
    })
    const [edit, setEdit] = useState(false)
    const [lastPage, setLastPage] = useState(1)
    const { isAuthenticated } = useAuth()
    useEffect(() => {
        setState((prev: any) => ({
            ...prev, clientId
        }))
    }, [clientId])
    const { isFetching: loadingIsFetching, refetch: refetchProfile } = useQuery(['user-profile', state?.clientId], getQuery, {
        onSuccess: (data: any) => {
            const { id, name, email, dob, phone, is_active, profile_image, profile_image_path } = data
            setClient({ id, name, email, dob, phone, is_active, image: profile_image, profile_image_path })
        },
        enabled: state?.clientId ? true : false
    })
    const { isFetching, data, refetch } = useQuery(
        ["clients", query, sorting[0].id, sorting[0].desc ? 'desc' : 'asc', page, 10, state?.clientId],
        getClientNotes, {
        onSuccess: (res: any) => {
            setTableData(res.data.data);
        },
        enabled: isAuthenticated && state?.clientId ? true : false
    })

    useQuery(['clients', state?.clientId, state?.noteId], getClientNote, {
        onSuccess: (data) => {
            const { id, name, note } = data
            setState((prev: any) => ({
                ...prev, noteId: id, name, note
            }))
        },
        enabled: state?.noteId ? true : false
    })
    const { isLoading: creatingClientNote, mutate } = useMutation<any, Error>(addClientNote,
        {
            onSuccess: (res: any) => {
                refetch();
                setSidePanelShow(false);
            },
            onError: (err: any) => {
                const { status, data } = err.response;
                if (status == 422) {
                    setFormErrors(data);
                } else {
                    console.log("Course Form Error: ", err);
                }
            },
        }
    );

    const { mutate: mutateDeleteClientNote } = useMutation(deleteClientNote, {
        onSuccess: () => {
            refetch()
        }
    })

    const handleClick = (id: number) => {
        setState((prev: any) => ({
            ...prev, noteId: id
        }))
        setEdit(true)
        setSidePanelShow(true)
    }
    const handleShowClientNote = (id: any) => {
        setState((prev: any) => ({
            ...prev, noteId: id
        }))
        setShowClientNote(true)
    }
    let columns = [
        columnHelper.accessor((row: any) => row.name, {
            id: "name",
            cell: (info) => info.getValue(),
            header: "Note Name",
        }),
        columnHelper.accessor((row: any) => row.note, {
            id: "note",
            cell: (info) => <span className='sm:w-[210px] md:w-[360px] text-justify ql-editor line-clamp-5'>{info.getValue()}</span>,
            header: "Note",
        }),
        columnHelper.accessor((row: any) => row.created_at, {
            id: "created_at",
            cell: (info) => <span>{info.getValue() ? format(new Date(info.row.original?.created_at), 'd/M/Y') : ''}</span>,
            header: "Created At",
        }),
        columnHelper.accessor((row: any) => row.id, {
            id: "actions",
            cell: (info: any) => {
                const { id } = info?.row.original
                return (
                    <div className='flex items-center space-x-2'>
                        <Button
                            label=''
                            buttonType="primary"
                            icon={<EyeIcon className="w-5" />}
                            onClick={(e: any) => handleShowClientNote(id)}
                            tooltipMsg="Show Client Notes"
                        />
                        <Button
                            label=''
                            buttonType="success"
                            icon={<PencilSquareIcon className="w-5" />}
                            onClick={(e: any) => handleClick(id)}
                            tooltipMsg="Edit Client Notes"
                        />
                        <Button
                            label=''
                            buttonType="danger"
                            icon={<TrashIcon className="w-5" />}
                            onClick={() => mutateDeleteClientNote({ noteId: id, clientId: state?.clientId })}
                            tooltipMsg="Delete Notes"
                        />
                    </div>
                );
            },
            enableSorting: false
        }),
    ];
    const { mutate: mutateUserStatusChange }: any = useMutation<any>(userStatusChange,
        {
            onSuccess: () => {
                refetchProfile()
            }
        }
    );
    const { isLoading: creatingClient, mutate: mutateClientProfilEdit } = useMutation(addClient,
        {
            onSuccess: (res) => {
                refetchProfile();
                setSidePanelShowProfile(false);
            },
            onError: (err: any) => {
                const { status, data } = err.response;
                if (status == 422) {
                    setFormErrors(data);
                } else {
                    console.log("Course Form Error: ", err);
                }
            },
        }
    );
    const handleSearch = (value: any) => {
        setPage(1)
        setQuery(value)
    }

    const handlePaginationActon = (currentPage: any | void) => {
        setPage(currentPage.selected + 1)
    }
    const handleUserStatusChange = (e: any, id: any) => {
        const { checked } = e.target
        mutateUserStatusChange({ id, status: checked })
    }
    const handleProfileEditClick = (id: number) => {
        setSidePanelShowProfile(true)
    }
    return (
        <>
            <Head>
                <title>{APP_NAME} | Client Profile</title>
            </Head>
            <div className='flex flex-row justify-between items-center pb-4'>
                <PageTitle title='Client Profile' />
            </div>
            <div className="grid grid-cols-1 gap-y-4 xl:grid-cols-2 xl:gap-x-4">
                <div className="border border-primary shadow-lg rounded-md p-2">
                    <h1 className='font-semibold'>Client Info</h1>
                    <div className="flex flex-col">
                        <div className="">
                            <div className="flex justify-end">
                                <Button
                                    label=''
                                    buttonType="success"
                                    icon={<PencilSquareIcon className="w-5" />}
                                    onClick={() => handleProfileEditClick(state?.clientId)}
                                    tooltipMsg="Edit Client"
                                />
                            </div>
                            <div className="flex justify-center py-4">
                                <img src={client?.image ? client?.profile_image_path + client?.image : 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'} width={150} height={150} />
                            </div>
                            <div className="p-2 mt-2 space-y-2 ">
                                <div className="grid grid-cols-2"><span className="font-semibold">Name</span><p className='break-all'>{client?.name}</p></div>
                                <div className="grid grid-cols-2"><span className="font-semibold">Date of Birth</span><span>{client?.dob ? format(new Date(client?.dob), 'd/M/Y') : ''}</span></div>
                                <div className="grid grid-cols-2"><span className="font-semibold">Email</span><p className='break-all'>{client?.email}</p></div>
                                <div className="grid grid-cols-2"><span className="font-semibold">Phone</span><p className='break-all'>{client?.phone}</p></div>
                                <div className="grid grid-cols-2">
                                    <span className="font-semibold">Active</span>
                                    {
                                        <CheckBox name="is_active" label="" checked={client?.is_active} onChange={(e: any) => handleUserStatusChange(e, clientId)} />
                                    }
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <div className="border border-primary shadow-lg rounded-md p-2">
                    <h1 className='font-semibold'>Clients Note</h1>
                    <div className="flex justify-end">
                        <Button
                            label='Add Clients Note'
                            buttonType="success"
                            onClick={() => {
                                setEdit(false)
                                setSidePanelShow(true);
                                setState((prev: any) => ({
                                    ...prev, name: '', note: '', noteId: 0
                                }))
                            }}
                        />
                    </div>
                    <Search query={query} placeholder="Search clients note" handleSearch={handleSearch} />
                    <div className='flex flex-col sm:px-6 lg:px-8'>
                        <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                            <div className='py-2 align-middle inline-block min-w-full '>
                                <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>

                                    <div className="">
                                        <NewTable
                                            data={tableData}
                                            columns={columns}
                                            sorting={sorting}
                                            setSorting={setSorting}
                                            pageCount={data?.data?.last_page}
                                            Page={page}
                                            handlePaginationActon={handlePaginationActon}
                                            isloading={isFetching}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <SidePanel
                    isVisible={isVisible}
                    wide='2xl'
                    onClose={() => {
                        setSidePanelShow(false);
                        setFormErrors({});
                    }}
                    title={edit ? 'Edit Note' : 'Add Note'}
                    primaryButtonAction={() => {
                        setFormErrors({});
                        mutate(state)
                    }}
                    primaryButtonLoading={creatingClientNote}
                >
                    <React.Suspense fallback='loading'>
                        <NoteForm state={state} setState={setState} error={formerrors} edit={edit} />
                    </React.Suspense>
                </SidePanel>
                <SidePanel
                    isVisible={sidePanelShowProfile}
                    onClose={() => {
                        setSidePanelShowProfile(false);
                        setFormErrors({});
                    }}
                    title={profileEdit ? 'Edit Client' : 'Add Client'}
                    primaryButtonAction={() => {
                        setFormErrors({});
                        mutateClientProfilEdit(client)
                    }}
                    primaryButtonLoading={creatingClient}
                >
                    <React.Suspense fallback='loading'>
                        <ClientForm state={{ ...client, image_path: client?.profile_image_path + client?.image }} setState={setClient} error={formerrors} edit={profileEdit} />
                    </React.Suspense>
                </SidePanel>
                <Modal isVisible={showClientNote} onClose={() => setShowClientNote(false)} isButtonVisible={false}>
                    <div>
                        <div className="px-4 sm:px-0">
                            <h3 className="text-base font-semibold leading-7 text-gray-900">Client Notes</h3>
                            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Detail Information</p>
                        </div>
                        <div className="mt-6 border-t border-gray-100">
                            <dl className="divide-y divide-gray-100">
                                <div className="px-4 py-2 md:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Name</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{state?.name}</dd>
                                </div>
                                <div className="px-4 py-2 md:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Note</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{state?.note}</dd>
                                </div>

                            </dl>
                        </div>
                    </div>
                </Modal>
            </div>

        </>
    )
}

export default index